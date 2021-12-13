import { ethers } from "hardhat";
import "@nomiclabs/hardhat-ethers";
const { solidity } = require("ethereum-waffle");
const { expect } = require("chai");
// console.log(ethers);
const ZEROA = "0x0000000000000000000000000000000000000000";
const AMOUNT = "10000000000000";
import { BigNumber } from "bignumber.js";

const EPOCH_LENGTH = 1;
const FIRST_EPOCH = 0;
const RATE = 100;

describe("Deploy contract for Staking", () => {
  let deployer: any,
    user1: any,
    OHM,
    Staking,
    staking: any,
    ohm: any,
    sOHM,
    sohm: any,
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
    UniswapV2Library: any,
    uniswapv2library: any;

  let staker1: any, staker2: any;
  let StakingHelper: any, shelper: any;

  it("Get signers", async () => {
    [deployer, user1, staker1, staker2] = await ethers.getSigners();
  });

  it("Deploy tokens", async () => {
    //Total supply at 1000 000
    let totalSupply: any = new BigNumber(10).shiftedBy(36).toFixed(0);
    ERC20TOKEN = await ethers.getContractFactory("SimpleToken");
    dai = await ERC20TOKEN.deploy("DAI", "DAI", totalSupply);
    weth = await ERC20TOKEN.deploy("WETH", "WETH", totalSupply);
    frax = await ERC20TOKEN.deploy("FRAX", "FRAX", totalSupply);
    ohmdai = await ERC20TOKEN.deploy("OHMDAI", "OHMDAI", totalSupply);

    let name = await dai.name();
    expect(name).to.be.equal("DAI");

    name = await frax.name();
    expect(name).to.be.equal("FRAX");
    name = await ohmdai.name();
    expect(name).to.be.equal("OHMDAI");

    expect(await weth.name()).to.be.equal("WETH");
  });

  it("Deploy Olympus Token - OHM", async () => {
    OHM = await ethers.getContractFactory("OlympusERC20Token");
    ohm = await OHM.deploy();
    await ohm.setVault(deployer.address);
  });

  it("Deploy Standard Bond Calculator", async () => {
    CALCULATOR = await ethers.getContractFactory("OlympusBondingCalculator");
    calculator = await CALCULATOR.deploy(ohm.address);
    expect(await calculator.OHM()).to.be.equal(ohm.address);
  });

  it("Deploy UniswapPair", async () => {
    // Deploy Uniswap Factory
    UniswapFactory = await ethers.getContractFactory("UniswapFactory");
    uniswapfactory = await UniswapFactory.deploy(deployer.address);
    // Create Pair
    await uniswapfactory.createPair(ohm.address, dai.address);
    let pair = await uniswapfactory.getPair(ohm.address, dai.address);
    console.log("Pair:", pair);
    let UNISWAPPAIR = await ethers.getContractFactory("UniswapPair");
    // Attach to pair
    ohmdai = UNISWAPPAIR.attach(pair);
    expect(await ohmdai.symbol()).to.be.equal("UNI-V2");
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
  it("Add liquidity to ohmdai", async () => {
    let deadline = (Date.now() / 1000 + 60).toFixed(0);
    let amount0 = new BigNumber(10).shiftedBy(32).times(1).toFixed();
    let amount1 = new BigNumber(10).shiftedBy(11).times(5).toFixed();
    await dai.approve(unirouter.address, amount0);
    await ohm.approve(unirouter.address, amount1);
    await ohm.mint(deployer.address, amount1);
    await unirouter.addLiquidity(
      dai.address,
      ohm.address,
      amount0,
      amount1,
      amount0,
      amount1,
      deployer.address,
      deadline
    );
  });

  it("Deploy Treasury", async () => {
    let blocksNeededForQueue = 1;
    Treasury = await ethers.getContractFactory("OlympusTreasury");
    treasury = await Treasury.deploy(
      ohm.address,
      dai.address,
      frax.address,
      ohmdai.address,
      blocksNeededForQueue
    );
    let reserveToken0 = await treasury.reserveTokens(0);
    let reserveToken1 = await treasury.reserveTokens(1);
    let liquidityToken0 = await treasury.liquidityTokens(0);
    expect(reserveToken0).to.be.equal(dai.address);
    expect(reserveToken1).to.be.equal(frax.address);
    expect(liquidityToken0).to.be.equal(ohmdai.address);
    let amount1 = new BigNumber(10).shiftedBy(11).times(5).toFixed();
    await ohm.mint(treasury.address, amount1);
  });

  it("Set bonding calculator for LP ohmdai", async () => {
    let blocksNeededForQueue = 1;

    const LIQUIDITYTOKEN_ENUM = 5;
    await treasury.queue(LIQUIDITYTOKEN_ENUM, ohmdai.address);
    await treasury.toggle(
      LIQUIDITYTOKEN_ENUM,
      ohmdai.address,
      calculator.address
    );
    await treasury.queue(LIQUIDITYTOKEN_ENUM, ohmdai.address);
    await treasury.toggle(
      LIQUIDITYTOKEN_ENUM,
      ohmdai.address,
      calculator.address
    );
    expect(await treasury.bondCalculator(ohmdai.address)).to.be.equal(
      calculator.address
    );
    expect(await treasury.isLiquidityToken(ohmdai.address)).to.be.true;
  });

  it("Deploy Distributor", async () => {
    let firstEpoch = await ethers.provider.getBlockNumber();
    Distributor = await ethers.getContractFactory("Distributor");
    distributor = await Distributor.deploy(
      treasury.address,
      ohm.address,
      EPOCH_LENGTH,
      firstEpoch
    );
    expect(await distributor.treasury()).to.be.equal(treasury.address);
    expect(await distributor.OHM()).to.be.equal(ohm.address);
    expect(await distributor.epochLength()).to.be.equal(EPOCH_LENGTH);
  });

  it("Set distributor address in treasury as REWARD MANAGER", async () => {
    const REWARD_MANAGER_ENUM = 8;
    await treasury.queue(REWARD_MANAGER_ENUM, distributor.address);
    await treasury.toggle(REWARD_MANAGER_ENUM, distributor.address, ZEROA);
    expect(await treasury.isRewardManager(distributor.address)).to.be.true;
  });

  it("Deploy sOHM token", async () => {
    sOHM = await ethers.getContractFactory("sOlympus");
    sohm = await sOHM.deploy();
    expect(await sohm.name()).to.be.equal("Staked Olympus");
  });

  it("Deploy Olympus Staking contract", async () => {
    let firstEpochBlock = await ethers.provider.getBlockNumber();

    Staking = await ethers.getContractFactory("OlympusStaking");
    staking = await Staking.deploy(
      ohm.address,
      sohm.address,
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
    await ohm.setVault(treasury.address);
    expect(await ohm.vault()).to.be.equal(treasury.address);
  });

  it("Initialize sohm with Olympus Staking address", async () => {
    sohm.initialize(staking.address);
    expect(await sohm.stakingContract()).to.be.equal(staking.address);
  });

  it("Deploy WarmUp contract", async () => {
    WarmUp = await ethers.getContractFactory("StakingWarmup");
    warmup = await WarmUp.deploy(staking.address, sohm.address);
    expect(await warmup.staking()).to.be.equal(staking.address);
    expect(await warmup.sOHM()).to.be.equal(sohm.address);
  });

  it("Configure warmup address in staking contract", async () => {
    const WARMUP_ENUM = 1;
    await staking.setContract(WARMUP_ENUM, warmup.address);
    expect(await staking.warmupContract()).to.be.equal(warmup.address);
  });

  it("Deploy Staking Helper", async () => {
    StakingHelper = await ethers.getContractFactory("StakingHelper");
    shelper = await StakingHelper.deploy(staking.address, ohm.address);
    expect(await shelper.staking()).to.be.equal(staking.address);
    expect(await shelper.OHM()).to.be.equal(ohm.address);
  });

  it("Check treasury total reserves", async () => {
    let totalReserves = await treasury.totalReserves();
    expect(totalReserves).to.be.equal(0);
  });

  it("Increase total reserves by 100 on each reserve and LP token", async () => {
    let amount = Math.pow(10, 18).toString();
    await dai.transfer(treasury.address, amount);
    expect(await treasury.totalReserves()).to.be.equal(0);
    await treasury.auditReserves();
    let expected = Math.pow(10, 9);
    expect(await treasury.totalReserves()).to.be.equal(expected.toString());
  });

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
