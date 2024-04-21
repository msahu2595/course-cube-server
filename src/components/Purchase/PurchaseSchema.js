const gql = require("graphql-tag");

const PurchaseSchema = gql`
  union PurchaseItem = Bundle | Content

  enum PurchaseItemType {
    Bundle
    Content
  }

  enum PurchaseStatus {
    CREATED
    # AUTHENTICATED
    ACTIVE
    # PENDING
    HALTED
    CANCELLED
    PAID
  }

  enum PurchaseMode {
    UPI
    UPI_INTENT
    CREDIT_CARD
    DEBIT_CARD
    NET_BANKING
    EMI
  }

  extend type Query {
    purchases(
      offset: Int
      limit: Int
      filter: PurchasesFilterInput
    ): PurchaseListResponse
    purchasedUsers(
      offset: Int
      limit: Int
      itemId: ID!
    ): PurchasedUserListResponse
    purchase(purchaseId: ID!): PurchaseResponse
    purchaseStatus(orderId: String!): PurchaseStatusResponse
  }

  input PurchasesFilterInput {
    userId: ID
    type: PurchaseItemType
    status: PurchaseStatus
  }

  type PurchasesFilterType {
    userId: ID
    type: PurchaseItemType
    status: PurchaseStatus
  }

  extend type Mutation {
    initiateTransaction(
      transactionInput: TransactionInput!
    ): TransactionResponse
    updateTransaction(
      orderId: String!
      transactionInput: TransactionUpdateInput!
    ): TransactionUpdateResponse
    cancelledTransaction(orderId: String!): TransactionUpdateResponse
    processTransaction(
      orderId: String!
      transactionInput: TransactionProcessInput!
    ): PurchaseResponse
  }

  input TransactionInput {
    itemId: ID!
    type: PurchaseItemType!
    txnAmount: NonNegativeInt!
    # promoCode: string
  }

  input TransactionUpdateInput {
    paymentMode: PurchaseMode!
    paymentApp: String
    paymentVPA: String
  }

  input TransactionProcessInput {
    txnId: String!
    txnInfo: JSON
  }

  type Purchase {
    _id: ID!
    #
    user: User
    item: PurchaseItem
    type: PurchaseItemType!
    #
    subject: String!
    title: String!
    price: NonNegativeInt!
    offer: NonNegativeInt
    offerType: OfferType
    # promoCode: string // TODO
    # promoAmount: NonNegativeInt
    # promoType: OfferType
    validTill: String!
    #
    orderId: String!
    status: PurchaseStatus!
    txnAmount: NonNegativeInt!
    txnNote: String!
    #
    txnId: String
    txnInfo: JSON
    #
    paymentMode: PurchaseMode
    paymentApp: String
    paymentVPA: String
    #
    createdAt: String!
    updatedAt: String!
  }

  type Transaction {
    orderId: String!
    status: PurchaseStatus!
    txnAmount: NonNegativeInt!
    txnNote: String!
    #
    payeeVPA: String!
    payeeName: String!
    payeeMerchantCode: NonNegativeInt # 8299: Schools and Educational Services (Not Elsewhere Classified)
  }

  type PurchaseListResponse implements ListResponse {
    code: String!
    success: Boolean!
    message: String!
    token: JWT
    offset: Int!
    limit: Int!
    filter: PurchasesFilterType
    payload: [Purchase]
  }

  type PurchasedUserListResponse implements ListResponse {
    code: String!
    success: Boolean!
    message: String!
    token: JWT
    offset: Int!
    limit: Int!
    itemId: ID!
    payload: [Purchase]
  }

  type PurchaseResponse implements Response {
    code: String!
    success: Boolean!
    message: String!
    token: JWT
    payload: Purchase
  }

  type PurchaseStatusResponse implements Response {
    code: String!
    success: Boolean!
    message: String!
    token: JWT
    payload: PurchaseStatus
  }

  type TransactionResponse implements Response {
    code: String!
    success: Boolean!
    message: String!
    token: JWT
    txnToken: String! # This is the unique transaction token received in the response of Initiate Transaction & It is valid for 15 minutes.
    payload: Transaction
  }

  type TransactionUpdateResponse implements Response {
    code: String!
    success: Boolean!
    message: String!
    token: JWT
  }
`;

module.exports = PurchaseSchema;
