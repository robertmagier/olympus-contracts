import { ethers } from "hardhat";
import "@nomiclabs/hardhat-ethers";
const { solidity } = require("ethereum-waffle");
const { expect } = require("chai");
// console.log(ethers);
const ZEROA = "0x0000000000000000000000000000000000000000";
import { BigNumber } from "bignumber.js";

const BN = BigNumber;

var totalGas = new BN(0);

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

describe("Deploy contract for RUSHV2", function () {
  this.timeout(0);
  let deployer: any,
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

  const DAO: any = "0x1bBf6b9fed2417Efa40E331A890693D28D7b48Fd";

  let StakingHelper: any, shelper: any;

  it("Get signers", async () => {
    [deployer] = await ethers.getSigners();
    let block = await ethers.provider.getBlockNumber();
    firstEpochBlock = block;
  });

  it("Deploy RushV2 Token - rushV2", async () => {
    ERC20TOKEN = await ethers.getContractFactory("RushERC20Token");
    rushv2 = await ERC20TOKEN.deploy();
  });

  it("Set vault to deployer address", async () => {
    await rushv2.setVault(deployer.address);
  });

  it("Mint 100 000 000 RushV2 tokens", async () => {
    let amount = new BN("100000000").shiftedBy(9);
    await rushv2.mint(deployer.address, amount.toString());
  });

  it("Verify deployer balance", async () => {
    let amount = new BN("100000000").shiftedBy(9);
    let balance = await rushv2.balanceOf(deployer.address);
    expect(balance.toString()).to.be.equal(amount.toString());
  });

  it("Display Addresses", () => {
    console.log("RUSHV2: " + rushv2.address);
  });
});
