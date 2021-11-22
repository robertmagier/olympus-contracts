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
import type { SimpleToken, SimpleTokenInterface } from "../SimpleToken";

const _abi = [
  {
    inputs: [
      {
        internalType: "string",
        name: "_name_",
        type: "string",
      },
      {
        internalType: "string",
        name: "_symbol_",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "total",
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
        name: "tokenOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "tokens",
        type: "uint256",
      },
    ],
    name: "Approval",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "tokens",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
  },
  {
    inputs: [],
    name: "_decimals",
    outputs: [
      {
        internalType: "uint8",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "_name",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "_symbol",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "address",
        name: "delegate",
        type: "address",
      },
    ],
    name: "allowance",
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
        internalType: "address",
        name: "delegate",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "numTokens",
        type: "uint256",
      },
    ],
    name: "approve",
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
    inputs: [
      {
        internalType: "address",
        name: "tokenOwner",
        type: "address",
      },
    ],
    name: "balanceOf",
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
    name: "decimals",
    outputs: [
      {
        internalType: "uint8",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "delegate",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "numTokens",
        type: "uint256",
      },
    ],
    name: "increaseApproval",
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
    inputs: [
      {
        internalType: "string",
        name: "_name_",
        type: "string",
      },
      {
        internalType: "string",
        name: "_symbol_",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "total",
        type: "uint256",
      },
    ],
    name: "init",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "name",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "symbol",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalSupply",
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
        internalType: "address",
        name: "receiver",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "numTokens",
        type: "uint256",
      },
    ],
    name: "transfer",
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
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "address",
        name: "buyer",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "numTokens",
        type: "uint256",
      },
    ],
    name: "transferFrom",
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
];

const _bytecode =
  "0x60c0604052600a6080819052694552433230426173696360b01b60a09081526200002d916000919062000245565b506040805180820190915260038082526242534360e81b60209092019182526200005a9160019162000245565b503480156200006857600080fd5b5060405162000e5138038062000e51833981810160405260608110156200008e57600080fd5b8101908080516040519392919084640100000000821115620000af57600080fd5b908301906020820185811115620000c557600080fd5b8251640100000000811182820188101715620000e057600080fd5b82525081516020918201929091019080838360005b838110156200010f578181015183820152602001620000f5565b50505050905090810190601f1680156200013d5780820380516001836020036101000a031916815260200191505b50604052602001805160405193929190846401000000008211156200016157600080fd5b9083019060208201858111156200017757600080fd5b82516401000000008111828201881017156200019257600080fd5b82525081516020918201929091019080838360005b83811015620001c1578181015183820152602001620001a7565b50505050905090810190601f168015620001ef5780820380516001836020036101000a031916815260200191505b50604052602090810151855190935062000210925060009186019062000245565b5081516200022690600190602085019062000245565b5060048190553360009081526002602052604090205550620002f19050565b828054600181600116156101000203166002900490600052602060002090601f0160209004810192826200027d5760008555620002c8565b82601f106200029857805160ff1916838001178555620002c8565b82800160010185558215620002c8579182015b82811115620002c8578251825591602001919060010190620002ab565b50620002d6929150620002da565b5090565b5b80821115620002d65760008155600101620002db565b610b5080620003016000396000f3fe608060405234801561001057600080fd5b50600436106100ea5760003560e01c806370a082311161008c578063b09f126611610066578063b09f1266146103ad578063d28d8852146103b5578063d73dd623146103bd578063dd62ed3e146103e9576100ea565b806370a082311461035357806395d89b4114610379578063a9059cbb14610381576100ea565b806323b872dd116100c857806323b872dd146101c65780632eabc917146101fc578063313ce5671461032d57806332424aa31461034b576100ea565b806306fdde03146100ef578063095ea7b31461016c57806318160ddd146101ac575b600080fd5b6100f7610417565b6040805160208082528351818301528351919283929083019185019080838360005b83811015610131578181015183820152602001610119565b50505050905090810190601f16801561015e5780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b6101986004803603604081101561018257600080fd5b506001600160a01b0381351690602001356104ad565b604080519115158252519081900360200190f35b6101b4610513565b60408051918252519081900360200190f35b610198600480360360608110156101dc57600080fd5b506001600160a01b03813581169160208101359091169060400135610519565b61032b6004803603606081101561021257600080fd5b81019060208101813564010000000081111561022d57600080fd5b82018360208201111561023f57600080fd5b8035906020019184600183028401116401000000008311171561026157600080fd5b91908080601f01602080910402602001604051908101604052809392919081815260200183838082843760009201919091525092959493602081019350359150506401000000008111156102b457600080fd5b8201836020820111156102c657600080fd5b803590602001918460018302840111640100000000831117156102e857600080fd5b91908080601f01602080910402602001604051908101604052809392919081815260200183838082843760009201919091525092955050913592506106f7915050565b005b610335610738565b6040805160ff9092168252519081900360200190f35b61033561073d565b6101b46004803603602081101561036957600080fd5b50356001600160a01b0316610742565b6100f761075d565b6101986004803603604081101561039757600080fd5b506001600160a01b0381351690602001356107bd565b6100f76108af565b6100f761093c565b610198600480360360408110156103d357600080fd5b506001600160a01b038135169060200135610997565b6101b4600480360360408110156103ff57600080fd5b506001600160a01b0381358116916020013516610a02565b60008054604080516020601f60026000196101006001881615020190951694909404938401819004810282018101909252828152606093909290918301828280156104a35780601f10610478576101008083540402835291602001916104a3565b820191906000526020600020905b81548152906001019060200180831161048657829003601f168201915b5050505050905090565b3360008181526003602090815260408083206001600160a01b038716808552908352818420869055815186815291519394909390927f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925928290030190a350600192915050565b60045490565b6001600160a01b038316600090815260026020526040812054821115610586576040805162461bcd60e51b815260206004820152601460248201527f42616c616e636520697320746f6f20736d616c6c000000000000000000000000604482015290519081900360640190fd5b6001600160a01b03841660009081526003602090815260408083203384529091529020548211156105fe576040805162461bcd60e51b815260206004820152601560248201527f417070726f76616c20697320746f6f20736d616c6c0000000000000000000000604482015290519081900360640190fd5b6001600160a01b0384166000908152600260205260409020546106219083610a2d565b6001600160a01b03851660009081526002602090815260408083209390935560038152828220338352905220546106589083610a2d565b6001600160a01b0380861660009081526003602090815260408083203384528252808320949094559186168152600290915220546106969083610a3f565b6001600160a01b0380851660008181526002602090815260409182902094909455805186815290519193928816927fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef92918290030190a35060019392505050565b825161070a906000906020860190610a55565b50815161071e906001906020850190610a55565b506004819055336000908152600260205260409020555050565b601290565b601281565b6001600160a01b031660009081526002602052604090205490565b60018054604080516020601f600260001961010087891615020190951694909404938401819004810282018101909252828152606093909290918301828280156104a35780601f10610478576101008083540402835291602001916104a3565b3360009081526002602052604081205482111561080b5760405162461bcd60e51b8152600401808060200182810382526024815260200180610af76024913960400191505060405180910390fd5b336000908152600260205260409020546108259083610a2d565b33600090815260026020526040808220929092556001600160a01b038516815220546108519083610a3f565b6001600160a01b0384166000818152600260209081526040918290209390935580518581529051919233927fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef9281900390910190a350600192915050565b60018054604080516020600284861615610100026000190190941693909304601f810184900484028201840190925281815292918301828280156109345780601f1061090957610100808354040283529160200191610934565b820191906000526020600020905b81548152906001019060200180831161091757829003601f168201915b505050505081565b6000805460408051602060026001851615610100026000190190941693909304601f810184900484028201840190925281815292918301828280156109345780601f1061090957610100808354040283529160200191610934565b3360008181526003602090815260408083206001600160a01b0387168085529083528184208054870190819055825190815291519394909390927f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925928290030190a350600192915050565b6001600160a01b03918216600090815260036020908152604080832093909416825291909152205490565b600082821115610a3957fe5b50900390565b600082820183811015610a4e57fe5b9392505050565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282610a8b5760008555610ad1565b82601f10610aa457805160ff1916838001178555610ad1565b82800160010185558215610ad1579182015b82811115610ad1578251825591602001919060010190610ab6565b50610add929150610ae1565b5090565b5b80821115610add5760008155600101610ae256fe4e6f7420656e6f75676820746f6b656e7320746f206d616b652061207472616e73666572a264697066735822122016e5a6acae26cdb3338338229642b72d349e24f230013c1568b2ee2541c734fb64736f6c63430007050033";

type SimpleTokenConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: SimpleTokenConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class SimpleToken__factory extends ContractFactory {
  constructor(...args: SimpleTokenConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  deploy(
    _name_: string,
    _symbol_: string,
    total: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<SimpleToken> {
    return super.deploy(
      _name_,
      _symbol_,
      total,
      overrides || {}
    ) as Promise<SimpleToken>;
  }
  getDeployTransaction(
    _name_: string,
    _symbol_: string,
    total: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(_name_, _symbol_, total, overrides || {});
  }
  attach(address: string): SimpleToken {
    return super.attach(address) as SimpleToken;
  }
  connect(signer: Signer): SimpleToken__factory {
    return super.connect(signer) as SimpleToken__factory;
  }
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): SimpleTokenInterface {
    return new utils.Interface(_abi) as SimpleTokenInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): SimpleToken {
    return new Contract(address, _abi, signerOrProvider) as SimpleToken;
  }
}
