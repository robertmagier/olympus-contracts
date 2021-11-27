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
    uniswapv2library: any,
    amountForUsers: number;

  let staker1: any, staker2: any;
  let StakingHelper: any, shelper: any;

  before("Get signers", async () => {
    amountForUsers = Math.pow(10, 20);
    let totalSupply: any = new BigNumber(1000000).shiftedBy(27).toFixed(0);
    [deployer, user1, staker1, staker2] = await ethers.getSigners();

    ERC20TOKEN = await ethers.getContractFactory("SimpleToken");
    dai = await ERC20TOKEN.deploy("DAI", "DAI", totalSupply);
    weth = await ERC20TOKEN.deploy("WETH", "WETH", totalSupply);
    frax = await ERC20TOKEN.deploy("FRAX", "FRAX", totalSupply);
    ohmdai = await ERC20TOKEN.deploy("OHMDAI", "OHMDAI", totalSupply);

    OHM = await ethers.getContractFactory("OlympusERC20Token");
    ohm = await OHM.deploy();
    await ohm.setVault(deployer.address);
    CALCULATOR = await ethers.getContractFactory("OlympusBondingCalculator");
    calculator = await CALCULATOR.deploy(ohm.address);

    // Deploy Uniswap Factory
    UniswapFactory = await ethers.getContractFactory("UniswapFactory");
    uniswapfactory = await UniswapFactory.deploy(deployer.address);
    // Create Pair
    await uniswapfactory.createPair(ohm.address, dai.address);
    let pair = await uniswapfactory.getPair(ohm.address, dai.address);

    let UNISWAPPAIR = await ethers.getContractFactory("UniswapPair");
    // Attach to pair
    ohmdai = UNISWAPPAIR.attach(pair);

    UNIROUTER = await ethers.getContractFactory("UniswapRouter");
    unirouter = await UNIROUTER.deploy(uniswapfactory.address, weth.address);

    await ohm.mint(deployer.address, (amountForUsers * 4).toString());

    // Transfer to users
    await ohm.transfer(staker1.address, amountForUsers.toString());
    await ohm.transfer(staker2.address, amountForUsers.toString());
    await ohm.transfer(user1.address, amountForUsers.toString());

    let deadline = (Date.now() / 1000 + 60).toFixed(0);
    await ohm.approve(unirouter.address, 100000);
    await dai.approve(unirouter.address, 100000);
    await frax.approve(unirouter.address, 100000);
    await unirouter.addLiquidity(
      dai.address,
      ohm.address,
      10000,
      10000,
      10000,
      10000,
      deployer.address,
      deadline
    );
    let blocksNeededForQueue = 1;
    Treasury = await ethers.getContractFactory("OlympusTreasury");
    treasury = await Treasury.deploy(
      ohm.address,
      dai.address,
      frax.address,
      ohmdai.address,
      blocksNeededForQueue
    );

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

    let firstEpoch = await ethers.provider.getBlockNumber();
    Distributor = await ethers.getContractFactory("Distributor");
    distributor = await Distributor.deploy(
      treasury.address,
      ohm.address,
      EPOCH_LENGTH,
      firstEpoch
    );
    const REWARD_MANAGER_ENUM = 8;
    await treasury.queue(REWARD_MANAGER_ENUM, distributor.address);
    await treasury.toggle(REWARD_MANAGER_ENUM, distributor.address, ZEROA);

    sOHM = await ethers.getContractFactory("sOlympus");
    sohm = await sOHM.deploy();

    let firstEpochBlock = await ethers.provider.getBlockNumber();

    Staking = await ethers.getContractFactory("OlympusStaking");
    staking = await Staking.deploy(
      ohm.address,
      sohm.address,
      EPOCH_LENGTH,
      FIRST_EPOCH,
      firstEpochBlock
    );
    await staking.setContract(0, distributor.address);

    await distributor.addRecipient(staking.address, RATE);
    let info0 = await distributor.info(0);

    await ohm.setVault(treasury.address);

    sohm.initialize(staking.address);

    WarmUp = await ethers.getContractFactory("StakingWarmup");
    warmup = await WarmUp.deploy(staking.address, sohm.address);

    const WARMUP_ENUM = 1;
    await staking.setContract(WARMUP_ENUM, warmup.address);

    StakingHelper = await ethers.getContractFactory("StakingHelper");
    shelper = await StakingHelper.deploy(staking.address, ohm.address);
  });
  it("Check if user balances are corect", async () => {
    expect(await ohm.balanceOf(staker1.address)).to.be.equal(
      amountForUsers.toString()
    );
    expect(await ohm.balanceOf(staker2.address)).to.be.equal(
      amountForUsers.toString()
    );
    expect(await ohm.balanceOf(user1.address)).to.be.equal(
      amountForUsers.toString()
    );
  });

  it("Transfer DAI tokens to Treasury to increase reserves", async () => {
    let amount = new BigNumber(
      (amountForUsers * 5 * Math.pow(10, 9)).toString()
    ).toFixed(0);
    await dai.transfer(treasury.address, amount);
    expect(await dai.balanceOf(treasury.address)).to.be.equal(amount);
    await treasury.auditReserves();
  });
  it("Stake 1 token for staker1 and check sOHM increase", async () => {
    let total = await ohm.totalSupply();
    console.log("OHM total supply:", total.toString());
    let stotal = await sohm.totalSupply();
    console.log("SOHM total supply:", total.toString());
    let stakeAmount = (Math.pow(10, 15) * 2).toString();
    expect(await sohm.balanceOf(staker1.address)).to.be.equal(0);
    await ohm.connect(staker1).approve(shelper.address, stakeAmount);
    await shelper.connect(staker1).stake(stakeAmount);
    // let balance = await sohm.balanceOf(staker1.address);
    // expect(balance.toString()).to.be.equal(stakeAmount);
    // console.log(balance.toString());
    let previous = new BigNumber(total.toString());
    let sprevious = new BigNumber(stotal.toString());
    let uprevious = await sohm.balanceOf(staker1.address);

    let sincrease = new BigNumber(100);
    let increase = new BigNumber(100);
    let uincrease = new BigNumber(100);
    for (let i = 0; i < 10; i++) {
      await staking.rebase();

      let total = await ohm.totalSupply();
      total = new BigNumber(total.toString());

      if (previous.gt(0)) {
        increase = new BigNumber(total.toString())
          .minus(previous)
          .div(previous)
          .times(100);
      }
      console.log("****************OLYMPUS***********************");
      console.log("OHM New Total:     ", total.toString());
      console.log("OHM Previous Total:", previous.toString());
      console.log("OHM Increase%:     ", increase.toString());
      console.log("OHM Increase:      ", total.minus(previous).toString());
      previous = new BigNumber(total.toString());

      let stotal = await sohm.totalSupply();
      stotal = new BigNumber(stotal.toString());
      if (sprevious.gt(0)) {
        sincrease = new BigNumber(stotal.toString())
          .minus(sprevious)
          .div(sprevious)
          .times(100);
      }

      console.log("****************SOHM***********************");
      console.log("SOHM New Total:     ", stotal.toString());
      console.log("SOHM Previous Total:", sprevious.toString());
      console.log("SOHM Increase%:     ", sincrease.toString());
      console.log("SOHM Increase:      ", stotal.minus(sprevious).toString());
      sprevious = new BigNumber(stotal.toString());

      let ubalance = await sohm.balanceOf(staker1.address);
      ubalance = new BigNumber(ubalance.toString());

      if (uprevious.gt(0)) {
        uincrease = new BigNumber(ubalance.toString())
          .minus(uprevious)
          .div(uprevious)
          .times(100);
      }

      console.log("****************STAKER SOHM***********************");
      console.log("SOHM New Balance:      ", ubalance.toString());
      console.log("SOHM Previous Balance1:", uprevious.toString());
      console.log("Increase%:             ", uincrease.toString());
      console.log(
        "Increase:              ",
        ubalance.minus(uprevious).toString()
      );
      uprevious = new BigNumber(ubalance.toString());
    }
    // balance = await sohm.balanceOf(staker1.address);
    // console.log(balance.toString());
    // balance = await sohm.balanceOf(staker1.address);
    // console.log(balance.toString());
  });
});
