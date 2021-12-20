import "@nomiclabs/hardhat-waffle";
import { HardhatUserConfig } from "hardhat/types";
import "hardhat-gas-reporter";

export default {
  gasReporter: {
    enabled: false,
    coinmarketcap: "ab825642-b653-4b13-a4e4-d59c4aa3e3c4",
  },
  namedAccounts: {
    deployer: 0,
    tokenOwner: 1,
  },
  solidity: {
    compilers: [
      {
        version: "0.7.5",
        settings: {
          optimizer: {
            enabled: true,
            runs: 1000,
          },
        },
      },
      {
        version: "0.5.16",
        settings: {
          optimizer: {
            enabled: true,
            runs: 1000,
          },
        },
      },
      {
        version: "0.6.6",
        settings: {
          optimizer: {
            enabled: true,
            runs: 1000,
          },
        },
      },
    ],
  },
  paths: {
    artifacts: "./artifacts",
    cache: "./cache",
    sources: "./contracts",
    tests: "./test",
    imports: "./imports",
  },
  typechain: {
    outDir: "types",
    target: "ethers-v5",
  },
  networks: {
    hardhat: {
      mining: {
        // auto: false,
        // interval: 0,
      },
    },
    rinkeby: {
      url:
        "https://eth-rinkeby.alchemyapi.io/v2/tW4xcBCbivAL17g0-5quQ3O9877jc76P",
      accounts: [process.env.RUSHDEPLOYER],
      // accounts: [
      //   "0xebd6ed48f7f287edfbcd12c31cb5b15fa0de29a0bf150316757025fa422a30af",
      //   "0xb8cf7872d92e5c503ec94d340b02456ce45dd6dbe30c09ac70f5f42a55af8f17",
      // ],
      gasPrice: 2000000000,
    },
    main: {
      url:
        "https://eth-mainnet.alchemyapi.io/v2/IiuesrdLXlX46Q3egZTRDoA61CS7VpUV",
      accounts: [process.env.RUSHDEPLOYER],
      gasPrice: 2000000000,
    },
  },
};
