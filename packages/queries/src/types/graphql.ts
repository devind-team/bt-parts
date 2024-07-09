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
  /** An arbitrary-precision Decimal type */
  Decimal: { input: any; output: any; }
  /** A field whose value conforms to the standard internet email address format as specified in HTML Spec: https://html.spec.whatwg.org/multipage/input.html#valid-e-mail-address. */
  EmailAddress: { input: any; output: any; }
};

/** Модель атрибутов товара */
export type Attribute = {
  __typename?: 'Attribute';
  _count: AttributeCount;
  /** Дата создания */
  createdAt: Scalars['DateTime']['output'];
  /** Идентификатор атрибута */
  id: Scalars['ID']['output'];
  /** Название атрибута */
  name: Scalars['String']['output'];
  /** Продукты */
  products?: Maybe<Array<AttributeValue>>;
};

export type AttributeCount = {
  __typename?: 'AttributeCount';
  products: Scalars['Int']['output'];
};

/** Модель значений атрибутов товара */
export type AttributeValue = {
  __typename?: 'AttributeValue';
  /** Атрибут */
  attribute: Attribute;
  attributeId: Scalars['Int']['output'];
  /** Дата создания */
  createdAt: Scalars['DateTime']['output'];
  /** Идентификатор атрибута */
  id: Scalars['ID']['output'];
  /** Товар */
  product: Product;
  productId: Scalars['Int']['output'];
  /** Название атрибута */
  value: Scalars['String']['output'];
};

/** Комментарии к заказу */
export type Comment = {
  __typename?: 'Comment';
  _count: CommentCount;
  /** Комментарии по дереву */
  comment?: Maybe<Comment>;
  comments?: Maybe<Array<Comment>>;
  /** Дата создания */
  createdAt: Scalars['DateTime']['output'];
  /** Идентификатор комментария */
  id: Scalars['ID']['output'];
  /** Заказ */
  order: Order;
  orderId: Scalars['Int']['output'];
  parentId?: Maybe<Scalars['Int']['output']>;
  /** Текст комментария */
  text: Scalars['String']['output'];
  /** Пользователь добавил */
  user?: Maybe<User>;
  userId?: Maybe<Scalars['Int']['output']>;
};

export type CommentCount = {
  __typename?: 'CommentCount';
  comments: Scalars['Int']['output'];
};

/** Комментарии к заказу */
export type CommentItem = {
  __typename?: 'CommentItem';
  _count: CommentItemCount;
  /** Комментарии по дереву */
  comment?: Maybe<CommentItem>;
  comments?: Maybe<Array<CommentItem>>;
  /** Дата создания */
  createdAt: Scalars['DateTime']['output'];
  /** Идентификатор комментария */
  id: Scalars['ID']['output'];
  /** Заказ */
  item: Item;
  itemId: Scalars['Int']['output'];
  parentId?: Maybe<Scalars['Int']['output']>;
  /** Текст комментария */
  text: Scalars['String']['output'];
  /** Пользователь добавил */
  user?: Maybe<User>;
  userId?: Maybe<Scalars['Int']['output']>;
};

export type CommentItemCount = {
  __typename?: 'CommentItemCount';
  comments: Scalars['Int']['output'];
};

export type DeliveryType =
  | 'KAZAKHSTAN'
  | 'LITHUANIA'
  | 'RORO'
  | 'TURKIYE';

export type File = {
  __typename?: 'File';
  _count: FileCount;
  /** Название баскета для хранения файла */
  bucket: Scalars['String']['output'];
  /** Дата создания */
  createdAt: Scalars['DateTime']['output'];
  /** Идентификатор файла */
  id: Scalars['ID']['output'];
  /** Название файла в баскете */
  key: Scalars['String']['output'];
  /** Название файла */
  name: Scalars['String']['output'];
  products?: Maybe<Array<Product>>;
  /** Название сервиса, на котором расположен файл */
  serverUrl: Scalars['String']['output'];
  /** Дата обновления */
  updatedAt: Scalars['DateTime']['output'];
  /** Файл пользователя, если null - файл системный */
  user?: Maybe<User>;
  userId?: Maybe<Scalars['Int']['output']>;
};

export type FileCount = {
  __typename?: 'FileCount';
  products: Scalars['Int']['output'];
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

/** Модель товара */
export type Item = {
  __typename?: 'Item';
  _count: ItemCount;
  /** Номер машины */
  carNo?: Maybe<Scalars['String']['output']>;
  /** Коэффициент наценки */
  coefficient: Scalars['Float']['output'];
  commentItem?: Maybe<Array<CommentItem>>;
  /** Дата создания */
  createdAt: Scalars['DateTime']['output'];
  /** Тип доставки */
  deliveryType?: Maybe<DeliveryType>;
  /** Идентификатор позиции заказа */
  id: Scalars['ID']['output'];
  /** Заказ */
  order: Order;
  orderId: Scalars['Int']['output'];
  /** Стоимость товара */
  price?: Maybe<Price>;
  priceId?: Maybe<Scalars['Int']['output']>;
  /** Продукт */
  product: Product;
  productId: Scalars['Int']['output'];
  /** Количество */
  quantity: Scalars['Int']['output'];
  /** Номер рейса */
  routeNo?: Maybe<Scalars['String']['output']>;
  /** Статусы товара */
  statuses?: Maybe<Array<StatusItem>>;
  /** Дата изменения позиции заказа */
  updatedAt: Scalars['DateTime']['output'];
  /** Пользователь добавил */
  user?: Maybe<User>;
  userId?: Maybe<Scalars['Int']['output']>;
};

export type ItemCount = {
  __typename?: 'ItemCount';
  commentItem: Scalars['Int']['output'];
  statuses: Scalars['Int']['output'];
};

/** Статус товара */
export type ItemStatus =
  | 'APPROVED'
  | 'COMPLETED'
  | 'CREATED'
  | 'DELIVERY'
  | 'EUSTOCK'
  | 'PURCHASED'
  | 'RUSTOCK';

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

/** Заказ пользователя */
export type Order = {
  __typename?: 'Order';
  _count: OrderCount;
  /** Адрес доставки */
  address?: Maybe<Scalars['String']['output']>;
  comments?: Maybe<Array<Comment>>;
  /** Дата создания */
  createdAt: Scalars['DateTime']['output'];
  /** Идентификатор заказа */
  id: Scalars['ID']['output'];
  items?: Maybe<Array<Item>>;
  /** Менеджер заказа */
  manager?: Maybe<User>;
  managerId?: Maybe<Scalars['Int']['output']>;
  statuses?: Maybe<Array<Status>>;
  /** Пользователь, которые создал заказ */
  user: User;
  userId: Scalars['Int']['output'];
};

export type OrderCount = {
  __typename?: 'OrderCount';
  comments: Scalars['Int']['output'];
  items: Scalars['Int']['output'];
  statuses: Scalars['Int']['output'];
};

/** Статусы заказов */
export type OrderStatus =
  | 'APPROVAL'
  | 'APPROVED'
  | 'CLOSED'
  | 'CREATED'
  | 'DELIVERY'
  | 'PURCHASING';

/** Цены на товар */
export type Price = {
  __typename?: 'Price';
  _count: PriceCount;
  /** Комментарий */
  comment?: Maybe<Scalars['String']['output']>;
  /** Страна поставщика */
  country?: Maybe<Scalars['String']['output']>;
  /** Дата создания */
  createdAt: Scalars['DateTime']['output'];
  /** Срок поставки в днях до склада в Европе */
  duration?: Maybe<Scalars['Int']['output']>;
  /** Идентификатор ценового предложения */
  id: Scalars['ID']['output'];
  item?: Maybe<Array<Item>>;
  /** Цена за единицу/штуку */
  price: Scalars['Decimal']['output'];
  /** Продукт товара */
  product: Product;
  productId: Scalars['Int']['output'];
  /** Комментарий */
  relevant?: Maybe<Scalars['Boolean']['output']>;
  /** Сайт */
  site?: Maybe<Scalars['String']['output']>;
  /** Название поставщика */
  supplierName: Scalars['String']['output'];
  /** Дата обновления */
  updatedAt: Scalars['DateTime']['output'];
  /** Дата действия цены */
  validAt?: Maybe<Scalars['DateTime']['output']>;
};

export type PriceCount = {
  __typename?: 'PriceCount';
  item: Scalars['Int']['output'];
};

/** Список доступных товаров */
export type Product = {
  __typename?: 'Product';
  _count: ProductCount;
  /** Псевдонимы через запятую */
  aliases?: Maybe<Scalars['String']['output']>;
  /** Атрибуты товаров */
  attributes?: Maybe<Array<AttributeValue>>;
  /** Вес брутто */
  brutto?: Maybe<Scalars['Decimal']['output']>;
  /** Дата создания продукта */
  createdAt: Scalars['DateTime']['output'];
  /** Идентификатор товара */
  id: Scalars['ID']['output'];
  /** Изображения товара */
  images?: Maybe<Array<File>>;
  /** Товары в заказах */
  item?: Maybe<Array<Item>>;
  /** Производитель */
  manufacturer?: Maybe<Scalars['String']['output']>;
  /** Название на английском */
  name_en?: Maybe<Scalars['String']['output']>;
  /** Название на польском */
  name_pl?: Maybe<Scalars['String']['output']>;
  /** Название на русском */
  name_ru?: Maybe<Scalars['String']['output']>;
  /** Вес нетто */
  netto?: Maybe<Scalars['Decimal']['output']>;
  /** Оригинальность товара */
  original: Scalars['Boolean']['output'];
  /** Цены на товар */
  prices?: Maybe<Array<Price>>;
  /** Товаров на складе */
  stock: Scalars['Int']['output'];
  /** Код ТН ВЭД */
  tnved?: Maybe<Scalars['String']['output']>;
  /** Дата последнего изменения продукта */
  updatedAt: Scalars['DateTime']['output'];
  /** Артикул */
  vendorCode: Scalars['String']['output'];
};

export type ProductCount = {
  __typename?: 'ProductCount';
  attributes: Scalars['Int']['output'];
  images: Scalars['Int']['output'];
  item: Scalars['Int']['output'];
  prices: Scalars['Int']['output'];
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

/** Модель статусов заказов */
export type Status = {
  __typename?: 'Status';
  /** Дата добавления статуса */
  createdAt: Scalars['DateTime']['output'];
  /** Идентификатор статуса */
  id: Scalars['ID']['output'];
  /** Заказ */
  order: Order;
  orderId: Scalars['Int']['output'];
  /** Статус */
  status: OrderStatus;
  /** Пользователь */
  user?: Maybe<User>;
  userId?: Maybe<Scalars['Int']['output']>;
};

/** Модель статусов товара в заказе */
export type StatusItem = {
  __typename?: 'StatusItem';
  /** Дата добавления статуса */
  createdAt: Scalars['DateTime']['output'];
  /** Идентификатор статуса */
  id: Scalars['ID']['output'];
  /** Товар */
  item: Item;
  itemId: Scalars['Int']['output'];
  /** Статус товара */
  status: ItemStatus;
  /** Пользователь */
  user?: Maybe<User>;
  userId?: Maybe<Scalars['Int']['output']>;
};

export type User = {
  __typename?: 'User';
  /** Флаг активности пользователя */
  active: Scalars['Boolean']['output'];
  /** Аватар пользователя */
  avatar?: Maybe<Scalars['String']['output']>;
  /** День рожденья */
  birthday?: Maybe<Scalars['DateTime']['output']>;
  comment?: Maybe<Array<Comment>>;
  commentItem?: Maybe<Array<CommentItem>>;
  /** Дата регистрации пользователя */
  createdAt: Scalars['DateTime']['output'];
  /** Email пользователя */
  email: Scalars['String']['output'];
  /** Мои файлы */
  files?: Maybe<Array<File>>;
  /** Имя */
  firstName: Scalars['String']['output'];
  /** Пол пользователя */
  gender: Gender;
  /** Идентификатор пользователя */
  id: Scalars['ID']['output'];
  item?: Maybe<Array<Item>>;
  /** Фамилия */
  lastName: Scalars['String']['output'];
  /** Заказы за которые пользователь отвечает */
  manageOrders?: Maybe<Array<Order>>;
  manager?: Maybe<User>;
  /** Идентификатор менеджера */
  managerId?: Maybe<Scalars['Int']['output']>;
  /** Мои заказы */
  orders?: Maybe<Array<Order>>;
  /** Отчество */
  patronymic?: Maybe<Scalars['String']['output']>;
  /** Номер телефона */
  phone?: Maybe<Scalars['String']['output']>;
  /** Роль пользователя */
  role: Role;
  status?: Maybe<Array<Status>>;
  statusItem?: Maybe<Array<StatusItem>>;
  /** Дата обновления */
  updatedAt: Scalars['DateTime']['output'];
  /** Логин пользователя */
  username: Scalars['String']['output'];
  users?: Maybe<Array<User>>;
};

export type UserAvgAggregate = {
  __typename?: 'UserAvgAggregate';
  id?: Maybe<Scalars['Float']['output']>;
  managerId?: Maybe<Scalars['Float']['output']>;
};

export type UserCountAggregate = {
  __typename?: 'UserCountAggregate';
  _all: Scalars['Int']['output'];
  active: Scalars['Int']['output'];
  avatar: Scalars['Int']['output'];
  birthday: Scalars['Int']['output'];
  createdAt: Scalars['Int']['output'];
  email: Scalars['Int']['output'];
  firstName: Scalars['Int']['output'];
  gender: Scalars['Int']['output'];
  id: Scalars['Int']['output'];
  lastName: Scalars['Int']['output'];
  managerId: Scalars['Int']['output'];
  patronymic: Scalars['Int']['output'];
  phone: Scalars['Int']['output'];
  role: Scalars['Int']['output'];
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
  active?: Maybe<Scalars['Boolean']['output']>;
  avatar?: Maybe<Scalars['String']['output']>;
  birthday?: Maybe<Scalars['DateTime']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  firstName?: Maybe<Scalars['String']['output']>;
  gender?: Maybe<Gender>;
  id?: Maybe<Scalars['Int']['output']>;
  lastName?: Maybe<Scalars['String']['output']>;
  managerId?: Maybe<Scalars['Int']['output']>;
  patronymic?: Maybe<Scalars['String']['output']>;
  phone?: Maybe<Scalars['String']['output']>;
  role?: Maybe<Role>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  username?: Maybe<Scalars['String']['output']>;
};

export type UserMinAggregate = {
  __typename?: 'UserMinAggregate';
  active?: Maybe<Scalars['Boolean']['output']>;
  avatar?: Maybe<Scalars['String']['output']>;
  birthday?: Maybe<Scalars['DateTime']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  firstName?: Maybe<Scalars['String']['output']>;
  gender?: Maybe<Gender>;
  id?: Maybe<Scalars['Int']['output']>;
  lastName?: Maybe<Scalars['String']['output']>;
  managerId?: Maybe<Scalars['Int']['output']>;
  patronymic?: Maybe<Scalars['String']['output']>;
  phone?: Maybe<Scalars['String']['output']>;
  role?: Maybe<Role>;
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

export type UserSumAggregate = {
  __typename?: 'UserSumAggregate';
  id?: Maybe<Scalars['Int']['output']>;
  managerId?: Maybe<Scalars['Int']['output']>;
};

export type UserFieldsFragment = { __typename: 'User', id: string, username: string, avatar?: string | null, email: string, lastName: string, firstName: string, patronymic?: string | null, birthday?: any | null, role: Role, gender: Gender, createdAt: any };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me: { __typename: 'User', id: string, username: string, avatar?: string | null, email: string, lastName: string, firstName: string, patronymic?: string | null, birthday?: any | null, role: Role, gender: Gender, createdAt: any } };
