import gql from 'graphql-tag';
import * as VueApolloComposable from '@vue/apollo-composable';
import * as VueCompositionApi from 'vue';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type ReactiveFunction<TParam> = () => TParam;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: { input: any; output: any; }
  /** An arbitrary-precision Decimal type */
  Decimal: { input: any; output: any; }
  /** A field whose value conforms to the standard internet email address format as specified in HTML Spec: https://html.spec.whatwg.org/multipage/input.html#valid-e-mail-address. */
  EmailAddress: { input: any; output: any; }
};

/** Attribute model */
export type Attribute = {
  __typename?: 'Attribute';
  _count: AttributeCount;
  /** Attribute created date */
  createdAt: Scalars['DateTime']['output'];
  /** Attribude ID */
  id: Scalars['ID']['output'];
  /** Attribute name */
  name: Scalars['String']['output'];
  /** Products */
  products?: Maybe<Array<AttributeValue>>;
};

export type AttributeCount = {
  __typename?: 'AttributeCount';
  products: Scalars['Int']['output'];
};

export type AttributeRelationFilter = {
  is?: InputMaybe<AttributeWhereInput>;
  isNot?: InputMaybe<AttributeWhereInput>;
};

/** Attribute Values model */
export type AttributeValue = {
  __typename?: 'AttributeValue';
  /** Attribute */
  attribute: Attribute;
  attributeId: Scalars['String']['output'];
  /** Created date */
  createdAt: Scalars['DateTime']['output'];
  /** Attribute values ID */
  id: Scalars['ID']['output'];
  /** Product */
  product: Product;
  productId: Scalars['String']['output'];
  /** atribute value */
  value: Scalars['String']['output'];
};

export type AttributeValueListRelationFilter = {
  every?: InputMaybe<AttributeValueWhereInput>;
  none?: InputMaybe<AttributeValueWhereInput>;
  some?: InputMaybe<AttributeValueWhereInput>;
};

export type AttributeValueOrderByRelationAggregateInput = {
  _count?: InputMaybe<SortOrder>;
};

export type AttributeValueWhereInput = {
  AND?: InputMaybe<Array<AttributeValueWhereInput>>;
  NOT?: InputMaybe<Array<AttributeValueWhereInput>>;
  OR?: InputMaybe<Array<AttributeValueWhereInput>>;
  attribute?: InputMaybe<AttributeRelationFilter>;
  attributeId?: InputMaybe<StringFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  id?: InputMaybe<StringFilter>;
  product?: InputMaybe<ProductRelationFilter>;
  productId?: InputMaybe<StringFilter>;
  value?: InputMaybe<StringFilter>;
};

export type AttributeWhereInput = {
  AND?: InputMaybe<Array<AttributeWhereInput>>;
  NOT?: InputMaybe<Array<AttributeWhereInput>>;
  OR?: InputMaybe<Array<AttributeWhereInput>>;
  createdAt?: InputMaybe<DateTimeFilter>;
  id?: InputMaybe<StringFilter>;
  name?: InputMaybe<StringFilter>;
  products?: InputMaybe<AttributeValueListRelationFilter>;
};

export type BoolFilter = {
  equals?: InputMaybe<Scalars['Boolean']['input']>;
  not?: InputMaybe<NestedBoolFilter>;
};

export type BoolNullableFilter = {
  equals?: InputMaybe<Scalars['Boolean']['input']>;
  not?: InputMaybe<NestedBoolNullableFilter>;
};

/** Comments on the order model */
export type Comment = {
  __typename?: 'Comment';
  _count: CommentCount;
  /** Comments on the tree */
  comment?: Maybe<Comment>;
  comments?: Maybe<Array<Comment>>;
  /** Comment created date */
  createdAt: Scalars['DateTime']['output'];
  /** Comment ID */
  id: Scalars['ID']['output'];
  /** Order */
  order: Order;
  orderId: Scalars['String']['output'];
  parentId?: Maybe<Scalars['String']['output']>;
  /** Comment text */
  text: Scalars['String']['output'];
  /** User  */
  user?: Maybe<User>;
  userId?: Maybe<Scalars['String']['output']>;
};

export type CommentCount = {
  __typename?: 'CommentCount';
  comments: Scalars['Int']['output'];
};

/** Comments on the order item */
export type CommentItem = {
  __typename?: 'CommentItem';
  _count: CommentItemCount;
  /** Comments on the tree */
  comment?: Maybe<CommentItem>;
  comments?: Maybe<Array<CommentItem>>;
  /** Created date */
  createdAt: Scalars['DateTime']['output'];
  /** Comment ID */
  id: Scalars['ID']['output'];
  /** Item */
  item: Item;
  itemId: Scalars['String']['output'];
  parentId?: Maybe<Scalars['String']['output']>;
  /** Comment text */
  text: Scalars['String']['output'];
  /** User create */
  user?: Maybe<User>;
  userId?: Maybe<Scalars['String']['output']>;
};

export type CommentItemCount = {
  __typename?: 'CommentItemCount';
  comments: Scalars['Int']['output'];
};

export type CommentItemListRelationFilter = {
  every?: InputMaybe<CommentItemWhereInput>;
  none?: InputMaybe<CommentItemWhereInput>;
  some?: InputMaybe<CommentItemWhereInput>;
};

export type CommentItemNullableRelationFilter = {
  is?: InputMaybe<CommentItemWhereInput>;
  isNot?: InputMaybe<CommentItemWhereInput>;
};

export type CommentItemOrderByRelationAggregateInput = {
  _count?: InputMaybe<SortOrder>;
};

export type CommentItemWhereInput = {
  AND?: InputMaybe<Array<CommentItemWhereInput>>;
  NOT?: InputMaybe<Array<CommentItemWhereInput>>;
  OR?: InputMaybe<Array<CommentItemWhereInput>>;
  comment?: InputMaybe<CommentItemNullableRelationFilter>;
  comments?: InputMaybe<CommentItemListRelationFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  id?: InputMaybe<StringFilter>;
  item?: InputMaybe<ItemRelationFilter>;
  itemId?: InputMaybe<StringFilter>;
  parentId?: InputMaybe<StringNullableFilter>;
  text?: InputMaybe<StringFilter>;
  user?: InputMaybe<UserNullableRelationFilter>;
  userId?: InputMaybe<StringNullableFilter>;
};

export type CommentListRelationFilter = {
  every?: InputMaybe<CommentWhereInput>;
  none?: InputMaybe<CommentWhereInput>;
  some?: InputMaybe<CommentWhereInput>;
};

export type CommentNullableRelationFilter = {
  is?: InputMaybe<CommentWhereInput>;
  isNot?: InputMaybe<CommentWhereInput>;
};

export type CommentOrderByRelationAggregateInput = {
  _count?: InputMaybe<SortOrder>;
};

export type CommentWhereInput = {
  AND?: InputMaybe<Array<CommentWhereInput>>;
  NOT?: InputMaybe<Array<CommentWhereInput>>;
  OR?: InputMaybe<Array<CommentWhereInput>>;
  comment?: InputMaybe<CommentNullableRelationFilter>;
  comments?: InputMaybe<CommentListRelationFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  id?: InputMaybe<StringFilter>;
  order?: InputMaybe<OrderRelationFilter>;
  orderId?: InputMaybe<StringFilter>;
  parentId?: InputMaybe<StringNullableFilter>;
  text?: InputMaybe<StringFilter>;
  user?: InputMaybe<UserNullableRelationFilter>;
  userId?: InputMaybe<StringNullableFilter>;
};

export type Companies = {
  __typename?: 'Companies';
  User?: Maybe<Array<User>>;
  _count: CompaniesCount;
  /** Address */
  address: Scalars['String']['output'];
  /** Companies ID */
  id: Scalars['ID']['output'];
  /** Location */
  location: Location;
  /** Companies Name */
  name: Scalars['String']['output'];
};

export type CompaniesCount = {
  __typename?: 'CompaniesCount';
  User: Scalars['Int']['output'];
};

export type CompaniesNullableRelationFilter = {
  is?: InputMaybe<CompaniesWhereInput>;
  isNot?: InputMaybe<CompaniesWhereInput>;
};

export type CompaniesOrderByWithRelationInput = {
  User?: InputMaybe<UserOrderByRelationAggregateInput>;
  address?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  location?: InputMaybe<SortOrder>;
  name?: InputMaybe<SortOrder>;
};

export type CompaniesWhereInput = {
  AND?: InputMaybe<Array<CompaniesWhereInput>>;
  NOT?: InputMaybe<Array<CompaniesWhereInput>>;
  OR?: InputMaybe<Array<CompaniesWhereInput>>;
  User?: InputMaybe<UserListRelationFilter>;
  address?: InputMaybe<StringFilter>;
  id?: InputMaybe<StringFilter>;
  location?: InputMaybe<EnumLocationFilter>;
  name?: InputMaybe<StringFilter>;
};

export type DateTimeFilter = {
  equals?: InputMaybe<Scalars['DateTime']['input']>;
  gt?: InputMaybe<Scalars['DateTime']['input']>;
  gte?: InputMaybe<Scalars['DateTime']['input']>;
  in?: InputMaybe<Array<Scalars['DateTime']['input']>>;
  lt?: InputMaybe<Scalars['DateTime']['input']>;
  lte?: InputMaybe<Scalars['DateTime']['input']>;
  not?: InputMaybe<NestedDateTimeFilter>;
  notIn?: InputMaybe<Array<Scalars['DateTime']['input']>>;
};

export type DateTimeNullableFilter = {
  equals?: InputMaybe<Scalars['DateTime']['input']>;
  gt?: InputMaybe<Scalars['DateTime']['input']>;
  gte?: InputMaybe<Scalars['DateTime']['input']>;
  in?: InputMaybe<Array<Scalars['DateTime']['input']>>;
  lt?: InputMaybe<Scalars['DateTime']['input']>;
  lte?: InputMaybe<Scalars['DateTime']['input']>;
  not?: InputMaybe<NestedDateTimeNullableFilter>;
  notIn?: InputMaybe<Array<Scalars['DateTime']['input']>>;
};

export type DecimalFilter = {
  equals?: InputMaybe<Scalars['Decimal']['input']>;
  gt?: InputMaybe<Scalars['Decimal']['input']>;
  gte?: InputMaybe<Scalars['Decimal']['input']>;
  in?: InputMaybe<Array<Scalars['Decimal']['input']>>;
  lt?: InputMaybe<Scalars['Decimal']['input']>;
  lte?: InputMaybe<Scalars['Decimal']['input']>;
  not?: InputMaybe<NestedDecimalFilter>;
  notIn?: InputMaybe<Array<Scalars['Decimal']['input']>>;
};

export type DecimalNullableFilter = {
  equals?: InputMaybe<Scalars['Decimal']['input']>;
  gt?: InputMaybe<Scalars['Decimal']['input']>;
  gte?: InputMaybe<Scalars['Decimal']['input']>;
  in?: InputMaybe<Array<Scalars['Decimal']['input']>>;
  lt?: InputMaybe<Scalars['Decimal']['input']>;
  lte?: InputMaybe<Scalars['Decimal']['input']>;
  not?: InputMaybe<NestedDecimalNullableFilter>;
  notIn?: InputMaybe<Array<Scalars['Decimal']['input']>>;
};

export type DeleteOrderItemsType = {
  __typename?: 'DeleteOrderItemsType';
  /** Идентификаторы удаленных записей */
  deleteIds: Array<Scalars['String']['output']>;
};

export type EnumGenderFilter = {
  equals?: InputMaybe<Gender>;
  in?: InputMaybe<Array<Gender>>;
  not?: InputMaybe<NestedEnumGenderFilter>;
  notIn?: InputMaybe<Array<Gender>>;
};

export type EnumItemStatusFilter = {
  equals?: InputMaybe<ItemStatus>;
  in?: InputMaybe<Array<ItemStatus>>;
  not?: InputMaybe<NestedEnumItemStatusFilter>;
  notIn?: InputMaybe<Array<ItemStatus>>;
};

export type EnumLocationFilter = {
  equals?: InputMaybe<Location>;
  in?: InputMaybe<Array<Location>>;
  not?: InputMaybe<NestedEnumLocationFilter>;
  notIn?: InputMaybe<Array<Location>>;
};

export type EnumOrderStatusFilter = {
  equals?: InputMaybe<OrderStatus>;
  in?: InputMaybe<Array<OrderStatus>>;
  not?: InputMaybe<NestedEnumOrderStatusFilter>;
  notIn?: InputMaybe<Array<OrderStatus>>;
};

export type EnumRoleFilter = {
  equals?: InputMaybe<Role>;
  in?: InputMaybe<Array<Role>>;
  not?: InputMaybe<NestedEnumRoleFilter>;
  notIn?: InputMaybe<Array<Role>>;
};

export type File = {
  __typename?: 'File';
  _count: FileCount;
  /** Bucket name */
  bucket: Scalars['String']['output'];
  /** Created data */
  createdAt: Scalars['DateTime']['output'];
  /** ID */
  id: Scalars['ID']['output'];
  /** Path file in bucket */
  key: Scalars['String']['output'];
  /** Name */
  name: Scalars['String']['output'];
  products?: Maybe<Array<Product>>;
  /** Updated data */
  updatedAt: Scalars['DateTime']['output'];
  /**
   * User ID
   * If null - system file
   */
  user?: Maybe<User>;
  userId?: Maybe<Scalars['String']['output']>;
};

export type FileCount = {
  __typename?: 'FileCount';
  products: Scalars['Int']['output'];
};

export type FileListRelationFilter = {
  every?: InputMaybe<FileWhereInput>;
  none?: InputMaybe<FileWhereInput>;
  some?: InputMaybe<FileWhereInput>;
};

export type FileOrderByRelationAggregateInput = {
  _count?: InputMaybe<SortOrder>;
};

export type FileWhereInput = {
  AND?: InputMaybe<Array<FileWhereInput>>;
  NOT?: InputMaybe<Array<FileWhereInput>>;
  OR?: InputMaybe<Array<FileWhereInput>>;
  bucket?: InputMaybe<StringFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  id?: InputMaybe<StringFilter>;
  key?: InputMaybe<StringFilter>;
  name?: InputMaybe<StringFilter>;
  products?: InputMaybe<ProductListRelationFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
  user?: InputMaybe<UserNullableRelationFilter>;
  userId?: InputMaybe<StringNullableFilter>;
};

export type FloatFilter = {
  equals?: InputMaybe<Scalars['Float']['input']>;
  gt?: InputMaybe<Scalars['Float']['input']>;
  gte?: InputMaybe<Scalars['Float']['input']>;
  in?: InputMaybe<Array<Scalars['Float']['input']>>;
  lt?: InputMaybe<Scalars['Float']['input']>;
  lte?: InputMaybe<Scalars['Float']['input']>;
  not?: InputMaybe<NestedFloatFilter>;
  notIn?: InputMaybe<Array<Scalars['Float']['input']>>;
};

export type Gender =
  | 'FEMALE'
  | 'MALE'
  | 'UNKNOWN';

export type IntFilter = {
  equals?: InputMaybe<Scalars['Int']['input']>;
  gt?: InputMaybe<Scalars['Int']['input']>;
  gte?: InputMaybe<Scalars['Int']['input']>;
  in?: InputMaybe<Array<Scalars['Int']['input']>>;
  lt?: InputMaybe<Scalars['Int']['input']>;
  lte?: InputMaybe<Scalars['Int']['input']>;
  not?: InputMaybe<NestedIntFilter>;
  notIn?: InputMaybe<Array<Scalars['Int']['input']>>;
};

export type IntNullableFilter = {
  equals?: InputMaybe<Scalars['Int']['input']>;
  gt?: InputMaybe<Scalars['Int']['input']>;
  gte?: InputMaybe<Scalars['Int']['input']>;
  in?: InputMaybe<Array<Scalars['Int']['input']>>;
  lt?: InputMaybe<Scalars['Int']['input']>;
  lte?: InputMaybe<Scalars['Int']['input']>;
  not?: InputMaybe<NestedIntNullableFilter>;
  notIn?: InputMaybe<Array<Scalars['Int']['input']>>;
};

/** Item in order model */
export type Item = {
  __typename?: 'Item';
  _count: ItemCount;
  /** Car number */
  carNo?: Maybe<Scalars['String']['output']>;
  /** Margin factor */
  coefficient: Scalars['Float']['output'];
  commentItem?: Maybe<Array<CommentItem>>;
  /** Created date */
  createdAt: Scalars['DateTime']['output'];
  /** ID of the order item */
  id: Scalars['ID']['output'];
  /** Order */
  order: Order;
  orderId: Scalars['String']['output'];
  /** Product price */
  price?: Maybe<Price>;
  priceId?: Maybe<Scalars['String']['output']>;
  /** Product */
  product: Product;
  productId: Scalars['String']['output'];
  /** Quantity */
  quantity: Scalars['Int']['output'];
  /** Flight number */
  routeNo?: Maybe<Scalars['String']['output']>;
  /** Item statuses */
  statuses?: Maybe<Array<StatusItem>>;
  /** Updated date */
  updatedAt: Scalars['DateTime']['output'];
  /** User */
  user?: Maybe<User>;
  userId?: Maybe<Scalars['String']['output']>;
};

export type ItemAvgAggregate = {
  __typename?: 'ItemAvgAggregate';
  coefficient?: Maybe<Scalars['Float']['output']>;
  quantity?: Maybe<Scalars['Float']['output']>;
};

export type ItemConnectionType = {
  __typename?: 'ItemConnectionType';
  edges?: Maybe<Array<ItemEdge>>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type ItemCount = {
  __typename?: 'ItemCount';
  commentItem: Scalars['Int']['output'];
  statuses: Scalars['Int']['output'];
};

export type ItemCountAggregate = {
  __typename?: 'ItemCountAggregate';
  _all: Scalars['Int']['output'];
  carNo: Scalars['Int']['output'];
  coefficient: Scalars['Int']['output'];
  createdAt: Scalars['Int']['output'];
  id: Scalars['Int']['output'];
  orderId: Scalars['Int']['output'];
  priceId: Scalars['Int']['output'];
  productId: Scalars['Int']['output'];
  quantity: Scalars['Int']['output'];
  routeNo: Scalars['Int']['output'];
  updatedAt: Scalars['Int']['output'];
  userId: Scalars['Int']['output'];
};

export type ItemEdge = {
  __typename?: 'ItemEdge';
  cursor: Scalars['String']['output'];
  node: Item;
};

export type ItemListRelationFilter = {
  every?: InputMaybe<ItemWhereInput>;
  none?: InputMaybe<ItemWhereInput>;
  some?: InputMaybe<ItemWhereInput>;
};

export type ItemMaxAggregate = {
  __typename?: 'ItemMaxAggregate';
  carNo?: Maybe<Scalars['String']['output']>;
  coefficient?: Maybe<Scalars['Float']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  orderId?: Maybe<Scalars['String']['output']>;
  priceId?: Maybe<Scalars['String']['output']>;
  productId?: Maybe<Scalars['String']['output']>;
  quantity?: Maybe<Scalars['Int']['output']>;
  routeNo?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  userId?: Maybe<Scalars['String']['output']>;
};

export type ItemMinAggregate = {
  __typename?: 'ItemMinAggregate';
  carNo?: Maybe<Scalars['String']['output']>;
  coefficient?: Maybe<Scalars['Float']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  orderId?: Maybe<Scalars['String']['output']>;
  priceId?: Maybe<Scalars['String']['output']>;
  productId?: Maybe<Scalars['String']['output']>;
  quantity?: Maybe<Scalars['Int']['output']>;
  routeNo?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  userId?: Maybe<Scalars['String']['output']>;
};

export type ItemOrderByRelationAggregateInput = {
  _count?: InputMaybe<SortOrder>;
};

export type ItemOrderByWithRelationInput = {
  carNo?: InputMaybe<SortOrderInput>;
  coefficient?: InputMaybe<SortOrder>;
  commentItem?: InputMaybe<CommentItemOrderByRelationAggregateInput>;
  createdAt?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  order?: InputMaybe<OrderOrderByWithRelationInput>;
  orderId?: InputMaybe<SortOrder>;
  price?: InputMaybe<PriceOrderByWithRelationInput>;
  priceId?: InputMaybe<SortOrderInput>;
  product?: InputMaybe<ProductOrderByWithRelationInput>;
  productId?: InputMaybe<SortOrder>;
  quantity?: InputMaybe<SortOrder>;
  routeNo?: InputMaybe<SortOrderInput>;
  statuses?: InputMaybe<StatusItemOrderByRelationAggregateInput>;
  updatedAt?: InputMaybe<SortOrder>;
  user?: InputMaybe<UserOrderByWithRelationInput>;
  userId?: InputMaybe<SortOrderInput>;
};

export type ItemRelationFilter = {
  is?: InputMaybe<ItemWhereInput>;
  isNot?: InputMaybe<ItemWhereInput>;
};

export type ItemScalarFieldEnum =
  | 'carNo'
  | 'coefficient'
  | 'createdAt'
  | 'id'
  | 'orderId'
  | 'priceId'
  | 'productId'
  | 'quantity'
  | 'routeNo'
  | 'updatedAt'
  | 'userId';

/** Item statuses in the order */
export type ItemStatus =
  | 'APPROVED'
  | 'COMPLETED'
  | 'CREATED'
  | 'DELIVERY'
  | 'PRICED'
  | 'RUSTOCK'
  | 'SUSTOCK'
  | 'TRSTOCK';

export type ItemSumAggregate = {
  __typename?: 'ItemSumAggregate';
  coefficient?: Maybe<Scalars['Float']['output']>;
  quantity?: Maybe<Scalars['Int']['output']>;
};

export type ItemWhereInput = {
  AND?: InputMaybe<Array<ItemWhereInput>>;
  NOT?: InputMaybe<Array<ItemWhereInput>>;
  OR?: InputMaybe<Array<ItemWhereInput>>;
  carNo?: InputMaybe<StringNullableFilter>;
  coefficient?: InputMaybe<FloatFilter>;
  commentItem?: InputMaybe<CommentItemListRelationFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  id?: InputMaybe<StringFilter>;
  order?: InputMaybe<OrderRelationFilter>;
  orderId?: InputMaybe<StringFilter>;
  price?: InputMaybe<PriceNullableRelationFilter>;
  priceId?: InputMaybe<StringNullableFilter>;
  product?: InputMaybe<ProductRelationFilter>;
  productId?: InputMaybe<StringFilter>;
  quantity?: InputMaybe<IntFilter>;
  routeNo?: InputMaybe<StringNullableFilter>;
  statuses?: InputMaybe<StatusItemListRelationFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
  user?: InputMaybe<UserNullableRelationFilter>;
  userId?: InputMaybe<StringNullableFilter>;
};

export type ItemWhereUniqueInput = {
  AND?: InputMaybe<Array<ItemWhereInput>>;
  NOT?: InputMaybe<Array<ItemWhereInput>>;
  OR?: InputMaybe<Array<ItemWhereInput>>;
  carNo?: InputMaybe<StringNullableFilter>;
  coefficient?: InputMaybe<FloatFilter>;
  commentItem?: InputMaybe<CommentItemListRelationFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  id?: InputMaybe<Scalars['String']['input']>;
  order?: InputMaybe<OrderRelationFilter>;
  orderId?: InputMaybe<StringFilter>;
  price?: InputMaybe<PriceNullableRelationFilter>;
  priceId?: InputMaybe<StringNullableFilter>;
  product?: InputMaybe<ProductRelationFilter>;
  productId?: InputMaybe<StringFilter>;
  quantity?: InputMaybe<IntFilter>;
  routeNo?: InputMaybe<StringNullableFilter>;
  statuses?: InputMaybe<StatusItemListRelationFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
  user?: InputMaybe<UserNullableRelationFilter>;
  userId?: InputMaybe<StringNullableFilter>;
};

export type Location =
  | 'CHINA'
  | 'EUROPE'
  | 'RUSSIA';

/** Manufacturer model */
export type Manufacturer = {
  __typename?: 'Manufacturer';
  _count: ManufacturerCount;
  /** Manufacturer ID */
  id: Scalars['ID']['output'];
  /** Manufacturer name */
  name: Scalars['String']['output'];
  products?: Maybe<Array<Product>>;
};

export type ManufacturerCount = {
  __typename?: 'ManufacturerCount';
  products: Scalars['Int']['output'];
};

export type ManufacturerNullableRelationFilter = {
  is?: InputMaybe<ManufacturerWhereInput>;
  isNot?: InputMaybe<ManufacturerWhereInput>;
};

export type ManufacturerOrderByWithRelationInput = {
  id?: InputMaybe<SortOrder>;
  name?: InputMaybe<SortOrder>;
  products?: InputMaybe<ProductOrderByRelationAggregateInput>;
};

export type ManufacturerWhereInput = {
  AND?: InputMaybe<Array<ManufacturerWhereInput>>;
  NOT?: InputMaybe<Array<ManufacturerWhereInput>>;
  OR?: InputMaybe<Array<ManufacturerWhereInput>>;
  id?: InputMaybe<StringFilter>;
  name?: InputMaybe<StringFilter>;
  products?: InputMaybe<ProductListRelationFilter>;
};

export type Mutation = {
  __typename?: 'Mutation';
  addStatusItems: Array<Item>;
  changeCoefficientItems: Array<Item>;
  changeQuantityItem: Item;
  changeSellingPriceItem: Item;
  deleteOrderItems: DeleteOrderItemsType;
  login: UserLoginType;
  recountPrices: Array<Item>;
  register?: Maybe<UserLoginType>;
  updateUser: User;
  uploadAvatar: User;
};


export type MutationAddStatusItemsArgs = {
  itemIds: Array<Scalars['String']['input']>;
  orderId: Scalars['String']['input'];
  status: ItemStatus;
};


export type MutationChangeCoefficientItemsArgs = {
  coefficient: Scalars['Float']['input'];
  itemIds: Array<Scalars['String']['input']>;
  orderId: Scalars['String']['input'];
};


export type MutationChangeQuantityItemArgs = {
  itemId: Scalars['String']['input'];
  quantity: Scalars['Int']['input'];
};


export type MutationChangeSellingPriceItemArgs = {
  itemId: Scalars['String']['input'];
  price: Scalars['Float']['input'];
};


export type MutationDeleteOrderItemsArgs = {
  orderId: Scalars['String']['input'];
  where?: InputMaybe<ItemWhereInput>;
};


export type MutationLoginArgs = {
  userLoginInput: UserLoginInput;
};


export type MutationRecountPricesArgs = {
  itemIds: Array<Scalars['String']['input']>;
  orderId: Scalars['String']['input'];
};


export type MutationRegisterArgs = {
  userRegisterInput: UserRegisterInput;
};


export type MutationUpdateUserArgs = {
  updateUserInput: UpdateUserInput;
};


export type MutationUploadAvatarArgs = {
  fileId: Scalars['String']['input'];
};

export type NestedBoolFilter = {
  equals?: InputMaybe<Scalars['Boolean']['input']>;
  not?: InputMaybe<NestedBoolFilter>;
};

export type NestedBoolNullableFilter = {
  equals?: InputMaybe<Scalars['Boolean']['input']>;
  not?: InputMaybe<NestedBoolNullableFilter>;
};

export type NestedDateTimeFilter = {
  equals?: InputMaybe<Scalars['DateTime']['input']>;
  gt?: InputMaybe<Scalars['DateTime']['input']>;
  gte?: InputMaybe<Scalars['DateTime']['input']>;
  in?: InputMaybe<Array<Scalars['DateTime']['input']>>;
  lt?: InputMaybe<Scalars['DateTime']['input']>;
  lte?: InputMaybe<Scalars['DateTime']['input']>;
  not?: InputMaybe<NestedDateTimeFilter>;
  notIn?: InputMaybe<Array<Scalars['DateTime']['input']>>;
};

export type NestedDateTimeNullableFilter = {
  equals?: InputMaybe<Scalars['DateTime']['input']>;
  gt?: InputMaybe<Scalars['DateTime']['input']>;
  gte?: InputMaybe<Scalars['DateTime']['input']>;
  in?: InputMaybe<Array<Scalars['DateTime']['input']>>;
  lt?: InputMaybe<Scalars['DateTime']['input']>;
  lte?: InputMaybe<Scalars['DateTime']['input']>;
  not?: InputMaybe<NestedDateTimeNullableFilter>;
  notIn?: InputMaybe<Array<Scalars['DateTime']['input']>>;
};

export type NestedDecimalFilter = {
  equals?: InputMaybe<Scalars['Decimal']['input']>;
  gt?: InputMaybe<Scalars['Decimal']['input']>;
  gte?: InputMaybe<Scalars['Decimal']['input']>;
  in?: InputMaybe<Array<Scalars['Decimal']['input']>>;
  lt?: InputMaybe<Scalars['Decimal']['input']>;
  lte?: InputMaybe<Scalars['Decimal']['input']>;
  not?: InputMaybe<NestedDecimalFilter>;
  notIn?: InputMaybe<Array<Scalars['Decimal']['input']>>;
};

export type NestedDecimalNullableFilter = {
  equals?: InputMaybe<Scalars['Decimal']['input']>;
  gt?: InputMaybe<Scalars['Decimal']['input']>;
  gte?: InputMaybe<Scalars['Decimal']['input']>;
  in?: InputMaybe<Array<Scalars['Decimal']['input']>>;
  lt?: InputMaybe<Scalars['Decimal']['input']>;
  lte?: InputMaybe<Scalars['Decimal']['input']>;
  not?: InputMaybe<NestedDecimalNullableFilter>;
  notIn?: InputMaybe<Array<Scalars['Decimal']['input']>>;
};

export type NestedEnumGenderFilter = {
  equals?: InputMaybe<Gender>;
  in?: InputMaybe<Array<Gender>>;
  not?: InputMaybe<NestedEnumGenderFilter>;
  notIn?: InputMaybe<Array<Gender>>;
};

export type NestedEnumItemStatusFilter = {
  equals?: InputMaybe<ItemStatus>;
  in?: InputMaybe<Array<ItemStatus>>;
  not?: InputMaybe<NestedEnumItemStatusFilter>;
  notIn?: InputMaybe<Array<ItemStatus>>;
};

export type NestedEnumLocationFilter = {
  equals?: InputMaybe<Location>;
  in?: InputMaybe<Array<Location>>;
  not?: InputMaybe<NestedEnumLocationFilter>;
  notIn?: InputMaybe<Array<Location>>;
};

export type NestedEnumOrderStatusFilter = {
  equals?: InputMaybe<OrderStatus>;
  in?: InputMaybe<Array<OrderStatus>>;
  not?: InputMaybe<NestedEnumOrderStatusFilter>;
  notIn?: InputMaybe<Array<OrderStatus>>;
};

export type NestedEnumRoleFilter = {
  equals?: InputMaybe<Role>;
  in?: InputMaybe<Array<Role>>;
  not?: InputMaybe<NestedEnumRoleFilter>;
  notIn?: InputMaybe<Array<Role>>;
};

export type NestedFloatFilter = {
  equals?: InputMaybe<Scalars['Float']['input']>;
  gt?: InputMaybe<Scalars['Float']['input']>;
  gte?: InputMaybe<Scalars['Float']['input']>;
  in?: InputMaybe<Array<Scalars['Float']['input']>>;
  lt?: InputMaybe<Scalars['Float']['input']>;
  lte?: InputMaybe<Scalars['Float']['input']>;
  not?: InputMaybe<NestedFloatFilter>;
  notIn?: InputMaybe<Array<Scalars['Float']['input']>>;
};

export type NestedIntFilter = {
  equals?: InputMaybe<Scalars['Int']['input']>;
  gt?: InputMaybe<Scalars['Int']['input']>;
  gte?: InputMaybe<Scalars['Int']['input']>;
  in?: InputMaybe<Array<Scalars['Int']['input']>>;
  lt?: InputMaybe<Scalars['Int']['input']>;
  lte?: InputMaybe<Scalars['Int']['input']>;
  not?: InputMaybe<NestedIntFilter>;
  notIn?: InputMaybe<Array<Scalars['Int']['input']>>;
};

export type NestedIntNullableFilter = {
  equals?: InputMaybe<Scalars['Int']['input']>;
  gt?: InputMaybe<Scalars['Int']['input']>;
  gte?: InputMaybe<Scalars['Int']['input']>;
  in?: InputMaybe<Array<Scalars['Int']['input']>>;
  lt?: InputMaybe<Scalars['Int']['input']>;
  lte?: InputMaybe<Scalars['Int']['input']>;
  not?: InputMaybe<NestedIntNullableFilter>;
  notIn?: InputMaybe<Array<Scalars['Int']['input']>>;
};

export type NestedStringFilter = {
  contains?: InputMaybe<Scalars['String']['input']>;
  endsWith?: InputMaybe<Scalars['String']['input']>;
  equals?: InputMaybe<Scalars['String']['input']>;
  gt?: InputMaybe<Scalars['String']['input']>;
  gte?: InputMaybe<Scalars['String']['input']>;
  in?: InputMaybe<Array<Scalars['String']['input']>>;
  lt?: InputMaybe<Scalars['String']['input']>;
  lte?: InputMaybe<Scalars['String']['input']>;
  not?: InputMaybe<NestedStringFilter>;
  notIn?: InputMaybe<Array<Scalars['String']['input']>>;
  startsWith?: InputMaybe<Scalars['String']['input']>;
};

export type NestedStringNullableFilter = {
  contains?: InputMaybe<Scalars['String']['input']>;
  endsWith?: InputMaybe<Scalars['String']['input']>;
  equals?: InputMaybe<Scalars['String']['input']>;
  gt?: InputMaybe<Scalars['String']['input']>;
  gte?: InputMaybe<Scalars['String']['input']>;
  in?: InputMaybe<Array<Scalars['String']['input']>>;
  lt?: InputMaybe<Scalars['String']['input']>;
  lte?: InputMaybe<Scalars['String']['input']>;
  not?: InputMaybe<NestedStringNullableFilter>;
  notIn?: InputMaybe<Array<Scalars['String']['input']>>;
  startsWith?: InputMaybe<Scalars['String']['input']>;
};

export type NullsOrder =
  | 'first'
  | 'last';

/** Order model */
export type Order = {
  __typename?: 'Order';
  _count: OrderCount;
  /** Delivery Address */
  address?: Maybe<Scalars['String']['output']>;
  comments?: Maybe<Array<Comment>>;
  /** Created date */
  createdAt: Scalars['DateTime']['output'];
  /** Order ID */
  id: Scalars['ID']['output'];
  items?: Maybe<Array<Item>>;
  /** Order manager */
  manager?: Maybe<User>;
  managerId?: Maybe<Scalars['String']['output']>;
  /** Order status */
  statuses?: Maybe<Array<Status>>;
  /** User who created the order */
  user: User;
  userId: Scalars['String']['output'];
};

export type OrderCount = {
  __typename?: 'OrderCount';
  comments: Scalars['Int']['output'];
  items: Scalars['Int']['output'];
  statuses: Scalars['Int']['output'];
};

export type OrderListRelationFilter = {
  every?: InputMaybe<OrderWhereInput>;
  none?: InputMaybe<OrderWhereInput>;
  some?: InputMaybe<OrderWhereInput>;
};

export type OrderOrderByRelationAggregateInput = {
  _count?: InputMaybe<SortOrder>;
};

export type OrderOrderByWithRelationInput = {
  address?: InputMaybe<SortOrderInput>;
  comments?: InputMaybe<CommentOrderByRelationAggregateInput>;
  createdAt?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  items?: InputMaybe<ItemOrderByRelationAggregateInput>;
  manager?: InputMaybe<UserOrderByWithRelationInput>;
  managerId?: InputMaybe<SortOrderInput>;
  statuses?: InputMaybe<StatusOrderByRelationAggregateInput>;
  user?: InputMaybe<UserOrderByWithRelationInput>;
  userId?: InputMaybe<SortOrder>;
};

export type OrderRelationFilter = {
  is?: InputMaybe<OrderWhereInput>;
  isNot?: InputMaybe<OrderWhereInput>;
};

/** Order status list */
export type OrderStatus =
  | 'ADOPTED'
  | 'APPROVED'
  | 'CLOSED'
  | 'CREATED'
  | 'OFFER'
  | 'PARTIALLY'
  | 'PRICED'
  | 'PURCHASING';

export type OrderWhereInput = {
  AND?: InputMaybe<Array<OrderWhereInput>>;
  NOT?: InputMaybe<Array<OrderWhereInput>>;
  OR?: InputMaybe<Array<OrderWhereInput>>;
  address?: InputMaybe<StringNullableFilter>;
  comments?: InputMaybe<CommentListRelationFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  id?: InputMaybe<StringFilter>;
  items?: InputMaybe<ItemListRelationFilter>;
  manager?: InputMaybe<UserNullableRelationFilter>;
  managerId?: InputMaybe<StringNullableFilter>;
  statuses?: InputMaybe<StatusListRelationFilter>;
  user?: InputMaybe<UserRelationFilter>;
  userId?: InputMaybe<StringFilter>;
};

export type PageInfo = {
  __typename?: 'PageInfo';
  endCursor?: Maybe<Scalars['String']['output']>;
  hasNextPage: Scalars['Boolean']['output'];
  hasPreviousPage: Scalars['Boolean']['output'];
  startCursor?: Maybe<Scalars['String']['output']>;
};

/** Products prices model */
export type Price = {
  __typename?: 'Price';
  Supplier?: Maybe<Supplier>;
  _count: PriceCount;
  /** Comment */
  comment?: Maybe<Scalars['String']['output']>;
  /** Supplier's country */
  country?: Maybe<Scalars['String']['output']>;
  /** Created date */
  createdAt: Scalars['DateTime']['output'];
  /** Delivery time in days to the warehouse */
  duration?: Maybe<Scalars['Int']['output']>;
  /** Price ID */
  id: Scalars['ID']['output'];
  item?: Maybe<Array<Item>>;
  /** Price per unit/piece */
  price: Scalars['Decimal']['output'];
  /** Product */
  product: Product;
  productId: Scalars['String']['output'];
  /** Relevant */
  relevant?: Maybe<Scalars['Boolean']['output']>;
  /** Site */
  site?: Maybe<Scalars['String']['output']>;
  supplierId?: Maybe<Scalars['String']['output']>;
  /** Supplier name */
  supplierName: Scalars['String']['output'];
  /** Updated date */
  updatedAt: Scalars['DateTime']['output'];
  /** Price validity date */
  validAt?: Maybe<Scalars['DateTime']['output']>;
};

export type PriceCount = {
  __typename?: 'PriceCount';
  item: Scalars['Int']['output'];
};

export type PriceListRelationFilter = {
  every?: InputMaybe<PriceWhereInput>;
  none?: InputMaybe<PriceWhereInput>;
  some?: InputMaybe<PriceWhereInput>;
};

export type PriceNullableRelationFilter = {
  is?: InputMaybe<PriceWhereInput>;
  isNot?: InputMaybe<PriceWhereInput>;
};

export type PriceOrderByRelationAggregateInput = {
  _count?: InputMaybe<SortOrder>;
};

export type PriceOrderByWithRelationInput = {
  Supplier?: InputMaybe<SupplierOrderByWithRelationInput>;
  comment?: InputMaybe<SortOrderInput>;
  country?: InputMaybe<SortOrderInput>;
  createdAt?: InputMaybe<SortOrder>;
  duration?: InputMaybe<SortOrderInput>;
  id?: InputMaybe<SortOrder>;
  item?: InputMaybe<ItemOrderByRelationAggregateInput>;
  price?: InputMaybe<SortOrder>;
  product?: InputMaybe<ProductOrderByWithRelationInput>;
  productId?: InputMaybe<SortOrder>;
  relevant?: InputMaybe<SortOrderInput>;
  site?: InputMaybe<SortOrderInput>;
  supplierId?: InputMaybe<SortOrderInput>;
  supplierName?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
  validAt?: InputMaybe<SortOrderInput>;
};

export type PriceWhereInput = {
  AND?: InputMaybe<Array<PriceWhereInput>>;
  NOT?: InputMaybe<Array<PriceWhereInput>>;
  OR?: InputMaybe<Array<PriceWhereInput>>;
  Supplier?: InputMaybe<SupplierNullableRelationFilter>;
  comment?: InputMaybe<StringNullableFilter>;
  country?: InputMaybe<StringNullableFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  duration?: InputMaybe<IntNullableFilter>;
  id?: InputMaybe<StringFilter>;
  item?: InputMaybe<ItemListRelationFilter>;
  price?: InputMaybe<DecimalFilter>;
  product?: InputMaybe<ProductRelationFilter>;
  productId?: InputMaybe<StringFilter>;
  relevant?: InputMaybe<BoolNullableFilter>;
  site?: InputMaybe<StringNullableFilter>;
  supplierId?: InputMaybe<StringNullableFilter>;
  supplierName?: InputMaybe<StringFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
  validAt?: InputMaybe<DateTimeNullableFilter>;
};

/** List of available products */
export type Product = {
  __typename?: 'Product';
  _count: ProductCount;
  /** Aliases separated by commas */
  aliases?: Maybe<Scalars['String']['output']>;
  /** Product attribute */
  attributes?: Maybe<Array<AttributeValue>>;
  /** Brutto weight */
  brutto?: Maybe<Scalars['Decimal']['output']>;
  /** Created data */
  createdAt: Scalars['DateTime']['output'];
  /** Product ID */
  id: Scalars['ID']['output'];
  /** Products images */
  images?: Maybe<Array<File>>;
  /** Products in orders */
  item?: Maybe<Array<Item>>;
  /** Manufacturer */
  manufacturer?: Maybe<Manufacturer>;
  manufacturerId?: Maybe<Scalars['String']['output']>;
  /** English name */
  nameEn?: Maybe<Scalars['String']['output']>;
  /** Russian name */
  nameRu?: Maybe<Scalars['String']['output']>;
  /** Netto weight */
  netto?: Maybe<Scalars['Decimal']['output']>;
  /** The originality of the product */
  original: Scalars['Boolean']['output'];
  prices?: Maybe<Array<Price>>;
  /** Goods in stock */
  stock: Scalars['Int']['output'];
  /** TN VED code */
  tnved?: Maybe<Scalars['String']['output']>;
  /** Update data */
  updatedAt: Scalars['DateTime']['output'];
  /** Article number */
  vendorCode: Scalars['String']['output'];
};

export type ProductAvgAggregate = {
  __typename?: 'ProductAvgAggregate';
  brutto?: Maybe<Scalars['Decimal']['output']>;
  netto?: Maybe<Scalars['Decimal']['output']>;
  stock?: Maybe<Scalars['Float']['output']>;
};

export type ProductConnectionType = {
  __typename?: 'ProductConnectionType';
  edges?: Maybe<Array<ProductEdge>>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type ProductCount = {
  __typename?: 'ProductCount';
  attributes: Scalars['Int']['output'];
  images: Scalars['Int']['output'];
  item: Scalars['Int']['output'];
  prices: Scalars['Int']['output'];
};

export type ProductCountAggregate = {
  __typename?: 'ProductCountAggregate';
  _all: Scalars['Int']['output'];
  aliases: Scalars['Int']['output'];
  brutto: Scalars['Int']['output'];
  createdAt: Scalars['Int']['output'];
  id: Scalars['Int']['output'];
  manufacturerId: Scalars['Int']['output'];
  nameEn: Scalars['Int']['output'];
  nameRu: Scalars['Int']['output'];
  netto: Scalars['Int']['output'];
  original: Scalars['Int']['output'];
  stock: Scalars['Int']['output'];
  tnved: Scalars['Int']['output'];
  updatedAt: Scalars['Int']['output'];
  vendorCode: Scalars['Int']['output'];
};

export type ProductEdge = {
  __typename?: 'ProductEdge';
  cursor: Scalars['String']['output'];
  node: Product;
};

export type ProductListRelationFilter = {
  every?: InputMaybe<ProductWhereInput>;
  none?: InputMaybe<ProductWhereInput>;
  some?: InputMaybe<ProductWhereInput>;
};

export type ProductMaxAggregate = {
  __typename?: 'ProductMaxAggregate';
  aliases?: Maybe<Scalars['String']['output']>;
  brutto?: Maybe<Scalars['Decimal']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  manufacturerId?: Maybe<Scalars['String']['output']>;
  nameEn?: Maybe<Scalars['String']['output']>;
  nameRu?: Maybe<Scalars['String']['output']>;
  netto?: Maybe<Scalars['Decimal']['output']>;
  original?: Maybe<Scalars['Boolean']['output']>;
  stock?: Maybe<Scalars['Int']['output']>;
  tnved?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  vendorCode?: Maybe<Scalars['String']['output']>;
};

export type ProductMinAggregate = {
  __typename?: 'ProductMinAggregate';
  aliases?: Maybe<Scalars['String']['output']>;
  brutto?: Maybe<Scalars['Decimal']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  manufacturerId?: Maybe<Scalars['String']['output']>;
  nameEn?: Maybe<Scalars['String']['output']>;
  nameRu?: Maybe<Scalars['String']['output']>;
  netto?: Maybe<Scalars['Decimal']['output']>;
  original?: Maybe<Scalars['Boolean']['output']>;
  stock?: Maybe<Scalars['Int']['output']>;
  tnved?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  vendorCode?: Maybe<Scalars['String']['output']>;
};

export type ProductOrderByRelationAggregateInput = {
  _count?: InputMaybe<SortOrder>;
};

export type ProductOrderByWithRelationInput = {
  aliases?: InputMaybe<SortOrderInput>;
  attributes?: InputMaybe<AttributeValueOrderByRelationAggregateInput>;
  brutto?: InputMaybe<SortOrderInput>;
  createdAt?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  images?: InputMaybe<FileOrderByRelationAggregateInput>;
  item?: InputMaybe<ItemOrderByRelationAggregateInput>;
  manufacturer?: InputMaybe<ManufacturerOrderByWithRelationInput>;
  manufacturerId?: InputMaybe<SortOrderInput>;
  nameEn?: InputMaybe<SortOrderInput>;
  nameRu?: InputMaybe<SortOrderInput>;
  netto?: InputMaybe<SortOrderInput>;
  original?: InputMaybe<SortOrder>;
  prices?: InputMaybe<PriceOrderByRelationAggregateInput>;
  stock?: InputMaybe<SortOrder>;
  tnved?: InputMaybe<SortOrderInput>;
  updatedAt?: InputMaybe<SortOrder>;
  vendorCode?: InputMaybe<SortOrder>;
};

export type ProductRelationFilter = {
  is?: InputMaybe<ProductWhereInput>;
  isNot?: InputMaybe<ProductWhereInput>;
};

export type ProductScalarFieldEnum =
  | 'aliases'
  | 'brutto'
  | 'createdAt'
  | 'id'
  | 'manufacturerId'
  | 'nameEn'
  | 'nameRu'
  | 'netto'
  | 'original'
  | 'stock'
  | 'tnved'
  | 'updatedAt'
  | 'vendorCode';

export type ProductSumAggregate = {
  __typename?: 'ProductSumAggregate';
  brutto?: Maybe<Scalars['Decimal']['output']>;
  netto?: Maybe<Scalars['Decimal']['output']>;
  stock?: Maybe<Scalars['Int']['output']>;
};

export type ProductWhereInput = {
  AND?: InputMaybe<Array<ProductWhereInput>>;
  NOT?: InputMaybe<Array<ProductWhereInput>>;
  OR?: InputMaybe<Array<ProductWhereInput>>;
  aliases?: InputMaybe<StringNullableFilter>;
  attributes?: InputMaybe<AttributeValueListRelationFilter>;
  brutto?: InputMaybe<DecimalNullableFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  id?: InputMaybe<StringFilter>;
  images?: InputMaybe<FileListRelationFilter>;
  item?: InputMaybe<ItemListRelationFilter>;
  manufacturer?: InputMaybe<ManufacturerNullableRelationFilter>;
  manufacturerId?: InputMaybe<StringNullableFilter>;
  nameEn?: InputMaybe<StringNullableFilter>;
  nameRu?: InputMaybe<StringNullableFilter>;
  netto?: InputMaybe<DecimalNullableFilter>;
  original?: InputMaybe<BoolFilter>;
  prices?: InputMaybe<PriceListRelationFilter>;
  stock?: InputMaybe<IntFilter>;
  tnved?: InputMaybe<StringNullableFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
  vendorCode?: InputMaybe<StringFilter>;
};

export type ProductWhereUniqueInput = {
  AND?: InputMaybe<Array<ProductWhereInput>>;
  NOT?: InputMaybe<Array<ProductWhereInput>>;
  OR?: InputMaybe<Array<ProductWhereInput>>;
  aliases?: InputMaybe<StringNullableFilter>;
  attributes?: InputMaybe<AttributeValueListRelationFilter>;
  brutto?: InputMaybe<DecimalNullableFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  id?: InputMaybe<Scalars['String']['input']>;
  images?: InputMaybe<FileListRelationFilter>;
  item?: InputMaybe<ItemListRelationFilter>;
  manufacturer?: InputMaybe<ManufacturerNullableRelationFilter>;
  manufacturerId?: InputMaybe<StringNullableFilter>;
  nameEn?: InputMaybe<StringNullableFilter>;
  nameRu?: InputMaybe<StringNullableFilter>;
  netto?: InputMaybe<DecimalNullableFilter>;
  original?: InputMaybe<BoolFilter>;
  prices?: InputMaybe<PriceListRelationFilter>;
  stock?: InputMaybe<IntFilter>;
  tnved?: InputMaybe<StringNullableFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
  vendorCode?: InputMaybe<Scalars['String']['input']>;
};

export type Query = {
  __typename?: 'Query';
  items: ItemConnectionType;
  itemsByLastStatus: ItemConnectionType;
  me: User;
  products: ProductConnectionType;
};


export type QueryItemsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  cursor?: InputMaybe<ItemWhereUniqueInput>;
  distinct?: InputMaybe<Array<ItemScalarFieldEnum>>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<ItemOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<ItemWhereInput>;
};


export type QueryItemsByLastStatusArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  cursor?: InputMaybe<ItemWhereUniqueInput>;
  distinct?: InputMaybe<Array<ItemScalarFieldEnum>>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<ItemOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  status: ItemStatus;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<ItemWhereInput>;
};


export type QueryProductsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  cursor?: InputMaybe<ProductWhereUniqueInput>;
  distinct?: InputMaybe<Array<ProductScalarFieldEnum>>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<ProductOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<ProductWhereInput>;
};

export type QueryMode =
  | 'default'
  | 'insensitive';

export type Role =
  | 'ADMIN'
  | 'BUYER'
  | 'LOGIST'
  | 'SELLER'
  | 'USER';

export type SortOrder =
  | 'asc'
  | 'desc';

export type SortOrderInput = {
  nulls?: InputMaybe<NullsOrder>;
  sort: SortOrder;
};

/** Order status model */
export type Status = {
  __typename?: 'Status';
  /** Created date */
  createdAt: Scalars['DateTime']['output'];
  /** Status ID */
  id: Scalars['ID']['output'];
  /** Order */
  order: Order;
  orderId: Scalars['String']['output'];
  /** Order status */
  status: OrderStatus;
  /** User */
  user?: Maybe<User>;
  userId?: Maybe<Scalars['String']['output']>;
};

/** The model of the item statuses in the order */
export type StatusItem = {
  __typename?: 'StatusItem';
  /** Created date */
  createdAt: Scalars['DateTime']['output'];
  /** Status ID */
  id: Scalars['ID']['output'];
  /** Item */
  item: Item;
  itemId: Scalars['String']['output'];
  /** Item status */
  status: ItemStatus;
  /** User */
  user?: Maybe<User>;
  userId?: Maybe<Scalars['String']['output']>;
};

export type StatusItemListRelationFilter = {
  every?: InputMaybe<StatusItemWhereInput>;
  none?: InputMaybe<StatusItemWhereInput>;
  some?: InputMaybe<StatusItemWhereInput>;
};

export type StatusItemOrderByRelationAggregateInput = {
  _count?: InputMaybe<SortOrder>;
};

export type StatusItemWhereInput = {
  AND?: InputMaybe<Array<StatusItemWhereInput>>;
  NOT?: InputMaybe<Array<StatusItemWhereInput>>;
  OR?: InputMaybe<Array<StatusItemWhereInput>>;
  createdAt?: InputMaybe<DateTimeFilter>;
  id?: InputMaybe<StringFilter>;
  item?: InputMaybe<ItemRelationFilter>;
  itemId?: InputMaybe<StringFilter>;
  status?: InputMaybe<EnumItemStatusFilter>;
  user?: InputMaybe<UserNullableRelationFilter>;
  userId?: InputMaybe<StringNullableFilter>;
};

export type StatusListRelationFilter = {
  every?: InputMaybe<StatusWhereInput>;
  none?: InputMaybe<StatusWhereInput>;
  some?: InputMaybe<StatusWhereInput>;
};

export type StatusOrderByRelationAggregateInput = {
  _count?: InputMaybe<SortOrder>;
};

export type StatusWhereInput = {
  AND?: InputMaybe<Array<StatusWhereInput>>;
  NOT?: InputMaybe<Array<StatusWhereInput>>;
  OR?: InputMaybe<Array<StatusWhereInput>>;
  createdAt?: InputMaybe<DateTimeFilter>;
  id?: InputMaybe<StringFilter>;
  order?: InputMaybe<OrderRelationFilter>;
  orderId?: InputMaybe<StringFilter>;
  status?: InputMaybe<EnumOrderStatusFilter>;
  user?: InputMaybe<UserNullableRelationFilter>;
  userId?: InputMaybe<StringNullableFilter>;
};

export type StringFilter = {
  contains?: InputMaybe<Scalars['String']['input']>;
  endsWith?: InputMaybe<Scalars['String']['input']>;
  equals?: InputMaybe<Scalars['String']['input']>;
  gt?: InputMaybe<Scalars['String']['input']>;
  gte?: InputMaybe<Scalars['String']['input']>;
  in?: InputMaybe<Array<Scalars['String']['input']>>;
  lt?: InputMaybe<Scalars['String']['input']>;
  lte?: InputMaybe<Scalars['String']['input']>;
  mode?: InputMaybe<QueryMode>;
  not?: InputMaybe<NestedStringFilter>;
  notIn?: InputMaybe<Array<Scalars['String']['input']>>;
  startsWith?: InputMaybe<Scalars['String']['input']>;
};

export type StringNullableFilter = {
  contains?: InputMaybe<Scalars['String']['input']>;
  endsWith?: InputMaybe<Scalars['String']['input']>;
  equals?: InputMaybe<Scalars['String']['input']>;
  gt?: InputMaybe<Scalars['String']['input']>;
  gte?: InputMaybe<Scalars['String']['input']>;
  in?: InputMaybe<Array<Scalars['String']['input']>>;
  lt?: InputMaybe<Scalars['String']['input']>;
  lte?: InputMaybe<Scalars['String']['input']>;
  mode?: InputMaybe<QueryMode>;
  not?: InputMaybe<NestedStringNullableFilter>;
  notIn?: InputMaybe<Array<Scalars['String']['input']>>;
  startsWith?: InputMaybe<Scalars['String']['input']>;
};

/** Supplier model */
export type Supplier = {
  __typename?: 'Supplier';
  _count: SupplierCount;
  /** Supplier ID */
  id: Scalars['ID']['output'];
  location: Location;
  /** Supplier name */
  name: Scalars['String']['output'];
  products?: Maybe<Array<Price>>;
};

export type SupplierCount = {
  __typename?: 'SupplierCount';
  products: Scalars['Int']['output'];
};

export type SupplierNullableRelationFilter = {
  is?: InputMaybe<SupplierWhereInput>;
  isNot?: InputMaybe<SupplierWhereInput>;
};

export type SupplierOrderByWithRelationInput = {
  id?: InputMaybe<SortOrder>;
  location?: InputMaybe<SortOrder>;
  name?: InputMaybe<SortOrder>;
  products?: InputMaybe<PriceOrderByRelationAggregateInput>;
};

export type SupplierWhereInput = {
  AND?: InputMaybe<Array<SupplierWhereInput>>;
  NOT?: InputMaybe<Array<SupplierWhereInput>>;
  OR?: InputMaybe<Array<SupplierWhereInput>>;
  id?: InputMaybe<StringFilter>;
  location?: InputMaybe<EnumLocationFilter>;
  name?: InputMaybe<StringFilter>;
  products?: InputMaybe<PriceListRelationFilter>;
};

export type UpdateUserInput = {
  /** Date of birthday  */
  birthday?: InputMaybe<Scalars['DateTime']['input']>;
  email: Scalars['EmailAddress']['input'];
  firstName: Scalars['String']['input'];
  id?: InputMaybe<Scalars['String']['input']>;
  lastName: Scalars['String']['input'];
  patronymic?: InputMaybe<Scalars['String']['input']>;
};

export type User = {
  __typename?: 'User';
  /** Avatar */
  avatar?: Maybe<Scalars['String']['output']>;
  /** Birthday datetime */
  birthday?: Maybe<Scalars['DateTime']['output']>;
  comment?: Maybe<Array<Comment>>;
  commentItem?: Maybe<Array<CommentItem>>;
  /** Companies */
  companies?: Maybe<Companies>;
  companiesId?: Maybe<Scalars['String']['output']>;
  /** Register data */
  createdAt: Scalars['DateTime']['output'];
  /** Email */
  email: Scalars['String']['output'];
  /** My files */
  files?: Maybe<Array<File>>;
  /** First Name */
  firstName: Scalars['String']['output'];
  /** Gender */
  gender: Gender;
  /** ID */
  id: Scalars['ID']['output'];
  /** Active user */
  isActive: Scalars['Boolean']['output'];
  item?: Maybe<Array<Item>>;
  /** Last Name */
  lastName: Scalars['String']['output'];
  /** Orders taken */
  manageOrders?: Maybe<Array<Order>>;
  /** My orders */
  orders?: Maybe<Array<Order>>;
  /** Patronymic */
  patronymic?: Maybe<Scalars['String']['output']>;
  /** Phone number */
  phone?: Maybe<Scalars['String']['output']>;
  /** Role */
  role: Role;
  status?: Maybe<Array<Status>>;
  statusItem?: Maybe<Array<StatusItem>>;
  /** TimeZone */
  tz: Scalars['String']['output'];
  /** Updated date */
  updatedAt: Scalars['DateTime']['output'];
  /** Username */
  username: Scalars['String']['output'];
};

export type UserCountAggregate = {
  __typename?: 'UserCountAggregate';
  _all: Scalars['Int']['output'];
  avatar: Scalars['Int']['output'];
  birthday: Scalars['Int']['output'];
  companiesId: Scalars['Int']['output'];
  createdAt: Scalars['Int']['output'];
  email: Scalars['Int']['output'];
  firstName: Scalars['Int']['output'];
  gender: Scalars['Int']['output'];
  id: Scalars['Int']['output'];
  isActive: Scalars['Int']['output'];
  lastName: Scalars['Int']['output'];
  patronymic: Scalars['Int']['output'];
  phone: Scalars['Int']['output'];
  role: Scalars['Int']['output'];
  tz: Scalars['Int']['output'];
  updatedAt: Scalars['Int']['output'];
  username: Scalars['Int']['output'];
};

export type UserListRelationFilter = {
  every?: InputMaybe<UserWhereInput>;
  none?: InputMaybe<UserWhereInput>;
  some?: InputMaybe<UserWhereInput>;
};

export type UserLoginInput = {
  password: Scalars['String']['input'];
  username: Scalars['String']['input'];
};

export type UserLoginType = {
  __typename?: 'UserLoginType';
  accessToken: Scalars['String']['output'];
  user: User;
};

export type UserMaxAggregate = {
  __typename?: 'UserMaxAggregate';
  avatar?: Maybe<Scalars['String']['output']>;
  birthday?: Maybe<Scalars['DateTime']['output']>;
  companiesId?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  firstName?: Maybe<Scalars['String']['output']>;
  gender?: Maybe<Gender>;
  id?: Maybe<Scalars['String']['output']>;
  isActive?: Maybe<Scalars['Boolean']['output']>;
  lastName?: Maybe<Scalars['String']['output']>;
  patronymic?: Maybe<Scalars['String']['output']>;
  phone?: Maybe<Scalars['String']['output']>;
  role?: Maybe<Role>;
  tz?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  username?: Maybe<Scalars['String']['output']>;
};

export type UserMinAggregate = {
  __typename?: 'UserMinAggregate';
  avatar?: Maybe<Scalars['String']['output']>;
  birthday?: Maybe<Scalars['DateTime']['output']>;
  companiesId?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  firstName?: Maybe<Scalars['String']['output']>;
  gender?: Maybe<Gender>;
  id?: Maybe<Scalars['String']['output']>;
  isActive?: Maybe<Scalars['Boolean']['output']>;
  lastName?: Maybe<Scalars['String']['output']>;
  patronymic?: Maybe<Scalars['String']['output']>;
  phone?: Maybe<Scalars['String']['output']>;
  role?: Maybe<Role>;
  tz?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  username?: Maybe<Scalars['String']['output']>;
};

export type UserNullableRelationFilter = {
  is?: InputMaybe<UserWhereInput>;
  isNot?: InputMaybe<UserWhereInput>;
};

export type UserOrderByRelationAggregateInput = {
  _count?: InputMaybe<SortOrder>;
};

export type UserOrderByWithRelationInput = {
  avatar?: InputMaybe<SortOrderInput>;
  birthday?: InputMaybe<SortOrderInput>;
  comment?: InputMaybe<CommentOrderByRelationAggregateInput>;
  commentItem?: InputMaybe<CommentItemOrderByRelationAggregateInput>;
  companies?: InputMaybe<CompaniesOrderByWithRelationInput>;
  companiesId?: InputMaybe<SortOrderInput>;
  createdAt?: InputMaybe<SortOrder>;
  email?: InputMaybe<SortOrder>;
  files?: InputMaybe<FileOrderByRelationAggregateInput>;
  firstName?: InputMaybe<SortOrder>;
  gender?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  isActive?: InputMaybe<SortOrder>;
  item?: InputMaybe<ItemOrderByRelationAggregateInput>;
  lastName?: InputMaybe<SortOrder>;
  manageOrders?: InputMaybe<OrderOrderByRelationAggregateInput>;
  orders?: InputMaybe<OrderOrderByRelationAggregateInput>;
  password?: InputMaybe<SortOrder>;
  patronymic?: InputMaybe<SortOrderInput>;
  phone?: InputMaybe<SortOrderInput>;
  role?: InputMaybe<SortOrder>;
  status?: InputMaybe<StatusOrderByRelationAggregateInput>;
  statusItem?: InputMaybe<StatusItemOrderByRelationAggregateInput>;
  tz?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
  username?: InputMaybe<SortOrder>;
};

export type UserRegisterInput = {
  /** Date of birthday  */
  birthday?: InputMaybe<Scalars['DateTime']['input']>;
  email: Scalars['EmailAddress']['input'];
  firstName: Scalars['String']['input'];
  lastName: Scalars['String']['input'];
  password: Scalars['String']['input'];
  patronymic?: InputMaybe<Scalars['String']['input']>;
  username: Scalars['String']['input'];
};

export type UserRelationFilter = {
  is?: InputMaybe<UserWhereInput>;
  isNot?: InputMaybe<UserWhereInput>;
};

export type UserWhereInput = {
  AND?: InputMaybe<Array<UserWhereInput>>;
  NOT?: InputMaybe<Array<UserWhereInput>>;
  OR?: InputMaybe<Array<UserWhereInput>>;
  avatar?: InputMaybe<StringNullableFilter>;
  birthday?: InputMaybe<DateTimeNullableFilter>;
  comment?: InputMaybe<CommentListRelationFilter>;
  commentItem?: InputMaybe<CommentItemListRelationFilter>;
  companies?: InputMaybe<CompaniesNullableRelationFilter>;
  companiesId?: InputMaybe<StringNullableFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  email?: InputMaybe<StringFilter>;
  files?: InputMaybe<FileListRelationFilter>;
  firstName?: InputMaybe<StringFilter>;
  gender?: InputMaybe<EnumGenderFilter>;
  id?: InputMaybe<StringFilter>;
  isActive?: InputMaybe<BoolFilter>;
  item?: InputMaybe<ItemListRelationFilter>;
  lastName?: InputMaybe<StringFilter>;
  manageOrders?: InputMaybe<OrderListRelationFilter>;
  orders?: InputMaybe<OrderListRelationFilter>;
  password?: InputMaybe<StringFilter>;
  patronymic?: InputMaybe<StringNullableFilter>;
  phone?: InputMaybe<StringNullableFilter>;
  role?: InputMaybe<EnumRoleFilter>;
  status?: InputMaybe<StatusListRelationFilter>;
  statusItem?: InputMaybe<StatusItemListRelationFilter>;
  tz?: InputMaybe<StringFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
  username?: InputMaybe<StringFilter>;
};

export type UserFieldsFragment = { __typename: 'User', id: string, username: string, avatar?: string | null, email: string, lastName: string, firstName: string, patronymic?: string | null, isActive: boolean, birthday?: any | null, phone?: string | null, role: Role, gender: Gender, createdAt: any, updatedAt: any, tz: string };

export type LoginMutationVariables = Exact<{
  userLoginInput: UserLoginInput;
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'UserLoginType', accessToken: string, user: { __typename: 'User', id: string, username: string, avatar?: string | null, email: string, lastName: string, firstName: string, patronymic?: string | null, isActive: boolean, birthday?: any | null, phone?: string | null, role: Role, gender: Gender, createdAt: any, updatedAt: any, tz: string } } };

export type RegisterMutationVariables = Exact<{
  userRegisterInput: UserRegisterInput;
}>;


export type RegisterMutation = { __typename?: 'Mutation', register?: { __typename?: 'UserLoginType', accessToken: string, user: { __typename: 'User', id: string, username: string, avatar?: string | null, email: string, lastName: string, firstName: string, patronymic?: string | null, isActive: boolean, birthday?: any | null, phone?: string | null, role: Role, gender: Gender, createdAt: any, updatedAt: any, tz: string } } | null };

export type UpdateUserMutationVariables = Exact<{
  updateUserInput: UpdateUserInput;
}>;


export type UpdateUserMutation = { __typename?: 'Mutation', updateUser: { __typename: 'User', id: string, username: string, avatar?: string | null, email: string, lastName: string, firstName: string, patronymic?: string | null, isActive: boolean, birthday?: any | null, phone?: string | null, role: Role, gender: Gender, createdAt: any, updatedAt: any, tz: string } };

export type UploadAvatarMutationVariables = Exact<{
  fileId: Scalars['String']['input'];
}>;


export type UploadAvatarMutation = { __typename?: 'Mutation', uploadAvatar: { __typename: 'User', id: string, username: string, avatar?: string | null, email: string, lastName: string, firstName: string, patronymic?: string | null, isActive: boolean, birthday?: any | null, phone?: string | null, role: Role, gender: Gender, createdAt: any, updatedAt: any, tz: string } };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me: { __typename: 'User', id: string, username: string, avatar?: string | null, email: string, lastName: string, firstName: string, patronymic?: string | null, isActive: boolean, birthday?: any | null, phone?: string | null, role: Role, gender: Gender, createdAt: any, updatedAt: any, tz: string } };

export type PriceFieldsFragment = { __typename: 'Price', id: string, price: any, duration?: number | null, supplierName: string, country?: string | null, site?: string | null, comment?: string | null, createdAt: any, validAt?: any | null };

export type ManufacturerFieldsFragment = { __typename?: 'Manufacturer', id: string, name: string };

export type ProductFieldsFragment = { __typename: 'Product', id: string, vendorCode: string, nameEn?: string | null, nameRu?: string | null, aliases?: string | null, original: boolean, stock: number };

export type ProductsQueryVariables = Exact<{
  search?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  after?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
}>;


export type ProductsQuery = { __typename?: 'Query', products: { __typename?: 'ProductConnectionType', totalCount: number, pageInfo: { __typename: 'PageInfo', hasPreviousPage: boolean, hasNextPage: boolean, startCursor?: string | null, endCursor?: string | null }, edges?: Array<{ __typename?: 'ProductEdge', node: { __typename: 'Product', id: string, vendorCode: string, nameEn?: string | null, nameRu?: string | null, aliases?: string | null, original: boolean, stock: number, prices?: Array<{ __typename: 'Price', id: string, price: any, duration?: number | null, supplierName: string, country?: string | null, site?: string | null, comment?: string | null, createdAt: any, validAt?: any | null }> | null } }> | null } };

export const UserFieldsFragmentDoc = gql`
    fragment UserFields on User {
  id
  username
  avatar
  email
  lastName
  firstName
  patronymic
  isActive
  birthday
  phone
  role
  gender
  createdAt
  updatedAt
  tz
  __typename
}
    `;
export const PriceFieldsFragmentDoc = gql`
    fragment PriceFields on Price {
  id
  price
  duration
  supplierName
  country
  site
  comment
  createdAt
  validAt
  __typename
}
    `;
export const ManufacturerFieldsFragmentDoc = gql`
    fragment ManufacturerFields on Manufacturer {
  id
  name
}
    `;
export const ProductFieldsFragmentDoc = gql`
    fragment ProductFields on Product {
  id
  vendorCode
  nameEn
  nameRu
  aliases
  original
  stock
  __typename
}
    `;
export const LoginDocument = gql`
    mutation Login($userLoginInput: UserLoginInput!) {
  login(userLoginInput: $userLoginInput) {
    accessToken
    user {
      ...UserFields
    }
  }
}
    ${UserFieldsFragmentDoc}`;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useLoginMutation({
 *   variables: {
 *     userLoginInput: // value for 'userLoginInput'
 *   },
 * });
 */
export function useLoginMutation(options: VueApolloComposable.UseMutationOptions<LoginMutation, LoginMutationVariables> | ReactiveFunction<VueApolloComposable.UseMutationOptions<LoginMutation, LoginMutationVariables>> = {}) {
  return VueApolloComposable.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
}
export type LoginMutationCompositionFunctionResult = VueApolloComposable.UseMutationReturn<LoginMutation, LoginMutationVariables>;
export const RegisterDocument = gql`
    mutation Register($userRegisterInput: UserRegisterInput!) {
  register(userRegisterInput: $userRegisterInput) {
    accessToken
    user {
      ...UserFields
    }
  }
}
    ${UserFieldsFragmentDoc}`;

/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useRegisterMutation({
 *   variables: {
 *     userRegisterInput: // value for 'userRegisterInput'
 *   },
 * });
 */
export function useRegisterMutation(options: VueApolloComposable.UseMutationOptions<RegisterMutation, RegisterMutationVariables> | ReactiveFunction<VueApolloComposable.UseMutationOptions<RegisterMutation, RegisterMutationVariables>> = {}) {
  return VueApolloComposable.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument, options);
}
export type RegisterMutationCompositionFunctionResult = VueApolloComposable.UseMutationReturn<RegisterMutation, RegisterMutationVariables>;
export const UpdateUserDocument = gql`
    mutation updateUser($updateUserInput: UpdateUserInput!) {
  updateUser(updateUserInput: $updateUserInput) {
    ...UserFields
  }
}
    ${UserFieldsFragmentDoc}`;

/**
 * __useUpdateUserMutation__
 *
 * To run a mutation, you first call `useUpdateUserMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useUpdateUserMutation({
 *   variables: {
 *     updateUserInput: // value for 'updateUserInput'
 *   },
 * });
 */
export function useUpdateUserMutation(options: VueApolloComposable.UseMutationOptions<UpdateUserMutation, UpdateUserMutationVariables> | ReactiveFunction<VueApolloComposable.UseMutationOptions<UpdateUserMutation, UpdateUserMutationVariables>> = {}) {
  return VueApolloComposable.useMutation<UpdateUserMutation, UpdateUserMutationVariables>(UpdateUserDocument, options);
}
export type UpdateUserMutationCompositionFunctionResult = VueApolloComposable.UseMutationReturn<UpdateUserMutation, UpdateUserMutationVariables>;
export const UploadAvatarDocument = gql`
    mutation uploadAvatar($fileId: String!) {
  uploadAvatar(fileId: $fileId) {
    ...UserFields
  }
}
    ${UserFieldsFragmentDoc}`;

/**
 * __useUploadAvatarMutation__
 *
 * To run a mutation, you first call `useUploadAvatarMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useUploadAvatarMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useUploadAvatarMutation({
 *   variables: {
 *     fileId: // value for 'fileId'
 *   },
 * });
 */
export function useUploadAvatarMutation(options: VueApolloComposable.UseMutationOptions<UploadAvatarMutation, UploadAvatarMutationVariables> | ReactiveFunction<VueApolloComposable.UseMutationOptions<UploadAvatarMutation, UploadAvatarMutationVariables>> = {}) {
  return VueApolloComposable.useMutation<UploadAvatarMutation, UploadAvatarMutationVariables>(UploadAvatarDocument, options);
}
export type UploadAvatarMutationCompositionFunctionResult = VueApolloComposable.UseMutationReturn<UploadAvatarMutation, UploadAvatarMutationVariables>;
export const MeDocument = gql`
    query Me {
  me {
    ...UserFields
  }
}
    ${UserFieldsFragmentDoc}`;

/**
 * __useMeQuery__
 *
 * To run a query within a Vue component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains result, loading and error properties
 * you can use to render your UI.
 *
 * @param options that will be passed into the query, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/query.html#options;
 *
 * @example
 * const { result, loading, error } = useMeQuery();
 */
export function useMeQuery(options: VueApolloComposable.UseQueryOptions<MeQuery, MeQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<MeQuery, MeQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<MeQuery, MeQueryVariables>> = {}) {
  return VueApolloComposable.useQuery<MeQuery, MeQueryVariables>(MeDocument, {}, options);
}
export function useMeLazyQuery(options: VueApolloComposable.UseQueryOptions<MeQuery, MeQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<MeQuery, MeQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<MeQuery, MeQueryVariables>> = {}) {
  return VueApolloComposable.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, {}, options);
}
export type MeQueryCompositionFunctionResult = VueApolloComposable.UseQueryReturn<MeQuery, MeQueryVariables>;
export const ProductsDocument = gql`
    query Products($search: String, $first: Int, $after: String, $skip: Int) {
  products(
    where: {OR: [{vendorCode: {contains: $search}}, {nameRu: {contains: $search}}, {nameEn: {contains: $search}}]}
    orderBy: {id: desc}
    first: $first
    after: $after
    skip: $skip
  ) {
    totalCount
    pageInfo {
      hasPreviousPage
      hasNextPage
      startCursor
      endCursor
      __typename
    }
    edges {
      node {
        ...ProductFields
        prices {
          ...PriceFields
        }
      }
    }
  }
}
    ${ProductFieldsFragmentDoc}
${PriceFieldsFragmentDoc}`;

/**
 * __useProductsQuery__
 *
 * To run a query within a Vue component, call `useProductsQuery` and pass it any options that fit your needs.
 * When your component renders, `useProductsQuery` returns an object from Apollo Client that contains result, loading and error properties
 * you can use to render your UI.
 *
 * @param variables that will be passed into the query
 * @param options that will be passed into the query, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/query.html#options;
 *
 * @example
 * const { result, loading, error } = useProductsQuery({
 *   search: // value for 'search'
 *   first: // value for 'first'
 *   after: // value for 'after'
 *   skip: // value for 'skip'
 * });
 */
export function useProductsQuery(variables: ProductsQueryVariables | VueCompositionApi.Ref<ProductsQueryVariables> | ReactiveFunction<ProductsQueryVariables> = {}, options: VueApolloComposable.UseQueryOptions<ProductsQuery, ProductsQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<ProductsQuery, ProductsQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<ProductsQuery, ProductsQueryVariables>> = {}) {
  return VueApolloComposable.useQuery<ProductsQuery, ProductsQueryVariables>(ProductsDocument, variables, options);
}
export function useProductsLazyQuery(variables: ProductsQueryVariables | VueCompositionApi.Ref<ProductsQueryVariables> | ReactiveFunction<ProductsQueryVariables> = {}, options: VueApolloComposable.UseQueryOptions<ProductsQuery, ProductsQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<ProductsQuery, ProductsQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<ProductsQuery, ProductsQueryVariables>> = {}) {
  return VueApolloComposable.useLazyQuery<ProductsQuery, ProductsQueryVariables>(ProductsDocument, variables, options);
}
export type ProductsQueryCompositionFunctionResult = VueApolloComposable.UseQueryReturn<ProductsQuery, ProductsQueryVariables>;