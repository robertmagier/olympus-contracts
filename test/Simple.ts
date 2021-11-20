// import { ethers } from "hardhat";
import "@nomiclabs/hardhat-ethers";
const { solidity } = require("ethereum-waffle");
const { expect } = require("chai");
// console.log(ethers);
const ZEROA = "0x0000000000000000000000000000000000000000";
const AMOUNT = "10000000000000";
import { BigNumber } from "bignumber.js";

describe("Simple Staking", () => {
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
    DAI: any,
    dai: any;

  let staker1: any, staker2: any;
  let StakingHelper: any, shelper: any;

  before(async () => {
    let amount: any = new BigNumber(1000000).shiftedBy(18).toFixed(0);
    [deployer, user1, staker1, staker2] = await ethers.getSigners();

    DAI = await ethers.getContractFactory("SimpleToken");
    dai = await DAI.deploy("DAI", "DAI", amount);

    OHM = await ethers.getContractFactory("OlympusERC20Token");
    ohm = await OHM.deploy();

    let epoch = 1;
    let block = await ethers.provider.getBlockNumber();
    let firstEpoch = block;
    Treasury = await ethers.getContractFactory("OlympusTreasury");
    treasury = await Treasury.deploy(
      ohm.address,
      dai.address,
      dai.address,
      dai.address,
      1
    );
    await dai.transfer(treasury.address, amount);
    await treasury.auditReserves();

    Distributor = await ethers.getContractFactory("Distributor");
    distributor = await Distributor.deploy(
      treasury.address,
      ohm.address,
      epoch,
      firstEpoch
    );

    // await ohm.setVault(treasury.address);
    await ohm.setVault(deployer.address);

    sOHM = await ethers.getContractFactory("sOlympus");
    sohm = await sOHM.deploy();

    Staking = await ethers.getContractFactory("OlympusStaking");
    staking = await Staking.deploy(
      ohm.address,
      sohm.address,
      epoch,
      block,
      firstEpoch
    );
    sohm.initialize(staking.address);

    WarmUp = await ethers.getContractFactory("StakingWarmup");
    warmup = await WarmUp.deploy(staking.address, sohm.address);

    await staking.setContract(1, warmup.address);

    console.log("Staking addr:", staking.address);
    StakingHelper = await ethers.getContractFactory("StakingHelper");
    shelper = await StakingHelper.deploy(staking.address, ohm.address);
  });

  it("Mint OHM for staker1", async () => {
    await treasury.queue(8, distributor.address);
    await ohm.mint(staker1.address, AMOUNT);
    await ohm.mint(staker1.address, AMOUNT);
    await ohm.mint(staker2.address, AMOUNT);

    // await ohm.mint(staking.address, (parseInt(AMOUNT) * 20).toString());
    await ohm.setVault(treasury.address);
    await staking.setContract(0, distributor.address);
    await distributor.addRecipient(staking.address, 100);
    await treasury.toggle(8, distributor.address, ZEROA);

    let isManager = await treasury.isRewardManager(distributor.address);
    console.log({ isManager });

    let balance = await ohm.balanceOf(staker1.address);
    expect(balance).to.be.equal((2 * parseInt(AMOUNT)).toString());

    let totalReserves = await treasury.totalReserves();
    console.log("Total Reserves: ", totalReserves.toString());
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
