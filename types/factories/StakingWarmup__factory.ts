/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { StakingWarmup, StakingWarmupInterface } from "../StakingWarmup";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_staking",
        type: "address",
      },
      {
        internalType: "address",
        name: "_sOHM",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_staker",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_amount",
        type: "uint256",
      },
    ],
    name: "retrieve",
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
    inputs: [],
    name: "staking",
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
];

const _bytecode =
  "0x60c060405234801561001057600080fd5b506040516104073803806104078339818101604052604081101561003357600080fd5b810190808051906020019092919080519060200190929190505050600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff16141561008857600080fd5b8173ffffffffffffffffffffffffffffffffffffffff1660808173ffffffffffffffffffffffffffffffffffffffff1660601b81525050600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff1614156100f957600080fd5b8073ffffffffffffffffffffffffffffffffffffffff1660a08173ffffffffffffffffffffffffffffffffffffffff1660601b81525050505060805160601c60a05160601c6102a36101646000398060fe528061019e525080610122528061014652506102a36000f3fe608060405234801561001057600080fd5b50600436106100415760003560e01c806315079925146100465780634cf088d91461007a578063c3a2a665146100ae575b600080fd5b61004e6100fc565b604051808273ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b610082610120565b604051808273ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b6100fa600480360360408110156100c457600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff16906020019092919080359060200190929190505050610144565b005b7f000000000000000000000000000000000000000000000000000000000000000081565b7f000000000000000000000000000000000000000000000000000000000000000081565b7f000000000000000000000000000000000000000000000000000000000000000073ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161461019c57600080fd5b7f000000000000000000000000000000000000000000000000000000000000000073ffffffffffffffffffffffffffffffffffffffff1663a9059cbb83836040518363ffffffff1660e01b8152600401808373ffffffffffffffffffffffffffffffffffffffff16815260200182815260200192505050602060405180830381600087803b15801561022d57600080fd5b505af1158015610241573d6000803e3d6000fd5b505050506040513d602081101561025757600080fd5b810190808051906020019092919050505050505056fea26469706673582212201e6f00fb6534f80700d0feaa67b2df75d41c1cd0a626b0e1756587e8186461e164736f6c63430007050033";

type StakingWarmupConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: StakingWarmupConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class StakingWarmup__factory extends ContractFactory {
  constructor(...args: StakingWarmupConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  deploy(
    _staking: string,
    _sOHM: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<StakingWarmup> {
    return super.deploy(
      _staking,
      _sOHM,
      overrides || {}
    ) as Promise<StakingWarmup>;
  }
  getDeployTransaction(
    _staking: string,
    _sOHM: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(_staking, _sOHM, overrides || {});
  }
  attach(address: string): StakingWarmup {
    return super.attach(address) as StakingWarmup;
  }
  connect(signer: Signer): StakingWarmup__factory {
    return super.connect(signer) as StakingWarmup__factory;
  }
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): StakingWarmupInterface {
    return new utils.Interface(_abi) as StakingWarmupInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): StakingWarmup {
    return new Contract(address, _abi, signerOrProvider) as StakingWarmup;
  }
}
