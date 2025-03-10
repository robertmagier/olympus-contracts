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

export interface SOlympusInterface extends utils.Interface {
  functions: {
    "DOMAIN_SEPARATOR()": FunctionFragment;
    "INDEX()": FunctionFragment;
    "PERMIT_TYPEHASH()": FunctionFragment;
    "allowance(address,address)": FunctionFragment;
    "approve(address,uint256)": FunctionFragment;
    "balanceForGons(uint256)": FunctionFragment;
    "balanceOf(address)": FunctionFragment;
    "circulatingSupply()": FunctionFragment;
    "decimals()": FunctionFragment;
    "decreaseAllowance(address,uint256)": FunctionFragment;
    "gonsForBalance(uint256)": FunctionFragment;
    "increaseAllowance(address,uint256)": FunctionFragment;
    "index()": FunctionFragment;
    "initialize(address)": FunctionFragment;
    "initializer()": FunctionFragment;
    "manager()": FunctionFragment;
    "name()": FunctionFragment;
    "nonces(address)": FunctionFragment;
    "permit(address,address,uint256,uint256,uint8,bytes32,bytes32)": FunctionFragment;
    "pullManagement()": FunctionFragment;
    "pushManagement(address)": FunctionFragment;
    "rebase(uint256,uint256)": FunctionFragment;
    "rebases(uint256)": FunctionFragment;
    "renounceManagement()": FunctionFragment;
    "setIndex(uint256)": FunctionFragment;
    "stakingContract()": FunctionFragment;
    "symbol()": FunctionFragment;
    "totalSupply()": FunctionFragment;
    "transfer(address,uint256)": FunctionFragment;
    "transferFrom(address,address,uint256)": FunctionFragment;
  };

  encodeFunctionData(
    functionFragment: "DOMAIN_SEPARATOR",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "INDEX", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "PERMIT_TYPEHASH",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "allowance",
    values: [string, string]
  ): string;
  encodeFunctionData(
    functionFragment: "approve",
    values: [string, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "balanceForGons",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(functionFragment: "balanceOf", values: [string]): string;
  encodeFunctionData(
    functionFragment: "circulatingSupply",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "decimals", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "decreaseAllowance",
    values: [string, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "gonsForBalance",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "increaseAllowance",
    values: [string, BigNumberish]
  ): string;
  encodeFunctionData(functionFragment: "index", values?: undefined): string;
  encodeFunctionData(functionFragment: "initialize", values: [string]): string;
  encodeFunctionData(
    functionFragment: "initializer",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "manager", values?: undefined): string;
  encodeFunctionData(functionFragment: "name", values?: undefined): string;
  encodeFunctionData(functionFragment: "nonces", values: [string]): string;
  encodeFunctionData(
    functionFragment: "permit",
    values: [
      string,
      string,
      BigNumberish,
      BigNumberish,
      BigNumberish,
      BytesLike,
      BytesLike
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "pullManagement",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "pushManagement",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "rebase",
    values: [BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "rebases",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "renounceManagement",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "setIndex",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "stakingContract",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "symbol", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "totalSupply",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "transfer",
    values: [string, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "transferFrom",
    values: [string, string, BigNumberish]
  ): string;

  decodeFunctionResult(
    functionFragment: "DOMAIN_SEPARATOR",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "INDEX", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "PERMIT_TYPEHASH",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "allowance", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "approve", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "balanceForGons",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "balanceOf", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "circulatingSupply",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "decimals", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "decreaseAllowance",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "gonsForBalance",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "increaseAllowance",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "index", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "initialize", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "initializer",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "manager", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "name", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "nonces", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "permit", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "pullManagement",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "pushManagement",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "rebase", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "rebases", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "renounceManagement",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "setIndex", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "stakingContract",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "symbol", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "totalSupply",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "transfer", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "transferFrom",
    data: BytesLike
  ): Result;

  events: {
    "Approval(address,address,uint256)": EventFragment;
    "LogRebase(uint256,uint256,uint256)": EventFragment;
    "LogStakingContractUpdated(address)": EventFragment;
    "LogSupply(uint256,uint256,uint256)": EventFragment;
    "OwnershipPulled(address,address)": EventFragment;
    "OwnershipPushed(address,address)": EventFragment;
    "Transfer(address,address,uint256)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "Approval"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "LogRebase"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "LogStakingContractUpdated"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "LogSupply"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "OwnershipPulled"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "OwnershipPushed"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "Transfer"): EventFragment;
}

export type ApprovalEvent = TypedEvent<
  [string, string, BigNumber],
  { owner: string; spender: string; value: BigNumber }
>;

export type ApprovalEventFilter = TypedEventFilter<ApprovalEvent>;

export type LogRebaseEvent = TypedEvent<
  [BigNumber, BigNumber, BigNumber],
  { epoch: BigNumber; rebase: BigNumber; index: BigNumber }
>;

export type LogRebaseEventFilter = TypedEventFilter<LogRebaseEvent>;

export type LogStakingContractUpdatedEvent = TypedEvent<
  [string],
  { stakingContract: string }
>;

export type LogStakingContractUpdatedEventFilter =
  TypedEventFilter<LogStakingContractUpdatedEvent>;

export type LogSupplyEvent = TypedEvent<
  [BigNumber, BigNumber, BigNumber],
  { epoch: BigNumber; timestamp: BigNumber; totalSupply: BigNumber }
>;

export type LogSupplyEventFilter = TypedEventFilter<LogSupplyEvent>;

export type OwnershipPulledEvent = TypedEvent<
  [string, string],
  { previousOwner: string; newOwner: string }
>;

export type OwnershipPulledEventFilter = TypedEventFilter<OwnershipPulledEvent>;

export type OwnershipPushedEvent = TypedEvent<
  [string, string],
  { previousOwner: string; newOwner: string }
>;

export type OwnershipPushedEventFilter = TypedEventFilter<OwnershipPushedEvent>;

export type TransferEvent = TypedEvent<
  [string, string, BigNumber],
  { from: string; to: string; value: BigNumber }
>;

export type TransferEventFilter = TypedEventFilter<TransferEvent>;

export interface SOlympus extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: SOlympusInterface;

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
    DOMAIN_SEPARATOR(overrides?: CallOverrides): Promise<[string]>;

    INDEX(overrides?: CallOverrides): Promise<[BigNumber]>;

    PERMIT_TYPEHASH(overrides?: CallOverrides): Promise<[string]>;

    allowance(
      owner_: string,
      spender: string,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    approve(
      spender: string,
      value: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    balanceForGons(
      gons: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    balanceOf(who: string, overrides?: CallOverrides): Promise<[BigNumber]>;

    circulatingSupply(overrides?: CallOverrides): Promise<[BigNumber]>;

    decimals(overrides?: CallOverrides): Promise<[number]>;

    decreaseAllowance(
      spender: string,
      subtractedValue: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    gonsForBalance(
      amount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    increaseAllowance(
      spender: string,
      addedValue: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    index(overrides?: CallOverrides): Promise<[BigNumber]>;

    initialize(
      stakingContract_: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    initializer(overrides?: CallOverrides): Promise<[string]>;

    manager(overrides?: CallOverrides): Promise<[string]>;

    name(overrides?: CallOverrides): Promise<[string]>;

    nonces(owner: string, overrides?: CallOverrides): Promise<[BigNumber]>;

    permit(
      owner: string,
      spender: string,
      amount: BigNumberish,
      deadline: BigNumberish,
      v: BigNumberish,
      r: BytesLike,
      s: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    pullManagement(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    pushManagement(
      newOwner_: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    rebase(
      profit_: BigNumberish,
      epoch_: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    rebases(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<
      [
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber
      ] & {
        epoch: BigNumber;
        rebase: BigNumber;
        totalStakedBefore: BigNumber;
        totalStakedAfter: BigNumber;
        amountRebased: BigNumber;
        index: BigNumber;
        blockNumberOccured: BigNumber;
      }
    >;

    renounceManagement(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    setIndex(
      _INDEX: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    stakingContract(overrides?: CallOverrides): Promise<[string]>;

    symbol(overrides?: CallOverrides): Promise<[string]>;

    totalSupply(overrides?: CallOverrides): Promise<[BigNumber]>;

    transfer(
      to: string,
      value: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    transferFrom(
      from: string,
      to: string,
      value: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;
  };

  DOMAIN_SEPARATOR(overrides?: CallOverrides): Promise<string>;

  INDEX(overrides?: CallOverrides): Promise<BigNumber>;

  PERMIT_TYPEHASH(overrides?: CallOverrides): Promise<string>;

  allowance(
    owner_: string,
    spender: string,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  approve(
    spender: string,
    value: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  balanceForGons(
    gons: BigNumberish,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  balanceOf(who: string, overrides?: CallOverrides): Promise<BigNumber>;

  circulatingSupply(overrides?: CallOverrides): Promise<BigNumber>;

  decimals(overrides?: CallOverrides): Promise<number>;

  decreaseAllowance(
    spender: string,
    subtractedValue: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  gonsForBalance(
    amount: BigNumberish,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  increaseAllowance(
    spender: string,
    addedValue: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  index(overrides?: CallOverrides): Promise<BigNumber>;

  initialize(
    stakingContract_: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  initializer(overrides?: CallOverrides): Promise<string>;

  manager(overrides?: CallOverrides): Promise<string>;

  name(overrides?: CallOverrides): Promise<string>;

  nonces(owner: string, overrides?: CallOverrides): Promise<BigNumber>;

  permit(
    owner: string,
    spender: string,
    amount: BigNumberish,
    deadline: BigNumberish,
    v: BigNumberish,
    r: BytesLike,
    s: BytesLike,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  pullManagement(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  pushManagement(
    newOwner_: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  rebase(
    profit_: BigNumberish,
    epoch_: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  rebases(
    arg0: BigNumberish,
    overrides?: CallOverrides
  ): Promise<
    [
      BigNumber,
      BigNumber,
      BigNumber,
      BigNumber,
      BigNumber,
      BigNumber,
      BigNumber
    ] & {
      epoch: BigNumber;
      rebase: BigNumber;
      totalStakedBefore: BigNumber;
      totalStakedAfter: BigNumber;
      amountRebased: BigNumber;
      index: BigNumber;
      blockNumberOccured: BigNumber;
    }
  >;

  renounceManagement(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  setIndex(
    _INDEX: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  stakingContract(overrides?: CallOverrides): Promise<string>;

  symbol(overrides?: CallOverrides): Promise<string>;

  totalSupply(overrides?: CallOverrides): Promise<BigNumber>;

  transfer(
    to: string,
    value: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  transferFrom(
    from: string,
    to: string,
    value: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    DOMAIN_SEPARATOR(overrides?: CallOverrides): Promise<string>;

    INDEX(overrides?: CallOverrides): Promise<BigNumber>;

    PERMIT_TYPEHASH(overrides?: CallOverrides): Promise<string>;

    allowance(
      owner_: string,
      spender: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    approve(
      spender: string,
      value: BigNumberish,
      overrides?: CallOverrides
    ): Promise<boolean>;

    balanceForGons(
      gons: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    balanceOf(who: string, overrides?: CallOverrides): Promise<BigNumber>;

    circulatingSupply(overrides?: CallOverrides): Promise<BigNumber>;

    decimals(overrides?: CallOverrides): Promise<number>;

    decreaseAllowance(
      spender: string,
      subtractedValue: BigNumberish,
      overrides?: CallOverrides
    ): Promise<boolean>;

    gonsForBalance(
      amount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    increaseAllowance(
      spender: string,
      addedValue: BigNumberish,
      overrides?: CallOverrides
    ): Promise<boolean>;

    index(overrides?: CallOverrides): Promise<BigNumber>;

    initialize(
      stakingContract_: string,
      overrides?: CallOverrides
    ): Promise<boolean>;

    initializer(overrides?: CallOverrides): Promise<string>;

    manager(overrides?: CallOverrides): Promise<string>;

    name(overrides?: CallOverrides): Promise<string>;

    nonces(owner: string, overrides?: CallOverrides): Promise<BigNumber>;

    permit(
      owner: string,
      spender: string,
      amount: BigNumberish,
      deadline: BigNumberish,
      v: BigNumberish,
      r: BytesLike,
      s: BytesLike,
      overrides?: CallOverrides
    ): Promise<void>;

    pullManagement(overrides?: CallOverrides): Promise<void>;

    pushManagement(newOwner_: string, overrides?: CallOverrides): Promise<void>;

    rebase(
      profit_: BigNumberish,
      epoch_: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    rebases(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<
      [
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber
      ] & {
        epoch: BigNumber;
        rebase: BigNumber;
        totalStakedBefore: BigNumber;
        totalStakedAfter: BigNumber;
        amountRebased: BigNumber;
        index: BigNumber;
        blockNumberOccured: BigNumber;
      }
    >;

    renounceManagement(overrides?: CallOverrides): Promise<void>;

    setIndex(_INDEX: BigNumberish, overrides?: CallOverrides): Promise<boolean>;

    stakingContract(overrides?: CallOverrides): Promise<string>;

    symbol(overrides?: CallOverrides): Promise<string>;

    totalSupply(overrides?: CallOverrides): Promise<BigNumber>;

    transfer(
      to: string,
      value: BigNumberish,
      overrides?: CallOverrides
    ): Promise<boolean>;

    transferFrom(
      from: string,
      to: string,
      value: BigNumberish,
      overrides?: CallOverrides
    ): Promise<boolean>;
  };

  filters: {
    "Approval(address,address,uint256)"(
      owner?: string | null,
      spender?: string | null,
      value?: null
    ): ApprovalEventFilter;
    Approval(
      owner?: string | null,
      spender?: string | null,
      value?: null
    ): ApprovalEventFilter;

    "LogRebase(uint256,uint256,uint256)"(
      epoch?: BigNumberish | null,
      rebase?: null,
      index?: null
    ): LogRebaseEventFilter;
    LogRebase(
      epoch?: BigNumberish | null,
      rebase?: null,
      index?: null
    ): LogRebaseEventFilter;

    "LogStakingContractUpdated(address)"(
      stakingContract?: null
    ): LogStakingContractUpdatedEventFilter;
    LogStakingContractUpdated(
      stakingContract?: null
    ): LogStakingContractUpdatedEventFilter;

    "LogSupply(uint256,uint256,uint256)"(
      epoch?: BigNumberish | null,
      timestamp?: null,
      totalSupply?: null
    ): LogSupplyEventFilter;
    LogSupply(
      epoch?: BigNumberish | null,
      timestamp?: null,
      totalSupply?: null
    ): LogSupplyEventFilter;

    "OwnershipPulled(address,address)"(
      previousOwner?: string | null,
      newOwner?: string | null
    ): OwnershipPulledEventFilter;
    OwnershipPulled(
      previousOwner?: string | null,
      newOwner?: string | null
    ): OwnershipPulledEventFilter;

    "OwnershipPushed(address,address)"(
      previousOwner?: string | null,
      newOwner?: string | null
    ): OwnershipPushedEventFilter;
    OwnershipPushed(
      previousOwner?: string | null,
      newOwner?: string | null
    ): OwnershipPushedEventFilter;

    "Transfer(address,address,uint256)"(
      from?: string | null,
      to?: string | null,
      value?: null
    ): TransferEventFilter;
    Transfer(
      from?: string | null,
      to?: string | null,
      value?: null
    ): TransferEventFilter;
  };

  estimateGas: {
    DOMAIN_SEPARATOR(overrides?: CallOverrides): Promise<BigNumber>;

    INDEX(overrides?: CallOverrides): Promise<BigNumber>;

    PERMIT_TYPEHASH(overrides?: CallOverrides): Promise<BigNumber>;

    allowance(
      owner_: string,
      spender: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    approve(
      spender: string,
      value: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    balanceForGons(
      gons: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    balanceOf(who: string, overrides?: CallOverrides): Promise<BigNumber>;

    circulatingSupply(overrides?: CallOverrides): Promise<BigNumber>;

    decimals(overrides?: CallOverrides): Promise<BigNumber>;

    decreaseAllowance(
      spender: string,
      subtractedValue: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    gonsForBalance(
      amount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    increaseAllowance(
      spender: string,
      addedValue: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    index(overrides?: CallOverrides): Promise<BigNumber>;

    initialize(
      stakingContract_: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    initializer(overrides?: CallOverrides): Promise<BigNumber>;

    manager(overrides?: CallOverrides): Promise<BigNumber>;

    name(overrides?: CallOverrides): Promise<BigNumber>;

    nonces(owner: string, overrides?: CallOverrides): Promise<BigNumber>;

    permit(
      owner: string,
      spender: string,
      amount: BigNumberish,
      deadline: BigNumberish,
      v: BigNumberish,
      r: BytesLike,
      s: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    pullManagement(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    pushManagement(
      newOwner_: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    rebase(
      profit_: BigNumberish,
      epoch_: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    rebases(arg0: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;

    renounceManagement(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    setIndex(
      _INDEX: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    stakingContract(overrides?: CallOverrides): Promise<BigNumber>;

    symbol(overrides?: CallOverrides): Promise<BigNumber>;

    totalSupply(overrides?: CallOverrides): Promise<BigNumber>;

    transfer(
      to: string,
      value: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    transferFrom(
      from: string,
      to: string,
      value: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    DOMAIN_SEPARATOR(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    INDEX(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    PERMIT_TYPEHASH(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    allowance(
      owner_: string,
      spender: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    approve(
      spender: string,
      value: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    balanceForGons(
      gons: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    balanceOf(
      who: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    circulatingSupply(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    decimals(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    decreaseAllowance(
      spender: string,
      subtractedValue: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    gonsForBalance(
      amount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    increaseAllowance(
      spender: string,
      addedValue: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    index(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    initialize(
      stakingContract_: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    initializer(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    manager(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    name(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    nonces(
      owner: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    permit(
      owner: string,
      spender: string,
      amount: BigNumberish,
      deadline: BigNumberish,
      v: BigNumberish,
      r: BytesLike,
      s: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    pullManagement(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    pushManagement(
      newOwner_: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    rebase(
      profit_: BigNumberish,
      epoch_: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    rebases(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    renounceManagement(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    setIndex(
      _INDEX: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    stakingContract(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    symbol(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    totalSupply(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    transfer(
      to: string,
      value: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    transferFrom(
      from: string,
      to: string,
      value: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;
  };
}
