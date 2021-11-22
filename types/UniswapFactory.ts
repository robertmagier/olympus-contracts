/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import {
  BaseContract,
  BigNumber,
  BigNumberish,
  BytesLike,
  CallOverrides,
  ContractTransaction,
  Overrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";
import { FunctionFragment, Result, EventFragment } from "@ethersproject/abi";
import { Listener, Provider } from "@ethersproject/providers";
import { TypedEventFilter, TypedEvent, TypedListener, OnEvent } from "./common";

export interface UniswapFactoryInterface extends utils.Interface {
  functions: {
    "allPairs(uint256)": FunctionFragment;
    "allPairsLength()": FunctionFragment;
    "createPair(address,address)": FunctionFragment;
    "feeTo()": FunctionFragment;
    "feeToSetter()": FunctionFragment;
    "getPair(address,address)": FunctionFragment;
    "setFeeTo(address)": FunctionFragment;
    "setFeeToSetter(address)": FunctionFragment;
  };

  encodeFunctionData(
    functionFragment: "allPairs",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "allPairsLength",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "createPair",
    values: [string, string]
  ): string;
  encodeFunctionData(functionFragment: "feeTo", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "feeToSetter",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getPair",
    values: [string, string]
  ): string;
  encodeFunctionData(functionFragment: "setFeeTo", values: [string]): string;
  encodeFunctionData(
    functionFragment: "setFeeToSetter",
    values: [string]
  ): string;

  decodeFunctionResult(functionFragment: "allPairs", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "allPairsLength",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "createPair", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "feeTo", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "feeToSetter",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "getPair", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "setFeeTo", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "setFeeToSetter",
    data: BytesLike
  ): Result;

  events: {
    "PairCreated(address,address,address,uint256)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "PairCreated"): EventFragment;
}

export type PairCreatedEvent = TypedEvent<
  [string, string, string, BigNumber],
  { token0: string; token1: string; pair: string; arg3: BigNumber }
>;

export type PairCreatedEventFilter = TypedEventFilter<PairCreatedEvent>;

export interface UniswapFactory extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: UniswapFactoryInterface;

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
    allPairs(arg0: BigNumberish, overrides?: CallOverrides): Promise<[string]>;

    allPairsLength(overrides?: CallOverrides): Promise<[BigNumber]>;

    createPair(
      tokenA: string,
      tokenB: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    feeTo(overrides?: CallOverrides): Promise<[string]>;

    feeToSetter(overrides?: CallOverrides): Promise<[string]>;

    getPair(
      arg0: string,
      arg1: string,
      overrides?: CallOverrides
    ): Promise<[string]>;

    setFeeTo(
      _feeTo: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    setFeeToSetter(
      _feeToSetter: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;
  };

  allPairs(arg0: BigNumberish, overrides?: CallOverrides): Promise<string>;

  allPairsLength(overrides?: CallOverrides): Promise<BigNumber>;

  createPair(
    tokenA: string,
    tokenB: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  feeTo(overrides?: CallOverrides): Promise<string>;

  feeToSetter(overrides?: CallOverrides): Promise<string>;

  getPair(
    arg0: string,
    arg1: string,
    overrides?: CallOverrides
  ): Promise<string>;

  setFeeTo(
    _feeTo: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  setFeeToSetter(
    _feeToSetter: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    allPairs(arg0: BigNumberish, overrides?: CallOverrides): Promise<string>;

    allPairsLength(overrides?: CallOverrides): Promise<BigNumber>;

    createPair(
      tokenA: string,
      tokenB: string,
      overrides?: CallOverrides
    ): Promise<string>;

    feeTo(overrides?: CallOverrides): Promise<string>;

    feeToSetter(overrides?: CallOverrides): Promise<string>;

    getPair(
      arg0: string,
      arg1: string,
      overrides?: CallOverrides
    ): Promise<string>;

    setFeeTo(_feeTo: string, overrides?: CallOverrides): Promise<void>;

    setFeeToSetter(
      _feeToSetter: string,
      overrides?: CallOverrides
    ): Promise<void>;
  };

  filters: {
    "PairCreated(address,address,address,uint256)"(
      token0?: string | null,
      token1?: string | null,
      pair?: null,
      undefined?: null
    ): PairCreatedEventFilter;
    PairCreated(
      token0?: string | null,
      token1?: string | null,
      pair?: null,
      undefined?: null
    ): PairCreatedEventFilter;
  };

  estimateGas: {
    allPairs(arg0: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;

    allPairsLength(overrides?: CallOverrides): Promise<BigNumber>;

    createPair(
      tokenA: string,
      tokenB: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    feeTo(overrides?: CallOverrides): Promise<BigNumber>;

    feeToSetter(overrides?: CallOverrides): Promise<BigNumber>;

    getPair(
      arg0: string,
      arg1: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    setFeeTo(
      _feeTo: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    setFeeToSetter(
      _feeToSetter: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    allPairs(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    allPairsLength(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    createPair(
      tokenA: string,
      tokenB: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    feeTo(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    feeToSetter(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getPair(
      arg0: string,
      arg1: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    setFeeTo(
      _feeTo: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    setFeeToSetter(
      _feeToSetter: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;
  };
}
