export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: { input: any; output: any; }
  /** A field whose value conforms to the standard internet email address format as specified in HTML Spec: https://html.spec.whatwg.org/multipage/input.html#valid-e-mail-address. */
  EmailAddress: { input: any; output: any; }
};

export type File = {
  __typename?: 'File';
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
  /** Service url file */
  serverUrl: Scalars['String']['output'];
  /** Updated data */
  updatedAt: Scalars['DateTime']['output'];
  /** User ID */
  user?: Maybe<User>;
  userId?: Maybe<Scalars['String']['output']>;
};

export type FileUploadInput = {
  bucket: Scalars['String']['input'];
  fileName: Scalars['String']['input'];
  name: Scalars['String']['input'];
};

export type FileUploadType = {
  __typename?: 'FileUploadType';
  bucket: Scalars['String']['output'];
  fileName: Scalars['String']['output'];
  name: Scalars['String']['output'];
  presignedUrl: Scalars['String']['output'];
};

export type Gender =
  | 'FEMALE'
  | 'MALE'
  | 'UNKNOWN';

export type Mutation = {
  __typename?: 'Mutation';
  login: UserLoginType;
  register?: Maybe<UserLoginType>;
  uploadAvatar: User;
};


export type MutationLoginArgs = {
  userLoginInput: UserLoginInput;
};


export type MutationRegisterArgs = {
  userRegisterInput: UserRegisterInput;
};


export type MutationUploadAvatarArgs = {
  fileUpload: FileUploadInput;
};

export type Query = {
  __typename?: 'Query';
  me: User;
  presignedPutUrl: FileUploadType;
};


export type QueryPresignedPutUrlArgs = {
  fileName: Scalars['String']['input'];
};

export type Role =
  | 'ADMIN'
  | 'BUYER'
  | 'LOGIST'
  | 'SELLER'
  | 'USER';

export type User = {
  __typename?: 'User';
  /** Avatar */
  avatar?: Maybe<Scalars['String']['output']>;
  /** Birthday datetime */
  birthday?: Maybe<Scalars['DateTime']['output']>;
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
  /** Last Name */
  lastName: Scalars['String']['output'];
  /** Patronymic */
  patronymic?: Maybe<Scalars['String']['output']>;
  /** Phone number */
  phone?: Maybe<Scalars['String']['output']>;
  /** Role */
  role: Role;
  /** TimeZone */
  tz: Scalars['String']['output'];
  /** Дата обновления */
  updatedAt: Scalars['DateTime']['output'];
  /** Username */
  username: Scalars['String']['output'];
};

export type UserCountAggregate = {
  __typename?: 'UserCountAggregate';
  _all: Scalars['Int']['output'];
  avatar: Scalars['Int']['output'];
  birthday: Scalars['Int']['output'];
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

export type UserFieldsFragment = { __typename: 'User', id: string, username: string, avatar?: string | null, email: string, lastName: string, firstName: string, patronymic?: string | null, birthday?: any | null, role: Role, gender: Gender, createdAt: any, tz: string };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me: { __typename: 'User', id: string, username: string, avatar?: string | null, email: string, lastName: string, firstName: string, patronymic?: string | null, birthday?: any | null, role: Role, gender: Gender, createdAt: any, tz: string } };
