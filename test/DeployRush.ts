import { ethers } from "hardhat";
import "@nomiclabs/hardhat-ethers";
const { solidity } = require("ethereum-waffle");
const { expect } = require("chai");
// console.log(ethers);
const ZEROA = "0x0000000000000000000000000000000000000000";
const AMOUNT = "10000000000000";
import { BigNumber } from "bignumber.js";
import { TransactionOrderForkEvent } from "@ethersproject/abstract-provider";

const BN = BigNumber;
const EPOCH_LENGTH = 1;
const FIRST_EPOCH = 0;
const RATE = 100;

/**
 * 1. Add RUSHV1 as reserve token
 * 2. Add RUSHV2 - WETH as lp reserve token
 * 3. Deposit 10 000 RUSHV1 to reserve to get 10 000  RUSHV2.
 * 4. Add liquidity - 10,000 RUSHv2 + 1 WETH
 */

describe("Deploy contract for Staking", () => {
  let deployer: any,
    user1: any,
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
    weth: any,
    UNIROUTER: any,
    unirouter: any,
    rushv1: any,
    rushv2weth: any;

  let staker1: any, staker2: any;
  let StakingHelper: any, shelper: any;

  it("Get signers", async () => {
    [deployer, user1, staker1, staker2] = await ethers.getSigners();
  });

  it("Deploy tokens", async () => {
    //Total supply at 1000 000
    let totalSupply: any = new BigNumber(10).shiftedBy(36).toFixed(0);
    let rushV1Total = new BigNumber(100).shiftedBy(18 + 6).toFixed();
    ERC20TOKEN = await ethers.getContractFactory("SimpleToken");
    dai = await ERC20TOKEN.deploy("DAI", "DAI", totalSupply);
    rushv1 = await ERC20TOKEN.deploy("RUSHV1", "RUSHV1", rushV1Total);
    weth = await ERC20TOKEN.deploy("WETH", "WETH", totalSupply);
    frax = await ERC20TOKEN.deploy("FRAX", "FRAX", totalSupply);

    let name = await dai.name();
    expect(name).to.be.equal("DAI");

    name = await frax.name();
    expect(name).to.be.equal("FRAX");

    expect(await weth.name()).to.be.equal("WETH");
  });

  it("Deploy RushV2 Token - rushV2", async () => {
    ERC20TOKEN = await ethers.getContractFactory("OlympusERC20Token");
    rushv2 = await ERC20TOKEN.deploy();
  });

  it("Deploy Standard Bond Calculator", async () => {
    CALCULATOR = await ethers.getContractFactory("OlympusBondingCalculator");
    calculator = await CALCULATOR.deploy(rushv2.address);
    expect(await calculator.OHM()).to.be.equal(rushv2.address);
  });

  it("Deploy UniswapPair", async () => {
    // Deploy Uniswap Factory
    UniswapFactory = await ethers.getContractFactory("UniswapFactory");
    uniswapfactory = await UniswapFactory.deploy(deployer.address);
    // Create Pair
    await uniswapfactory.createPair(rushv2.address, weth.address);
    let pair = await uniswapfactory.getPair(rushv2.address, weth.address);
    let UNISWAPPAIR = await ethers.getContractFactory("UniswapPair");
    // Attach to pair
    rushv2weth = UNISWAPPAIR.attach(pair);
    expect(await rushv2weth.symbol()).to.be.equal("UNI-V2");
  });

  it("DEPLOY UNISWAP ROUTER", async () => {
    // const LIB = await ethers.getContractFactory("UniswapV2Library");
    // const lib = await hre.deployments.deploy("UniswapV2Library", {
    //   from: deployer.address,
    //   log: true,
    // });
    // let options: any = {
    //   libraries: {
    //     UniswapV2Library: lib.address,
    //   },
    // };

    UNIROUTER = await ethers.getContractFactory("UniswapRouter");
    unirouter = await UNIROUTER.deploy(uniswapfactory.address, weth.address);

    // await deployments.fixture(["UniswapRouter"]);

    // const Token = await ethers.getContract("UniswapRouter");
    // unirouter = Token;
  });
  // it("Add liquidity to ohmdai", async () => {
  //   let deadline = (Date.now() / 1000 + 60).toFixed(0);
  //   let amount0 = new BigNumber(10).shiftedBy(32).times(1).toFixed();
  //   let amount1 = new BigNumber(10).shiftedBy(11).times(5).toFixed();
  //   await dai.approve(unirouter.address, amount0);
  //   await ohm.approve(unirouter.address, amount1);
  //   await ohm.mint(deployer.address, amount1);
  //   await unirouter.addLiquidity(
  //     dai.address,
  //     ohm.address,
  //     amount0,
  //     amount1,
  //     amount0,
  //     amount1,
  //     deployer.address,
  //     deadline
  //   );
  // });

  it("Deploy Treasury", async () => {
    let blocksNeededForQueue = 1;
    Treasury = await ethers.getContractFactory("OlympusTreasury");
    treasury = await Treasury.deploy(
      rushv2.address,
      dai.address,
      frax.address,
      rushv2weth.address,
      blocksNeededForQueue
    );
    let reserveToken0 = await treasury.reserveTokens(0);
    let reserveToken1 = await treasury.reserveTokens(1);
    let liquidityToken0 = await treasury.liquidityTokens(0);
    expect(reserveToken0).to.be.equal(dai.address);
    expect(reserveToken1).to.be.equal(frax.address);
    expect(liquidityToken0).to.be.equal(rushv2weth.address);
  });
  it("Set bonding calculator for LP rushv2weth", async () => {
    let blocksNeededForQueue = 0;

    const LIQUIDITYTOKEN_ENUM = 5;
    await treasury.queue(LIQUIDITYTOKEN_ENUM, rushv2weth.address);
    await treasury.toggle(
      LIQUIDITYTOKEN_ENUM,
      rushv2weth.address,
      calculator.address
    );
    await treasury.queue(LIQUIDITYTOKEN_ENUM, rushv2weth.address);
    await treasury.toggle(
      LIQUIDITYTOKEN_ENUM,
      rushv2weth.address,
      calculator.address
    );
    expect(await treasury.bondCalculator(rushv2weth.address)).to.be.equal(
      calculator.address
    );
    expect(await treasury.isLiquidityToken(rushv2weth.address)).to.be.true;
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
    expect(await distributor.treasury()).to.be.equal(treasury.address);
    expect(await distributor.OHM()).to.be.equal(rushv2.address);
    expect(await distributor.epochLength()).to.be.equal(EPOCH_LENGTH);
  });

  it("Set distributor address in treasury as REWARD MANAGER", async () => {
    const REWARD_MANAGER_ENUM = 8;
    await treasury.queue(REWARD_MANAGER_ENUM, distributor.address);
    await treasury.toggle(REWARD_MANAGER_ENUM, distributor.address, ZEROA);
    expect(await treasury.isRewardManager(distributor.address)).to.be.true;
  });

  it("Deploy sOHM token", async () => {
    sRUSH = await ethers.getContractFactory("sOlympus");
    srush = await sRUSH.deploy();
    expect(await srush.name()).to.be.equal("Staked RUSH");
    expect(await srush.symbol()).to.be.equal("sRUSH");
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
    await staking.setContract(0, distributor.address);
    expect(await staking.distributor()).to.be.equal(distributor.address);
  });

  it("Add staking contract as a recipient in distrubtor contract", async () => {
    await distributor.addRecipient(staking.address, RATE);
    let info0 = await distributor.info(0);
    expect(info0.rate).to.be.equal(RATE);
    expect(info0.recipient).to.be.equal(staking.address);
  });

  it("Set Vault on OHM token as treasury", async () => {
    await rushv2.setVault(treasury.address);
    expect(await rushv2.vault()).to.be.equal(treasury.address);
  });

  it("Initialize sohm with Olympus Staking address", async () => {
    srush.initialize(staking.address);
    expect(await srush.stakingContract()).to.be.equal(staking.address);
  });

  it("Deploy WarmUp contract", async () => {
    WarmUp = await ethers.getContractFactory("StakingWarmup");
    warmup = await WarmUp.deploy(staking.address, srush.address);
    expect(await warmup.staking()).to.be.equal(staking.address);
    expect(await warmup.sOHM()).to.be.equal(srush.address);
  });

  it("Configure warmup address in staking contract", async () => {
    const WARMUP_ENUM = 1;
    await staking.setContract(WARMUP_ENUM, warmup.address);
    expect(await staking.warmupContract()).to.be.equal(warmup.address);
  });

  it("Deploy Staking Helper", async () => {
    StakingHelper = await ethers.getContractFactory("StakingHelper");
    shelper = await StakingHelper.deploy(staking.address, rushv2.address);
    expect(await shelper.staking()).to.be.equal(staking.address);
    expect(await shelper.OHM()).to.be.equal(rushv2.address);
  });

  it("Check treasury total reserves", async () => {
    let totalReserves = await treasury.totalReserves();
    expect(totalReserves).to.be.equal(0);
  });

  it("Check RushV2 total supply. Should be zero.", async () => {
    let totalSupply = await rushv2.totalSupply();
    expect(totalSupply).to.be.equal(0);
  });

  it("Add RUSHv1 token as a reserve token", async () => {
    expect(await treasury.isReserveToken(rushv1.address)).to.be.false;
    const RESERVETOKEN = 2;
    await treasury.queue(RESERVETOKEN, rushv1.address);
    await treasury.toggle(RESERVETOKEN, rushv1.address, ZEROA);
    let reserveToken = await treasury.reserveTokens(2);
    expect(reserveToken).to.be.equal(rushv1.address);
    expect(await treasury.isReserveToken(rushv1.address)).to.be.true;
  });

  it("Add deployer as reserve depositor to treasury", async () => {
    const RESERVEDEPOSITOR = 0;
    await treasury.queue(RESERVEDEPOSITOR, deployer.address);
    await treasury.toggle(RESERVEDEPOSITOR, deployer.address, ZEROA);
    let reserveDepositor = await treasury.reserveDepositors(0);
    expect(reserveDepositor).to.be.equal(deployer.address);
    expect(await treasury.isReserveDepositor(deployer.address)).to.be.true;
  });

  it("Deposit 10,000 RUSHV1 in exchange for 10,000 RUSHv2", async () => {
    let amount = new BN(1).shiftedBy(18 + 4);
    await rushv1.approve(treasury.address, amount.toFixed());

    expect(await rushv2.balanceOf(deployer.address)).to.be.equal(0);

    await treasury.deposit(amount.toFixed(), rushv1.address, 0);
    // We shift amount by -9 because 1 RUSH has 18 decimals and 1 RUSHv2 has only 9 decimals
    expect(await rushv2.balanceOf(deployer.address)).to.be.equal(
      amount.shiftedBy(-9).toFixed()
    );
  });

  it("Add liquidity to rushv2weth 10,000 RUSH to 1 WETH", async () => {
    let deadline = (Date.now() / 1000 + 60).toFixed(0);
    let amountRushV2 = new BigNumber(10000).shiftedBy(9);
    let amountWETH = new BigNumber(10).shiftedBy(18);
    await weth.approve(unirouter.address, amountWETH.toFixed(0));
    await rushv2.approve(unirouter.address, amountRushV2.toFixed(0));
    await unirouter.addLiquidity(
      rushv2.address,
      weth.address,
      amountRushV2.toFixed(),
      amountWETH.toFixed(),
      amountRushV2.toFixed(),
      amountWETH.toFixed(),
      deployer.address,
      deadline
    );

    expect(await rushv2.balanceOf(rushv2weth.address)).to.be.equal(
      amountRushV2.toFixed()
    );
    expect(await weth.balanceOf(rushv2weth.address)).to.be.equal(
      amountWETH.toFixed()
    );

    let lpBalance = new BN(
      (await rushv2weth.balanceOf(deployer.address)).toString()
    );
    console.log("LP Balance:", lpBalance.shiftedBy(-9).toString());
  });

  it("Send all rushv2weth LP tokens to Treasury as reserve", async () => {
    let amount = new BN(1).shiftedBy(18 + 4);
    expect(await treasury.totalReserves()).to.be.equal(
      amount.shiftedBy(-9).toFixed()
    );
    let lpBalance = new BN(
      (await rushv2weth.balanceOf(deployer.address)).toString()
    );
    // await rushv2weth.transfer(treasury.address, lpBalance.toFixed());
    await treasury.auditReserves();
    let reserves = await treasury.totalReserves();
    console.log("Reserves:", reserves / Math.pow(10, 9));
  });
  return;

  it("Deploy OlympusBondDepository", async () => {
    let factory = await ethers.getContractFactory(
      "contracts/BondDepository.sol:OlympusBondDepository"
    );
    let instance = await factory.deploy(
      ohm.address,
      ohmdai.address,
      treasury.address,
      deployer.address,
      calculator.address
    );

    const LP_DEPOSITOR = 4;
    await treasury.queue(LP_DEPOSITOR, instance.address);
    await treasury.toggle(LP_DEPOSITOR, instance.address, ZEROA);

    console.log("Address:", instance.address);
    await instance.setStaking(shelper.address, true);

    let controlVariable = 306;
    let vestingTerm = 2000;
    let minimumPrice = 1;
    let maxPayout = 1000;
    let fee = 1000;
    let maxDebt = 33000000000000;
    let initialDebt = new BigNumber("33000000000000").toString();
    await instance.initializeBondTerms(
      controlVariable,
      vestingTerm,
      minimumPrice,
      maxPayout,
      fee,
      maxDebt,
      initialDebt
    );

    let debt = await instance.totalDebt();
    console.log("Debt:", debt.toString());

    let bondPrice = await instance.bondPrice();
    console.log(bondPrice.toString());

    let reserves = await ohmdai.getReserves();
    console.log("Reserves: ", reserves.toString());

    let bondPriceUSD = await instance.bondPriceInUSD();
    console.log(bondPriceUSD.toString());

    let lpBalance = await ohmdai.balanceOf(deployer.address);
    console.log("LpBalance:", lpBalance.toString());

    let amount = new BigNumber(10).shiftedBy(14).toFixed();
    await ohmdai.approve(instance.address, amount);
    await instance.deposit(amount, bondPrice, deployer.address);
  });
});
