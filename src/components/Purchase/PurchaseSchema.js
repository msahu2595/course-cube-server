const gql = require("graphql-tag");

const PurchaseSchema = gql`
  union Item = Bundle | Content

  enum ItemType {
    Bundle
    Content
  }

  enum PurchaseStatus {
    CREATED
    AUTHENTICATED
    ACTIVE
    PENDING
    HALTED
    CANCELLED
    PAID
  }

  extend type Query {
    purchases(
      limit: Int
      offset: Int
      filter: PurchasesFilterInput
    ): PurchaseListResponse
    purchasedUsers(
      limit: Int
      offset: Int
      item: ID!
    ): PurchasedUserListResponse
  }

  input PurchasesFilterInput {
    userId: ID
    type: ItemType
  }

  type PurchasesFilterType {
    userId: ID
    type: ItemType
  }

  extend type Mutation {
    createPurchase(purchaseInput: PurchaseInput): PurchaseResponse
  }

  input PurchaseInput {
    item: ID!
    type: ItemType!
    image: URL!
    subject: String!
    title: String!
    price: NonNegativeInt
    offer: NonNegativeInt
    offerType: OfferType
    validity: Duration
    orderId: String
  }

  type Purchase {
    _id: ID!
    user: User
    item: Item
    type: ItemType!
    image: URL!
    subject: String!
    title: String!
    price: NonNegativeInt
    offer: NonNegativeInt
    offerType: OfferType
    validity: Duration
    status: PurchaseStatus
    orderIds: [String]
    paymentIds: [String]
    subscriptionId: String
    response: JSON
    createdAt: String!
    updatedAt: String!
  }

  type PurchaseListResponse implements ListResponse {
    code: String!
    success: Boolean!
    message: String!
    token: JWT
    limit: Int!
    offset: Int!
    filter: PurchasesFilterType
    payload: [Purchase]
  }

  type PurchasedUserListResponse implements ListResponse {
    code: String!
    success: Boolean!
    message: String!
    token: JWT
    limit: Int!
    offset: Int!
    item: ID!
    payload: [Purchase]
  }

  type PurchaseResponse implements Response {
    code: String!
    success: Boolean!
    message: String!
    token: JWT
    payload: Purchase
  }
`;

module.exports = PurchaseSchema;
