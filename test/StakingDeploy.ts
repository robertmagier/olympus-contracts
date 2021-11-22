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
    unirouter: any;

  let staker1: any, staker2: any;
  let StakingHelper: any, shelper: any;

  it("Get signers", async () => {
    [deployer, user1, staker1, staker2] = await ethers.getSigners();
  });
  it("Deploy tokens", async () => {
    //Total supply at 1000 000
    let totalSupply: any = new BigNumber(1000000).shiftedBy(18).toFixed(0);
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
    let UNISWAPPAIR = await ethers.getContractFactory("UniswapPair");
    // Attach to pair
    ohmdai = UNISWAPPAIR.attach(pair);
    expect(await ohmdai.symbol()).to.be.equal("UNI-V2");
  });

  it("DEPLOY UNISWAP ROUTER", async () => {
    UNIROUTER = await ethers.getContractFactory("UniswapRouter");
    unirouter = await UNIROUTER.deploy(uniswapfactory.address, weth.address);
  });

  it("Add liquidity to ohmdai", async () => {
    let deadline = (Date.now() / 1000 + 60).toFixed(0);

    await ohm.approve(unirouter.address, 100);
    await dai.approve(unirouter.address, 100);
    await unirouter.addLiquidity(
      ohm.address,
      dai.address,
      100,
      100,
      100,
      100,
      deployer.address,
      deadline
    );
  });
  return;

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
    let amount = 100;
    await dai.transfer(treasury.address, amount);
    expect(await treasury.totalReserves()).to.be.equal(0);
    await treasury.auditReserves();
    expect(await treasury.totalReserves()).to.be.equal(amount);
  });

  return;

  before(async () => {
    let block, epoch, firstEpoch;
    let amount: any = new BigNumber(1000000).shiftedBy(18).toFixed(0);

    await dai.transfer(treasury.address, amount);
    await treasury.auditReserves();

    // await ohm.setVault(treasury.address);
    await ohm.setVault(deployer.address);

    console.log("Staking addr:", staking.address);
  });

  it("Mint OHM for staker1", async () => {
    // await ohm.mint(staking.address, (parseInt(AMOUNT) * 20).toString());

    let balance = await ohm.balanceOf(staker1.address);
    expect(balance).to.be.equal((2 * parseInt(AMOUNT)).toString());
  });

  it("Check sOHM Balance", async () => {
    let balance = await sohm.balanceOf(staker1.address);
    expect(balance).to.be.equal("0");
  });

  it("Stake 100 OHM", async () => {
    let epoch = await staking.epoch();
    console.log({ epoch: epoch.number.toString() });
    await ohm.connect(staker1).increaseAllowance(shelper.address, AMOUNT);
    await ohm.connect(staker2).increaseAllowance(shelper.address, AMOUNT);

    let tx = await ohm
      .connect(staker1)
      .increaseAllowance(shelper.address, AMOUNT);
    await tx.wait();
    tx = await shelper.connect(staker1).stake(AMOUNT);
    let sohmBalance = await sohm.balanceOf(staker1.address);
    expect(sohmBalance).to.be.equal(AMOUNT);
    tx = await shelper.connect(staker2).stake(AMOUNT);
    await tx.wait();
    console.log(sohmBalance);
    let index = await staking.index();
    console.log("Index:", index.toString());
  });

  // it("Wait 1 seconds", (done) => {
  //   setTimeout(() => {
  //     console.log("Done");
  //     done();
  //   }, 15000);
  // });
  it("Check balance after 5 epochs", async () => {
    await staking.rebase();
    let index = await staking.index();
    console.log("Index:", index.toString());

    // let rebase = await sohm.rebases(0);
    // console.log(rebase);
    // rebase = await sohm.rebases(1);
    // console.log(rebase);
    // rebase = await sohm.rebases(2);
    // console.log(rebase);
    // rebase = await sohm.rebases(3);
    // console.log(rebase);
    // rebase = await sohm.rebases(4);
    // console.log(rebase);

    let tx = await shelper.connect(staker1).stake(AMOUNT);
    await tx.wait();
    index = await staking.index();
    console.log("Index:", index.toString());
    let sohmBalance = await sohm.balanceOf(staker1.address);
    console.log("Balance:", sohmBalance.toString());
    sohmBalance = await sohm.balanceOf(staker2.address);
    console.log("Balance:", sohmBalance.toString());
    let epoch = await staking.epoch();
    console.log({ epoch: epoch.number.toString() });
    tx = await staking.rebase();
    await tx.wait();
  });
});
