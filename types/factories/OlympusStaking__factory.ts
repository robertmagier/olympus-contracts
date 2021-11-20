/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import {
  Signer,
  utils,
  Contract,
  ContractFactory,
  Overrides,
  BigNumberish,
} from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type {
  OlympusStaking,
  OlympusStakingInterface,
} from "../OlympusStaking";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_OHM",
        type: "address",
      },
      {
        internalType: "address",
        name: "_sOHM",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_epochLength",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_firstEpochNumber",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_firstEpochBlock",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipPulled",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipPushed",
    type: "event",
  },
  {
    inputs: [],
    name: "OHM",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_recipient",
        type: "address",
      },
    ],
    name: "claim",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "contractBalance",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "distributor",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "epoch",
    outputs: [
      {
        internalType: "uint256",
        name: "length",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "number",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "endBlock",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "distribute",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "forfeit",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_amount",
        type: "uint256",
      },
    ],
    name: "giveLockBonus",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "index",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "locker",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "manager",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "pullManagement",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner_",
        type: "address",
      },
    ],
    name: "pushManagement",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "rebase",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceManagement",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_amount",
        type: "uint256",
      },
    ],
    name: "returnLockBonus",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "sOHM",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "enum OlympusStaking.CONTRACTS",
        name: "_contract",
        type: "uint8",
      },
      {
        internalType: "address",
        name: "_address",
        type: "address",
      },
    ],
    name: "setContract",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_warmupPeriod",
        type: "uint256",
      },
    ],
    name: "setWarmup",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_amount",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "_recipient",
        type: "address",
      },
    ],
    name: "stake",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "toggleDepositLock",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "totalBonus",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_amount",
        type: "uint256",
      },
      {
        internalType: "bool",
        name: "_trigger",
        type: "bool",
      },
    ],
    name: "unstake",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "warmupContract",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "warmupInfo",
    outputs: [
      {
        internalType: "uint256",
        name: "deposit",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "gons",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "expiry",
        type: "uint256",
      },
      {
        internalType: "bool",
        name: "lock",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "warmupPeriod",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

const _bytecode =
  "0x60c060405234801561001057600080fd5b50604051612a94380380612a94833981810160405260a081101561003357600080fd5b810190808051906020019092919080519060200190929190805190602001909291908051906020019092919080519060200190929190505050336000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555060008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16600073ffffffffffffffffffffffffffffffffffffffff167fea8258f2d9ddb679928cf34b78cf645b7feda9acc828e4dd82d014eaae270eba60405160405180910390a3600073ffffffffffffffffffffffffffffffffffffffff168573ffffffffffffffffffffffffffffffffffffffff16141561016157600080fd5b8473ffffffffffffffffffffffffffffffffffffffff1660808173ffffffffffffffffffffffffffffffffffffffff1660601b81525050600073ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff1614156101d257600080fd5b8373ffffffffffffffffffffffffffffffffffffffff1660a08173ffffffffffffffffffffffffffffffffffffffff1660601b8152505060405180608001604052808481526020018381526020018281526020016000815250600260008201518160000155602082015181600101556040820151816002015560608201518160030155905050505050505060805160601c60a05160601c6127c86102cc6000398061069b528061086352806109e45280610b06528061114352806112d4528061182052806118eb5280611af05280611e495280612053525080610fcd528061166c528061186c52806118b65280611f6d52506127c86000f3fe608060405234801561001057600080fd5b50600436106101735760003560e01c80638f077b83116100de578063bfe1092811610097578063deac361a11610071578063deac361a14610573578063ed4acaa814610591578063f3d86e4a146105c5578063f62ae76a146105cf57610173565b8063bfe10928146104dd578063c9f464ff14610511578063d7b96d4e1461053f57610173565b80638f077b831461040a578063900cf0cf146104145780639ebea88c14610447578063a6c41fec14610481578063a8dd07dc146104b5578063af14052c146104d357610173565b8063481c6a7511610130578063481c6a751461028a5780635a96ac0a146102be5780636746f4c2146102c85780637acb775714610337578063865e6fd31461039b5780638b7afe2e146103ec57610173565b806303c2367014610178578063089208d8146101a657806315079925146101b05780631e83409a146101e45780632986c0e51461022857806346f68ee914610246575b600080fd5b6101a46004803603602081101561018e57600080fd5b81019080803590602001909291905050506105fd565b005b6101ae6106e2565b005b6101b8610861565b604051808273ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b610226600480360360208110156101fa57600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190505050610885565b005b610230610b02565b6040518082815260200191505060405180910390f35b6102886004803603602081101561025c57600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190505050610baa565b005b610292610daf565b604051808273ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b6102c6610dd8565b005b61030a600480360360208110156102de57600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190505050610f7e565b60405180858152602001848152602001838152602001821515815260200194505050505060405180910390f35b6103836004803603604081101561034d57600080fd5b8101908080359060200190929190803573ffffffffffffffffffffffffffffffffffffffff169060200190929190505050610fbb565b60405180821515815260200191505060405180910390f35b6103ea600480360360408110156103b157600080fd5b81019080803560ff169060200190929190803573ffffffffffffffffffffffffffffffffffffffff169060200190929190505050611323565b005b6103f4611662565b6040518082815260200191505060405180910390f35b61041261173f565b005b61041c6117eb565b6040518085815260200184815260200183815260200182815260200194505050505060405180910390f35b61047f6004803603604081101561045d57600080fd5b8101908080359060200190929190803515159060200190929190505050611809565b005b6104896118b4565b604051808273ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b6104bd6118d8565b6040518082815260200191505060405180910390f35b6104db6118de565b005b6104e5611bca565b604051808273ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b61053d6004803603602081101561052757600080fd5b8101908080359060200190929190505050611bf0565b005b610547611cbb565b604051808273ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b61057b611ce1565b6040518082815260200191505060405180910390f35b610599611ce7565b604051808273ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b6105cd611d0d565b005b6105fb600480360360208110156105e557600080fd5b8101908080359060200190929190505050611fb4565b005b600760009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161461065757600080fd5b61066c8160085461209b90919063ffffffff16565b6008819055506106df600760009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16827f000000000000000000000000000000000000000000000000000000000000000073ffffffffffffffffffffffffffffffffffffffff166121239092919063ffffffff16565b50565b3373ffffffffffffffffffffffffffffffffffffffff1660008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16146107a3576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260208152602001807f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e657281525060200191505060405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff1660008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167fea8258f2d9ddb679928cf34b78cf645b7feda9acc828e4dd82d014eaae270eba60405160405180910390a360008060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550565b7f000000000000000000000000000000000000000000000000000000000000000081565b61088d6126b0565b600b60008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206040518060800160405290816000820154815260200160018201548152602001600282015481526020016003820160009054906101000a900460ff161515151581525050905080604001516002600101541015801561093057506000816040015114155b15610afe57600b60008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600080820160009055600182016000905560028201600090556003820160006101000a81549060ff02191690555050600960009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663c3a2a665837f000000000000000000000000000000000000000000000000000000000000000073ffffffffffffffffffffffffffffffffffffffff16637965d56d85602001516040518263ffffffff1660e01b81526004018082815260200191505060206040518083038186803b158015610a5757600080fd5b505afa158015610a6b573d6000803e3d6000fd5b505050506040513d6020811015610a8157600080fd5b81019080805190602001909291905050506040518363ffffffff1660e01b8152600401808373ffffffffffffffffffffffffffffffffffffffff16815260200182815260200192505050600060405180830381600087803b158015610ae557600080fd5b505af1158015610af9573d6000803e3d6000fd5b505050505b5050565b60007f000000000000000000000000000000000000000000000000000000000000000073ffffffffffffffffffffffffffffffffffffffff16632986c0e56040518163ffffffff1660e01b815260040160206040518083038186803b158015610b6a57600080fd5b505afa158015610b7e573d6000803e3d6000fd5b505050506040513d6020811015610b9457600080fd5b8101908080519060200190929190505050905090565b3373ffffffffffffffffffffffffffffffffffffffff1660008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1614610c6b576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260208152602001807f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e657281525060200191505060405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff161415610cf1576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260268152602001806126fe6026913960400191505060405180910390fd5b8073ffffffffffffffffffffffffffffffffffffffff1660008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167fea8258f2d9ddb679928cf34b78cf645b7feda9acc828e4dd82d014eaae270eba60405160405180910390a380600160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555050565b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905090565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614610e7e576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260228152602001806127476022913960400191505060405180910390fd5b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1660008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167faa151555690c956fc3ea32f106bb9f119b5237a061eaa8557cff3e51e3792c8d60405160405180910390a3600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff166000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550565b600b6020528060005260406000206000915090508060000154908060010154908060020154908060030160009054906101000a900460ff16905084565b6000610fc56118de565b6110123330857f000000000000000000000000000000000000000000000000000000000000000073ffffffffffffffffffffffffffffffffffffffff166121c5909392919063ffffffff16565b61101a6126b0565b600b60008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206040518060800160405290816000820154815260200160018201548152602001600282015481526020016003820160009054906101000a900460ff1615151515815250509050806060015115611117576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252601f8152602001807f4465706f7369747320666f72206163636f756e7420617265206c6f636b65640081525060200191505060405180910390fd5b604051806080016040528061113986846000015161209b90919063ffffffff16565b81526020016112007f000000000000000000000000000000000000000000000000000000000000000073ffffffffffffffffffffffffffffffffffffffff16631bd39674886040518263ffffffff1660e01b81526004018082815260200191505060206040518083038186803b1580156111b257600080fd5b505afa1580156111c6573d6000803e3d6000fd5b505050506040513d60208110156111dc57600080fd5b8101908080519060200190929190505050846020015161209b90919063ffffffff16565b815260200161121f600a5460026001015461209b90919063ffffffff16565b815260200160001515815250600b60008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008201518160000155602082015181600101556040820151816002015560608201518160030160006101000a81548160ff021916908315150217905550905050611318600960009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16857f000000000000000000000000000000000000000000000000000000000000000073ffffffffffffffffffffffffffffffffffffffff166121239092919063ffffffff16565b600191505092915050565b3373ffffffffffffffffffffffffffffffffffffffff1660008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16146113e4576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260208152602001807f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e657281525060200191505060405180910390fd5b600060028111156113f157fe5b8260028111156113fd57fe5b14156114495780600660006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555061165e565b6001600281111561145657fe5b82600281111561146257fe5b141561155557600073ffffffffffffffffffffffffffffffffffffffff16600960009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff161461150f576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260238152602001806127246023913960400191505060405180910390fd5b80600960006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555061165d565b60028081111561156157fe5b82600281111561156d57fe5b141561165c57600073ffffffffffffffffffffffffffffffffffffffff16600760009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff161461161a576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260238152602001806126db6023913960400191505060405180910390fd5b80600760006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055505b5b5b5050565b600061173a6008547f000000000000000000000000000000000000000000000000000000000000000073ffffffffffffffffffffffffffffffffffffffff166370a08231306040518263ffffffff1660e01b8152600401808273ffffffffffffffffffffffffffffffffffffffff16815260200191505060206040518083038186803b1580156116f157600080fd5b505afa158015611705573d6000803e3d6000fd5b505050506040513d602081101561171b57600080fd5b810190808051906020019092919050505061209b90919063ffffffff16565b905090565b600b60003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060030160009054906101000a900460ff1615600b60003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060030160006101000a81548160ff021916908315150217905550565b60028060000154908060010154908060020154908060030154905084565b8015611818576118176118de565b5b6118653330847f000000000000000000000000000000000000000000000000000000000000000073ffffffffffffffffffffffffffffffffffffffff166121c5909392919063ffffffff16565b6118b033837f000000000000000000000000000000000000000000000000000000000000000073ffffffffffffffffffffffffffffffffffffffff166121239092919063ffffffff16565b5050565b7f000000000000000000000000000000000000000000000000000000000000000081565b60085481565b43600280015411611bc8577f000000000000000000000000000000000000000000000000000000000000000073ffffffffffffffffffffffffffffffffffffffff1663058ecdb46002600301546002600101546040518363ffffffff1660e01b81526004018083815260200182815260200192505050602060405180830381600087803b15801561196e57600080fd5b505af1158015611982573d6000803e3d6000fd5b505050506040513d602081101561199857600080fd5b8101908080519060200190929190505050506119c6600260000154600280015461209b90919063ffffffff16565b6002800181905550600260010160008154809291906001019190505550600073ffffffffffffffffffffffffffffffffffffffff16600660009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1614611ae057600660009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663e4fc6b6d6040518163ffffffff1660e01b8152600401602060405180830381600087803b158015611aa357600080fd5b505af1158015611ab7573d6000803e3d6000fd5b505050506040513d6020811015611acd57600080fd5b8101908080519060200190929190505050505b6000611aea611662565b905060007f000000000000000000000000000000000000000000000000000000000000000073ffffffffffffffffffffffffffffffffffffffff16639358928b6040518163ffffffff1660e01b815260040160206040518083038186803b158015611b5457600080fd5b505afa158015611b68573d6000803e3d6000fd5b505050506040513d6020811015611b7e57600080fd5b81019080805190602001909291905050509050808211611ba8576000600260030181905550611bc5565b611bbb818361228690919063ffffffff16565b6002600301819055505b50505b565b600660009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b3373ffffffffffffffffffffffffffffffffffffffff1660008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1614611cb1576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260208152602001807f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e657281525060200191505060405180910390fd5b80600a8190555050565b600760009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b600a5481565b600960009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b611d156126b0565b600b60003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206040518060800160405290816000820154815260200160018201548152602001600282015481526020016003820160009054906101000a900460ff1615151515815250509050600b60003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600080820160009055600182016000905560028201600090556003820160006101000a81549060ff02191690555050600960009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663c3a2a665307f000000000000000000000000000000000000000000000000000000000000000073ffffffffffffffffffffffffffffffffffffffff16637965d56d85602001516040518263ffffffff1660e01b81526004018082815260200191505060206040518083038186803b158015611ebc57600080fd5b505afa158015611ed0573d6000803e3d6000fd5b505050506040513d6020811015611ee657600080fd5b81019080805190602001909291905050506040518363ffffffff1660e01b8152600401808373ffffffffffffffffffffffffffffffffffffffff16815260200182815260200192505050600060405180830381600087803b158015611f4a57600080fd5b505af1158015611f5e573d6000803e3d6000fd5b50505050611fb13382600001517f000000000000000000000000000000000000000000000000000000000000000073ffffffffffffffffffffffffffffffffffffffff166121239092919063ffffffff16565b50565b600760009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161461200e57600080fd5b6120238160085461228690919063ffffffff16565b600881905550612098600760009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1630837f000000000000000000000000000000000000000000000000000000000000000073ffffffffffffffffffffffffffffffffffffffff166121c5909392919063ffffffff16565b50565b600080828401905083811015612119576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252601b8152602001807f536166654d6174683a206164646974696f6e206f766572666c6f77000000000081525060200191505060405180910390fd5b8091505092915050565b6121c08363a9059cbb60e01b8484604051602401808373ffffffffffffffffffffffffffffffffffffffff16815260200182815260200192505050604051602081830303815290604052907bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19166020820180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff83818316178352505050506122d0565b505050565b612280846323b872dd60e01b858585604051602401808473ffffffffffffffffffffffffffffffffffffffff1681526020018373ffffffffffffffffffffffffffffffffffffffff1681526020018281526020019350505050604051602081830303815290604052907bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19166020820180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff83818316178352505050506122d0565b50505050565b60006122c883836040518060400160405280601e81526020017f536166654d6174683a207375627472616374696f6e206f766572666c6f7700008152506123bf565b905092915050565b6060612332826040518060400160405280602081526020017f5361666545524332303a206c6f772d6c6576656c2063616c6c206661696c65648152508573ffffffffffffffffffffffffffffffffffffffff1661247f9092919063ffffffff16565b90506000815111156123ba5780806020019051602081101561235357600080fd5b81019080805190602001909291905050506123b9576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252602a815260200180612769602a913960400191505060405180910390fd5b5b505050565b600083831115829061246c576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825283818151815260200191508051906020019080838360005b83811015612431578082015181840152602081019050612416565b50505050905090810190601f16801561245e5780820380516001836020036101000a031916815260200191505b509250505060405180910390fd5b5060008385039050809150509392505050565b606061248e8484600085612497565b90509392505050565b60606124a28561269d565b612514576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252601d8152602001807f416464726573733a2063616c6c20746f206e6f6e2d636f6e747261637400000081525060200191505060405180910390fd5b600060608673ffffffffffffffffffffffffffffffffffffffff1685876040518082805190602001908083835b602083106125645780518252602082019150602081019050602083039250612541565b6001836020036101000a03801982511681845116808217855250505050505090500191505060006040518083038185875af1925050503d80600081146125c6576040519150601f19603f3d011682016040523d82523d6000602084013e6125cb565b606091505b509150915081156125e0578092505050612695565b6000815111156125f35780518082602001fd5b836040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825283818151815260200191508051906020019080838360005b8381101561265a57808201518184015260208101905061263f565b50505050905090810190601f1680156126875780820380516001836020036101000a031916815260200191505b509250505060405180910390fd5b949350505050565b600080823b905060008111915050919050565b6040518060800160405280600081526020016000815260200160008152602001600015158152509056fe4c6f636b65722063616e6e6f7420626520736574206d6f7265207468616e206f6e63654f776e61626c653a206e6577206f776e657220697320746865207a65726f20616464726573735761726d75702063616e6e6f7420626520736574206d6f7265207468616e206f6e63654f776e61626c653a206d757374206265206e6577206f776e657220746f2070756c6c5361666545524332303a204552433230206f7065726174696f6e20646964206e6f742073756363656564a26469706673582212200b9fe19e971992cf8680b0e49d24db3bdfac01a0134cc677dbd858768be2b3f364736f6c63430007050033";

type OlympusStakingConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: OlympusStakingConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class OlympusStaking__factory extends ContractFactory {
  constructor(...args: OlympusStakingConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  deploy(
    _OHM: string,
    _sOHM: string,
    _epochLength: BigNumberish,
    _firstEpochNumber: BigNumberish,
    _firstEpochBlock: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<OlympusStaking> {
    return super.deploy(
      _OHM,
      _sOHM,
      _epochLength,
      _firstEpochNumber,
      _firstEpochBlock,
      overrides || {}
    ) as Promise<OlympusStaking>;
  }
  getDeployTransaction(
    _OHM: string,
    _sOHM: string,
    _epochLength: BigNumberish,
    _firstEpochNumber: BigNumberish,
    _firstEpochBlock: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(
      _OHM,
      _sOHM,
      _epochLength,
      _firstEpochNumber,
      _firstEpochBlock,
      overrides || {}
    );
  }
  attach(address: string): OlympusStaking {
    return super.attach(address) as OlympusStaking;
  }
  connect(signer: Signer): OlympusStaking__factory {
    return super.connect(signer) as OlympusStaking__factory;
  }
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): OlympusStakingInterface {
    return new utils.Interface(_abi) as OlympusStakingInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): OlympusStaking {
    return new Contract(address, _abi, signerOrProvider) as OlympusStaking;
  }
}
