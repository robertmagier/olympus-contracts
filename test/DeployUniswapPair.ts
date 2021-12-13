import { ethers } from "hardhat";
import "@nomiclabs/hardhat-ethers";
const { solidity } = require("ethereum-waffle");
const { expect } = require("chai");
// console.log(ethers);
const ZEROA = "0x0000000000000000000000000000000000000000";
import { BigNumber } from "bignumber.js";

const BN = BigNumber;
var firstEpochBlock = 8961000;
const firstEpochNumber = "338";
const epochLengthInBlocks = "2200";
const initialIndex = "7675210820";
const initialRewardRate = "3000";
const RUSHV2DAI_BCV = 280;
const bondFee = "100";
//  Max debt bond can take on
const maxBondDebt = "1000000000000000";
// Initial Bond debt
const intialBondDebt = "0";

const EPOCH_LENGTH = 1;
const FIRST_EPOCH = epochLengthInBlocks;
const RATE = 100;

/**
 * 1. Add RUSHV1 as reserve token
 * 2. Add RUSHV2 - WETH as lp reserve token
 * 3. Deposit 10 000 RUSHV1 to reserve to get 10 000  RUSHV2.
 * 4. Add liquidity - 10,000 RUSHv2 + 1 WETH
 */

describe("Deploy contract for Staking", function () {
  this.timeout(0);
  let deployer: any,
    rushv2: any,
    ERC20TOKEN: any,
    UniswapFactory: any,
    uniswapfactory: any,
    UNIROUTER: any,
    unirouter: any,
    rushv2weth: any,
    Treasury: any,
    treasury: any,
    weth: any,
    DAO: any,
    bondDepository2: any;

  const RUSHV2_ADDRESS = "0x99A58F88e3179F6BAf5a1434D4bf8BE564A3519B";
  const BOND_CALCULATOR = "0xA64c926FCB28Bc8387abF99e40643DB2e48c13BC";
  const TREASURY_ADDRESS = "0x42fBa17BB4ec32f00Fadd6b6acc25bAa10688079";
  const ETHUSDPRICE = "0x8A753747A1Fa494EC906cE90E9f37563A8AF630e";
  const SHELPER = "0x2ce44e9590d94586213aCF947450e70cb4605f90";

  it("Get signers", async () => {
    [deployer, DAO] = await ethers.getSigners();
  });

  it("Deploy WETH token and attach rushv2", async () => {
    //Total supply at 1000 000
    let totalSupply: any = new BigNumber(10).shiftedBy(36).toFixed(0);
    ERC20TOKEN = await ethers.getContractFactory("SimpleToken");
    weth = await ERC20TOKEN.deploy("WETH", "WETH", totalSupply);
    rushv2 = await ERC20TOKEN.attach(RUSHV2_ADDRESS);
  });

  it("Deploy new UniswapPair", async () => {
    // Deploy Uniswap Factory
    UniswapFactory = await ethers.getContractFactory("UniswapFactory");
    uniswapfactory = await UniswapFactory.deploy(deployer.address);
    // Create Pair
    let tx = await uniswapfactory.createPair(rushv2.address, weth.address);
    await tx.wait();
    let pair = await uniswapfactory.getPair(rushv2.address, weth.address);
    let UNISWAPPAIR = await ethers.getContractFactory("UniswapPair");
    // Attach to pair
    rushv2weth = UNISWAPPAIR.attach(pair);
  });

  it("DEPLOY UNISWAP ROUTER", async () => {
    UNIROUTER = await ethers.getContractFactory("UniswapRouter");
    unirouter = await UNIROUTER.deploy(uniswapfactory.address, weth.address);
  });

  it("Attach Treasury", async () => {
    Treasury = await ethers.getContractFactory("OlympusTreasury");
    treasury = await Treasury.attach(TREASURY_ADDRESS);
  });

  it("Set bonding calculator for LP rushv2weth", async () => {
    const LIQUIDITYTOKEN_ENUM = 5;
    let tx = await treasury.queue(LIQUIDITYTOKEN_ENUM, rushv2weth.address);
    await tx.wait();
    tx = await treasury.toggle(
      LIQUIDITYTOKEN_ENUM,
      rushv2weth.address,
      BOND_CALCULATOR
    );
    await tx.wait();
  });

  it("Add liquidity to rushv2weth 10,000 RUSH to 10 WETH", async () => {
    let deadline = (Date.now() / 1000 + 3600).toFixed(0);
    let amountRushV2 = new BigNumber(30000).shiftedBy(9);
    let amountWETH = new BigNumber(2.5).shiftedBy(18);
    let tx = await weth.approve(unirouter.address, amountWETH.toFixed(0));
    await tx.wait();
    tx = await rushv2.approve(unirouter.address, amountRushV2.toFixed(0));
    await tx.wait();
    tx = await unirouter.addLiquidity(
      rushv2.address,
      weth.address,
      amountRushV2.toFixed(),
      amountWETH.toFixed(),
      amountRushV2.toFixed(),
      amountWETH.toFixed(),
      deployer.address,
      deadline
    );
    await tx.wait();
  });

  // it("Send 50% of rushv2weth LP tokens to Treasury as reserve", async () => {
  //   let amount = new BN(100).shiftedBy(18 + 6);
  //   let lpBalance = new BN(
  //     (await rushv2weth.balanceOf(deployer.address)).toString()
  //   );
  //   let tx = await rushv2weth.transfer(
  //     treasury.address,
  //     lpBalance.times(0.5).integerValue().toFixed()
  //   );
  //   await tx.wait();
  //   tx = await treasury.auditReserves();
  //   await tx.wait();
  // });

  it("Deploy OlympusBondDepository for RUSHV2-WETH", async () => {
    let factory = await ethers.getContractFactory(
      "contracts/BondDepositoryWETH.sol:OlympusBondDepository"
    );
    bondDepository2 = await factory.deploy(
      rushv2.address,
      rushv2weth.address,
      treasury.address,
      BOND_CALCULATOR,
      ETHUSDPRICE
    );

    const REWARDMANAGER = 8;
    let tx = await treasury.queue(REWARDMANAGER, bondDepository2.address);
    await tx.wait();
    tx = await treasury.toggle(REWARDMANAGER, bondDepository2.address, ZEROA);
    await tx.wait();

    tx = await bondDepository2.setStaking(SHELPER, true);
    await tx.wait();
    let controlVariable = 100;
    let vestingTerm = 33110;
    let minimumPrice = 0;
    let maxPayout = 100;
    let fee = bondFee;
    let maxDebt = "1000000000000000";
    let initialDebt = "5000000000000";
    console.log("InitializeBondTerms");
    tx = await bondDepository2.initializeBondTerms(
      controlVariable,
      vestingTerm,
      minimumPrice,
      maxPayout,
      maxDebt,
      initialDebt
    );
    await tx.wait();
    console.log("InitializeBondTerms Finished.");
    let debt = await bondDepository2.totalDebt();
    console.log("Debt:", debt.toString());

    let bondPrice = await bondDepository2.bondPrice();
    console.log(bondPrice.toString());

    let bondPriceUSD = await bondDepository2.bondPriceInUSD();
    console.log(
      "Bond Price USD:",
      (bondPriceUSD / Math.pow(10, 18)).toString()
    );
  });

  it("Display Addresses", () => {
    console.log("RUSHV2WETH Bond: " + bondDepository2.address);
    console.log("RUSHV2WETH Uniswap: " + rushv2weth.address);
  });
});
