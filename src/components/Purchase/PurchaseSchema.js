const gql = require("graphql-tag");

const PurchaseSchema = gql`
  enum PurchaseContentType {
    COURSE
    VIDEO
    TEST
    DOCUMENT
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
      refId: ID!
    ): PurchasedUserListResponse
  }

  input PurchasesFilterInput {
    userId: ID
    type: PurchaseContentType
  }

  type PurchasesFilterType {
    userId: ID
    type: PurchaseContentType
  }

  extend type Mutation {
    createPurchase(purchaseInput: PurchaseInput): PurchaseResponse
  }

  input PurchaseInput {
    refId: ID!
    type: PurchaseContentType!
    image: URL!
    subject: String!
    title: String!
    price: NonNegativeInt
    offer: NonNegativeInt
    offerType: OfferType
    validity: Date!
    orderId: String
  }

  type Purchase {
    _id: ID!
    user: User
    refId: ID!
    type: PurchaseContentType!
    image: URL!
    subject: String!
    title: String!
    price: NonNegativeInt
    offer: NonNegativeInt
    offerType: OfferType
    validity: Date!
    status: PurchaseStatus
    orderIds: [String]
    paymentIds: [String]
    subscriptionId: String
    response: JSON
    course: Course
    video: Video
    test: Test
    document: Document
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
    refId: ID!
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
