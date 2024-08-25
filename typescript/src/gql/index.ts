import type { GraphQLResolveInfo } from 'graphql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type AppInfo = {
  __typename?: 'AppInfo';
  name: Scalars['String']['output'];
  temporal: TemporalConnection;
};

export type AuthorizePaymentRequest = {
  accountId: Scalars['String']['input'];
  paymentId: Scalars['String']['input'];
  value: Scalars['String']['input'];
};

export type AuthorizePaymentResponse = {
  __typename?: 'AuthorizePaymentResponse';
  approved: Scalars['Boolean']['output'];
  paymentId: Scalars['String']['output'];
  token: Scalars['String']['output'];
  value: Scalars['String']['output'];
};

export type BeginRequest = {
  value: Scalars['String']['input'];
};

export type BeginResponse = {
  __typename?: 'BeginResponse';
  value: Scalars['String']['output'];
};

export type CaptureRequest = {
  value: Scalars['String']['input'];
  workflowId: Scalars['String']['input'];
};

export type CaptureResponse = {
  __typename?: 'CaptureResponse';
  value: Scalars['String']['output'];
};

export type CompensateRequest = {
  value: Scalars['String']['input'];
};

export type CompensateResponse = {
  __typename?: 'CompensateResponse';
  value: Scalars['String']['output'];
};

export type CurrentPaymentState = {
  __typename?: 'CurrentPaymentState';
  accountId: Scalars['String']['output'];
  applicationMutation2?: Maybe<MutateApplicationResponse>;
  authorization?: Maybe<PaymentAuthorizationResponse>;
  authorizationToken?: Maybe<Scalars['String']['output']>;
  beginning?: Maybe<BeginResponse>;
  capture?: Maybe<CaptureResponse>;
  compensation?: Maybe<CompensateResponse>;
  finalizable?: Maybe<Scalars['String']['output']>;
  finalization?: Maybe<FinalizeResponse>;
  paymentCompletionId: Scalars['String']['output'];
  paymentId: Scalars['String']['output'];
  value: Scalars['String']['output'];
};

export type FinalizeRequest = {
  value: Scalars['String']['input'];
  workflowId: Scalars['String']['input'];
};

export type FinalizeResponse = {
  __typename?: 'FinalizeResponse';
  value: Scalars['String']['output'];
  workflowId: Scalars['String']['output'];
};

export type MutateApplicationRequest = {
  value: Scalars['String']['input'];
};

export type MutateApplicationResponse = {
  __typename?: 'MutateApplicationResponse';
  value: Scalars['String']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  authorizePayment: AuthorizePaymentResponse;
  capture: FinalizeResponse;
};


export type MutationAuthorizePaymentArgs = {
  input: AuthorizePaymentRequest;
};


export type MutationCaptureArgs = {
  input: CaptureRequest;
};

export type PaymentAuthorizationResponse = {
  __typename?: 'PaymentAuthorizationResponse';
  approved: Scalars['Boolean']['output'];
  token: Scalars['String']['output'];
  value: Scalars['String']['output'];
};

export type Query = {
  __typename?: 'Query';
  appInfo: AppInfo;
  queryWorkflow: CurrentPaymentState;
  scenarioDefinitions: ScenarioDefinitions;
};


export type QueryQueryWorkflowArgs = {
  input?: InputMaybe<QueryRequest>;
};

export type QueryRequest = {
  value?: InputMaybe<Scalars['String']['input']>;
  workflowId: Scalars['String']['input'];
};

export type QueryResponse = {
  __typename?: 'QueryResponse';
  value: Scalars['String']['output'];
};

export type ReplyRequest = {
  activityName: Scalars['String']['input'];
  taskQueue: Scalars['String']['input'];
  value: Scalars['String']['input'];
};

export type Scenario = {
  __typename?: 'Scenario';
  active: Scalars['Boolean']['output'];
  applicationFailure?: Maybe<Scalars['String']['output']>;
  exception?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  title: Scalars['String']['output'];
  value?: Maybe<Scalars['String']['output']>;
};

export type ScenarioDefinition = {
  __typename?: 'ScenarioDefinition';
  applicationFailure?: Maybe<Scalars['String']['output']>;
  exception?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  title: Scalars['String']['output'];
};

export type ScenarioDefinitions = {
  __typename?: 'ScenarioDefinitions';
  definitions: Array<ScenarioDefinition>;
};

export type Scenarios = {
  __typename?: 'Scenarios';
  scenarios: Array<Scenario>;
};

export type Subscription = {
  __typename?: 'Subscription';
  workflowState: CurrentPaymentState;
};


export type SubscriptionWorkflowStateArgs = {
  input: WorkflowStateRequest;
};

export type TemporalConnection = {
  __typename?: 'TemporalConnection';
  namespace: Scalars['String']['output'];
  taskQueue?: Maybe<Scalars['String']['output']>;
};

export type ValidateRequest = {
  value: Scalars['String']['input'];
};

export type ValidateResponse = {
  __typename?: 'ValidateResponse';
  value: Scalars['String']['output'];
};

export type WorkflowStateRequest = {
  workflowId: Scalars['String']['input'];
};



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;



/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  AppInfo: ResolverTypeWrapper<AppInfo>;
  AuthorizePaymentRequest: AuthorizePaymentRequest;
  AuthorizePaymentResponse: ResolverTypeWrapper<AuthorizePaymentResponse>;
  BeginRequest: BeginRequest;
  BeginResponse: ResolverTypeWrapper<BeginResponse>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  CaptureRequest: CaptureRequest;
  CaptureResponse: ResolverTypeWrapper<CaptureResponse>;
  CompensateRequest: CompensateRequest;
  CompensateResponse: ResolverTypeWrapper<CompensateResponse>;
  CurrentPaymentState: ResolverTypeWrapper<CurrentPaymentState>;
  FinalizeRequest: FinalizeRequest;
  FinalizeResponse: ResolverTypeWrapper<FinalizeResponse>;
  MutateApplicationRequest: MutateApplicationRequest;
  MutateApplicationResponse: ResolverTypeWrapper<MutateApplicationResponse>;
  Mutation: ResolverTypeWrapper<{}>;
  PaymentAuthorizationResponse: ResolverTypeWrapper<PaymentAuthorizationResponse>;
  Query: ResolverTypeWrapper<{}>;
  QueryRequest: QueryRequest;
  QueryResponse: ResolverTypeWrapper<QueryResponse>;
  ReplyRequest: ReplyRequest;
  Scenario: ResolverTypeWrapper<Scenario>;
  ScenarioDefinition: ResolverTypeWrapper<ScenarioDefinition>;
  ScenarioDefinitions: ResolverTypeWrapper<ScenarioDefinitions>;
  Scenarios: ResolverTypeWrapper<Scenarios>;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  Subscription: ResolverTypeWrapper<{}>;
  TemporalConnection: ResolverTypeWrapper<TemporalConnection>;
  ValidateRequest: ValidateRequest;
  ValidateResponse: ResolverTypeWrapper<ValidateResponse>;
  WorkflowStateRequest: WorkflowStateRequest;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  AppInfo: AppInfo;
  AuthorizePaymentRequest: AuthorizePaymentRequest;
  AuthorizePaymentResponse: AuthorizePaymentResponse;
  BeginRequest: BeginRequest;
  BeginResponse: BeginResponse;
  Boolean: Scalars['Boolean']['output'];
  CaptureRequest: CaptureRequest;
  CaptureResponse: CaptureResponse;
  CompensateRequest: CompensateRequest;
  CompensateResponse: CompensateResponse;
  CurrentPaymentState: CurrentPaymentState;
  FinalizeRequest: FinalizeRequest;
  FinalizeResponse: FinalizeResponse;
  MutateApplicationRequest: MutateApplicationRequest;
  MutateApplicationResponse: MutateApplicationResponse;
  Mutation: {};
  PaymentAuthorizationResponse: PaymentAuthorizationResponse;
  Query: {};
  QueryRequest: QueryRequest;
  QueryResponse: QueryResponse;
  ReplyRequest: ReplyRequest;
  Scenario: Scenario;
  ScenarioDefinition: ScenarioDefinition;
  ScenarioDefinitions: ScenarioDefinitions;
  Scenarios: Scenarios;
  String: Scalars['String']['output'];
  Subscription: {};
  TemporalConnection: TemporalConnection;
  ValidateRequest: ValidateRequest;
  ValidateResponse: ValidateResponse;
  WorkflowStateRequest: WorkflowStateRequest;
};

export type AppInfoResolvers<ContextType = any, ParentType extends ResolversParentTypes['AppInfo'] = ResolversParentTypes['AppInfo']> = {
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  temporal?: Resolver<ResolversTypes['TemporalConnection'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type AuthorizePaymentResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['AuthorizePaymentResponse'] = ResolversParentTypes['AuthorizePaymentResponse']> = {
  approved?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  paymentId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  token?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  value?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type BeginResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['BeginResponse'] = ResolversParentTypes['BeginResponse']> = {
  value?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CaptureResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['CaptureResponse'] = ResolversParentTypes['CaptureResponse']> = {
  value?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CompensateResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['CompensateResponse'] = ResolversParentTypes['CompensateResponse']> = {
  value?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CurrentPaymentStateResolvers<ContextType = any, ParentType extends ResolversParentTypes['CurrentPaymentState'] = ResolversParentTypes['CurrentPaymentState']> = {
  accountId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  applicationMutation2?: Resolver<Maybe<ResolversTypes['MutateApplicationResponse']>, ParentType, ContextType>;
  authorization?: Resolver<Maybe<ResolversTypes['PaymentAuthorizationResponse']>, ParentType, ContextType>;
  authorizationToken?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  beginning?: Resolver<Maybe<ResolversTypes['BeginResponse']>, ParentType, ContextType>;
  capture?: Resolver<Maybe<ResolversTypes['CaptureResponse']>, ParentType, ContextType>;
  compensation?: Resolver<Maybe<ResolversTypes['CompensateResponse']>, ParentType, ContextType>;
  finalizable?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  finalization?: Resolver<Maybe<ResolversTypes['FinalizeResponse']>, ParentType, ContextType>;
  paymentCompletionId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  paymentId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  value?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type FinalizeResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['FinalizeResponse'] = ResolversParentTypes['FinalizeResponse']> = {
  value?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  workflowId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutateApplicationResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['MutateApplicationResponse'] = ResolversParentTypes['MutateApplicationResponse']> = {
  value?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  authorizePayment?: Resolver<ResolversTypes['AuthorizePaymentResponse'], ParentType, ContextType, RequireFields<MutationAuthorizePaymentArgs, 'input'>>;
  capture?: Resolver<ResolversTypes['FinalizeResponse'], ParentType, ContextType, RequireFields<MutationCaptureArgs, 'input'>>;
};

export type PaymentAuthorizationResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['PaymentAuthorizationResponse'] = ResolversParentTypes['PaymentAuthorizationResponse']> = {
  approved?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  token?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  value?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  appInfo?: Resolver<ResolversTypes['AppInfo'], ParentType, ContextType>;
  queryWorkflow?: Resolver<ResolversTypes['CurrentPaymentState'], ParentType, ContextType, Partial<QueryQueryWorkflowArgs>>;
  scenarioDefinitions?: Resolver<ResolversTypes['ScenarioDefinitions'], ParentType, ContextType>;
};

export type QueryResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['QueryResponse'] = ResolversParentTypes['QueryResponse']> = {
  value?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ScenarioResolvers<ContextType = any, ParentType extends ResolversParentTypes['Scenario'] = ResolversParentTypes['Scenario']> = {
  active?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  applicationFailure?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  exception?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  value?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ScenarioDefinitionResolvers<ContextType = any, ParentType extends ResolversParentTypes['ScenarioDefinition'] = ResolversParentTypes['ScenarioDefinition']> = {
  applicationFailure?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  exception?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ScenarioDefinitionsResolvers<ContextType = any, ParentType extends ResolversParentTypes['ScenarioDefinitions'] = ResolversParentTypes['ScenarioDefinitions']> = {
  definitions?: Resolver<Array<ResolversTypes['ScenarioDefinition']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ScenariosResolvers<ContextType = any, ParentType extends ResolversParentTypes['Scenarios'] = ResolversParentTypes['Scenarios']> = {
  scenarios?: Resolver<Array<ResolversTypes['Scenario']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SubscriptionResolvers<ContextType = any, ParentType extends ResolversParentTypes['Subscription'] = ResolversParentTypes['Subscription']> = {
  workflowState?: SubscriptionResolver<ResolversTypes['CurrentPaymentState'], "workflowState", ParentType, ContextType, RequireFields<SubscriptionWorkflowStateArgs, 'input'>>;
};

export type TemporalConnectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['TemporalConnection'] = ResolversParentTypes['TemporalConnection']> = {
  namespace?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  taskQueue?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ValidateResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['ValidateResponse'] = ResolversParentTypes['ValidateResponse']> = {
  value?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  AppInfo?: AppInfoResolvers<ContextType>;
  AuthorizePaymentResponse?: AuthorizePaymentResponseResolvers<ContextType>;
  BeginResponse?: BeginResponseResolvers<ContextType>;
  CaptureResponse?: CaptureResponseResolvers<ContextType>;
  CompensateResponse?: CompensateResponseResolvers<ContextType>;
  CurrentPaymentState?: CurrentPaymentStateResolvers<ContextType>;
  FinalizeResponse?: FinalizeResponseResolvers<ContextType>;
  MutateApplicationResponse?: MutateApplicationResponseResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  PaymentAuthorizationResponse?: PaymentAuthorizationResponseResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  QueryResponse?: QueryResponseResolvers<ContextType>;
  Scenario?: ScenarioResolvers<ContextType>;
  ScenarioDefinition?: ScenarioDefinitionResolvers<ContextType>;
  ScenarioDefinitions?: ScenarioDefinitionsResolvers<ContextType>;
  Scenarios?: ScenariosResolvers<ContextType>;
  Subscription?: SubscriptionResolvers<ContextType>;
  TemporalConnection?: TemporalConnectionResolvers<ContextType>;
  ValidateResponse?: ValidateResponseResolvers<ContextType>;
};

