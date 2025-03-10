/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import {
  BaseContract,
  BigNumber,
  BytesLike,
  CallOverrides,
  ContractTransaction,
  Overrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";
import { FunctionFragment, Result } from "@ethersproject/abi";
import { Listener, Provider } from "@ethersproject/providers";
import { TypedEventFilter, TypedEvent, TypedListener, OnEvent } from "./common";

export interface IPolicyInterface extends utils.Interface {
  functions: {
    "policy()": FunctionFragment;
    "pullPolicy()": FunctionFragment;
    "pushPolicy(address)": FunctionFragment;
    "renouncePolicy()": FunctionFragment;
  };

  encodeFunctionData(functionFragment: "policy", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "pullPolicy",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "pushPolicy", values: [string]): string;
  encodeFunctionData(
    functionFragment: "renouncePolicy",
    values?: undefined
  ): string;

  decodeFunctionResult(functionFragment: "policy", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "pullPolicy", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "pushPolicy", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "renouncePolicy",
    data: BytesLike
  ): Result;

  events: {};
}

export interface IPolicy extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: IPolicyInterface;

  queryFilter<TEvent extends TypedEvent>(
    event: TypedEventFilter<TEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TEvent>>;

  listeners<TEvent extends TypedEvent>(
    eventFilter?: TypedEventFilter<TEvent>
  ): Array<TypedListener<TEvent>>;
  listeners(eventName?: string): Array<Listener>;
  removeAllListeners<TEvent extends TypedEvent>(
    eventFilter: TypedEventFilter<TEvent>
  ): this;
  removeAllListeners(eventName?: string): this;
  off: OnEvent<this>;
  on: OnEvent<this>;
  once: OnEvent<this>;
  removeListener: OnEvent<this>;

  functions: {
    policy(overrides?: CallOverrides): Promise<[string]>;

    pullPolicy(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    pushPolicy(
      newPolicy_: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    renouncePolicy(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;
  };

  policy(overrides?: CallOverrides): Promise<string>;

  pullPolicy(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  pushPolicy(
    newPolicy_: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  renouncePolicy(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    policy(overrides?: CallOverrides): Promise<string>;

    pullPolicy(overrides?: CallOverrides): Promise<void>;

    pushPolicy(newPolicy_: string, overrides?: CallOverrides): Promise<void>;

    renouncePolicy(overrides?: CallOverrides): Promise<void>;
  };

  filters: {};

  estimateGas: {
    policy(overrides?: CallOverrides): Promise<BigNumber>;

    pullPolicy(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    pushPolicy(
      newPolicy_: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    renouncePolicy(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    policy(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    pullPolicy(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    pushPolicy(
      newPolicy_: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    renouncePolicy(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;
  };
}
