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
    DAO: any,
    rushv2: any,
    Staking: any,
    staking: any,
    ohm: any,
    sRUSH: any,
    srush: any,
    WarmUp: any,
    warmup: any,
    Treasury: any,
    treasury: any,
    Distributor: any,
    distributor: any,
    dai: any,
    frax: any,
    ERC20TOKEN: any,
    ohmdai: any,
    UniswapFactory: any,
    uniswapfactory: any,
    CALCULATOR: any,
    calculator: any,
    UNIROUTER: any,
    unirouter: any,
    rushv1: any,
    rushv2dai: any,
    bondDepository: any;

  let StakingHelper: any, shelper: any;

  it("Get signers", async () => {
    [deployer, DAO] = await ethers.getSigners();
    let block = await ethers.provider.getBlockNumber();
    console.log("Last block:", block.toString());
    firstEpochBlock = block;
  });

  it("Deploy tokens", async () => {
    //Total supply at 1000 000
    let totalSupply: any = new BigNumber(10).shiftedBy(36).toFixed(0);
    let rushV1Total = new BigNumber(100).shiftedBy(18 + 6).toFixed();

    ERC20TOKEN = await ethers.getContractFactory("SimpleToken");
    dai = await ERC20TOKEN.deploy("DAI", "DAI", totalSupply);
    rushv1 = await ERC20TOKEN.deploy("RUSHV1", "RUSHV1", rushV1Total);
    frax = await ERC20TOKEN.deploy("FRAX", "FRAX", totalSupply);
  });

  it("Deploy RushV2 Token - rushV2", async () => {
    ERC20TOKEN = await ethers.getContractFactory("OlympusERC20Token");
    rushv2 = await ERC20TOKEN.deploy();
  });

  it("Deploy Standard Bond Calculator", async () => {
    CALCULATOR = await ethers.getContractFactory("OlympusBondingCalculator");
    calculator = await CALCULATOR.deploy(rushv2.address);
  });

  it("Deploy UniswapPair", async () => {
    // Deploy Uniswap Factory
    UniswapFactory = await ethers.getContractFactory("UniswapFactory");
    uniswapfactory = await UniswapFactory.deploy(deployer.address);
    // Create Pair
    let tx = await uniswapfactory.createPair(rushv2.address, dai.address);
    await tx.wait();
    let pair = await uniswapfactory.getPair(rushv2.address, dai.address);
    let UNISWAPPAIR = await ethers.getContractFactory("UniswapPair");
    // Attach to pair
    rushv2dai = UNISWAPPAIR.attach(pair);
  });

  it("DEPLOY UNISWAP ROUTER", async () => {
    UNIROUTER = await ethers.getContractFactory("UniswapRouter");
    unirouter = await UNIROUTER.deploy(uniswapfactory.address, dai.address);
  });

  it("Deploy Treasury", async () => {
    let blocksNeededForQueue = 0;
    Treasury = await ethers.getContractFactory("OlympusTreasury");
    treasury = await Treasury.deploy(
      rushv2.address,
      dai.address,
      frax.address,
      rushv2dai.address,
      blocksNeededForQueue
    );
  });

  it("Set bonding calculator for LP rushv2weth", async () => {
    const LIQUIDITYTOKEN_ENUM = 5;
    let tx = await treasury.queue(LIQUIDITYTOKEN_ENUM, rushv2dai.address);
    await tx.wait();
    tx = await treasury.toggle(
      LIQUIDITYTOKEN_ENUM,
      rushv2dai.address,
      calculator.address
    );
    await tx.wait();
    tx = await treasury.queue(LIQUIDITYTOKEN_ENUM, rushv2dai.address);
    await tx.wait();
    tx = await treasury.toggle(
      LIQUIDITYTOKEN_ENUM,
      rushv2dai.address,
      calculator.address
    );
    // await tx.wait();
  });
  it("Deploy Distributor", async () => {
    let firstEpoch = await ethers.provider.getBlockNumber();
    Distributor = await ethers.getContractFactory("Distributor");
    distributor = await Distributor.deploy(
      treasury.address,
      rushv2.address,
      EPOCH_LENGTH,
      firstEpoch
    );
  });

  it("Set distributor address in treasury as REWARD MANAGER", async () => {
    const REWARD_MANAGER_ENUM = 8;
    let tx = await treasury.queue(REWARD_MANAGER_ENUM, distributor.address);
    await tx.wait();
    tx = await treasury.toggle(REWARD_MANAGER_ENUM, distributor.address, ZEROA);
    await tx.wait();
  });

  it("Deploy sOHM token", async () => {
    sRUSH = await ethers.getContractFactory("sOlympus");
    srush = await sRUSH.deploy();
  });

  it("Deploy Rush Staking contract", async () => {
    let firstEpochBlock = await ethers.provider.getBlockNumber();

    Staking = await ethers.getContractFactory("OlympusStaking");
    staking = await Staking.deploy(
      rushv2.address,
      srush.address,
      EPOCH_LENGTH,
      FIRST_EPOCH,
      firstEpochBlock
    );
  });

  it("Set distributor address in staking contract", async () => {
    let tx = await staking.setContract(0, distributor.address);
    await tx.wait();
  });

  it("Add staking contract as a recipient in distrubtor contract", async () => {
    let tx = await distributor.addRecipient(staking.address, RATE);
    await tx.wait();
  });

  it("Set Vault on OHM token as treasury", async () => {
    let tx = await rushv2.setVault(treasury.address);
    await tx.wait();
  });

  it("Initialize sohm with Olympus Staking address", async () => {
    let tx = await srush.initialize(staking.address);
    await tx.wait();
  });

  it("Deploy WarmUp contract", async () => {
    WarmUp = await ethers.getContractFactory("StakingWarmup");
    warmup = await WarmUp.deploy(staking.address, srush.address);
  });

  it("Configure warmup address in staking contract", async () => {
    const WARMUP_ENUM = 1;
    let tx = await staking.setContract(WARMUP_ENUM, warmup.address);
    await tx.wait();
  });

  it("Deploy Staking Helper", async () => {
    StakingHelper = await ethers.getContractFactory("StakingHelper");
    shelper = await StakingHelper.deploy(staking.address, rushv2.address);
  });

  it("Add RUSHv1 token as a reserve token", async () => {
    const RESERVETOKEN = 2;
    let tx = await treasury.queue(RESERVETOKEN, rushv1.address);
    await tx.wait();
    tx = await treasury.toggle(RESERVETOKEN, rushv1.address, ZEROA);
    await tx.wait();
  });

  it("Add deployer as reserve depositor to treasury", async () => {
    const RESERVEDEPOSITOR = 0;
    let tx = await treasury.queue(RESERVEDEPOSITOR, deployer.address);
    await tx.wait();
    tx = await treasury.toggle(RESERVEDEPOSITOR, deployer.address, ZEROA);
    await tx.wait();
  });

  it("Deposit 100,000,000 RUSHV1 in exchange for 100,000,000 RUSHv2", async () => {
    let amount = new BN(100).shiftedBy(18 + 6);
    let tx = await rushv1.approve(treasury.address, amount.toFixed());
    await tx.wait();
    tx = await treasury.deposit(amount.toFixed(), rushv1.address, 0);
    await tx.wait();
  });

  it("Add liquidity to rushv2weth 10,000 RUSH to 100 000 DAI", async () => {
    let deadline = (Date.now() / 1000 + 3600).toFixed(0);
    let amountRushV2 = new BigNumber(100000).shiftedBy(9);
    let amountDAI = new BigNumber(20000).shiftedBy(18);
    let tx = await dai.approve(unirouter.address, amountDAI.toFixed(0));
    await tx.wait();
    tx = await rushv2.approve(unirouter.address, amountRushV2.toFixed(0));
    await tx.wait();
    tx = await unirouter.addLiquidity(
      rushv2.address,
      dai.address,
      amountRushV2.toFixed(),
      amountDAI.toFixed(),
      amountRushV2.toFixed(),
      amountDAI.toFixed(),
      deployer.address,
      deadline
    );
    await tx.wait();
  });

  it("Send 90% of rushv2dai LP tokens to Treasury as reserve", async () => {
    let amount = new BN(100).shiftedBy(18 + 6);
    let lpBalance = new BN(
      (await rushv2dai.balanceOf(deployer.address)).toString()
    );
    let tx = await rushv2dai.transfer(
      treasury.address,
      lpBalance.times(0.9).integerValue().toFixed()
    );
    await tx.wait();
    tx = await treasury.auditReserves();
    await tx.wait();
  });

  it("Deploy OlympusBondDepository", async () => {
    let factory = await ethers.getContractFactory(
      "contracts/BondDepository.sol:OlympusBondDepository"
    );
    bondDepository = await factory.deploy(
      rushv2.address,
      rushv2dai.address,
      treasury.address,
      DAO.address,
      calculator.address
    );

    const LP_DEPOSITOR = 4;
    let tx = await treasury.queue(LP_DEPOSITOR, bondDepository.address);
    await tx.wait();
    tx = await treasury.toggle(LP_DEPOSITOR, bondDepository.address, ZEROA);
    await tx.wait();

    tx = await bondDepository.setStaking(shelper.address, true);
    await tx.wait();
    let controlVariable = 100;
    let vestingTerm = 33110;
    let minimumPrice = 101;
    let maxPayout = 50;
    let fee = bondFee;
    let maxDebt = "1000000000000000";
    let initialDebt = new BigNumber("4500000000000000").toString();
    initialDebt = "0";
    // initialDebt = "33000000000000";
    tx = await bondDepository.initializeBondTerms(
      controlVariable,
      vestingTerm,
      minimumPrice,
      maxPayout,
      fee,
      maxDebt,
      initialDebt
    );
    await tx.wait();
    let debt = await bondDepository.totalDebt();
    console.log("Debt:", debt.toString());

    let bondPrice = await bondDepository.bondPrice();
    console.log(bondPrice.toString());

    let bondPriceUSD = await bondDepository.bondPriceInUSD();
    console.log(
      "Bond Price USD:",
      (bondPriceUSD / Math.pow(10, 18)).toString()
    );
  });

  // it("Make a bond", async () => {
  //   let bondPrice = await bondDepository.bondPrice();
  //   let lpBalance = await rushv2dai.balanceOf(deployer.address);
  //   console.log("LpBalance:", lpBalance.toString());
  //   let amount = new BN(lpBalance.toString());

  //   await rushv2dai.approve(bondDepository.address, amount.toFixed());
  //   await bondDepository.deposit(amount.toFixed(), bondPrice, deployer.address);

  //   let bondInfo = await bondDepository.bondInfo(deployer.address);
  //   console.log("Payout:", bondInfo.payout.toString());
  //   console.log("Vesting:", bondInfo.vesting.toString());
  //   console.log("Last block:", bondInfo.lastBlock.toString());
  //   console.log(
  //     "Price[usd]:",
  //     (bondInfo.pricePaid / Math.pow(10, 18)).toString()
  //   );

  //   await staking.rebase();
  //   let percentVested = await bondDepository.percentVestedFor(deployer.address);
  //   console.log("Percent vested:", percentVested.toString());
  //   let pending = await bondDepository.pendingPayoutFor(deployer.address);
  //   console.log("Pending:", pending.toString());
  // });
  it("Display Addresses", () => {
    console.log("RUSHV2: " + rushv2.address);
    console.log("DAI: " + dai.address);
    console.log("Frax: " + frax.address);
    console.log("Treasury: " + treasury.address);
    console.log("Staking: " + staking.address);
    console.log("Staking Helper " + shelper.address);
    console.log("sOHM: " + srush.address);
    console.log("Distributor " + distributor.address);
    console.log("Staking Wawrmup " + warmup.address);
    console.log("RUSHV2DAI Bond: " + bondDepository.address);
    console.log("RUSHV2DAI Uniswap: " + rushv2dai.address);
  });
});
