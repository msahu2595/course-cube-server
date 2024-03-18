const gql = require("graphql-tag");

const BundleSchema = gql`
  enum OfferType {
    PERCENT
    AMOUNT
  }

  enum LanguageType {
    HI
    EN
  }

  enum BundleType {
    FULL_COURSE
    SUBJECT_COURSE
    PLAYLIST_COURSE
  }

  extend type Query {
    bundles(
      offset: Int
      limit: Int
      search: String
      filter: BundlesFilterInput
    ): BundleListResponse
    bundle(bundleId: ID!): BundleResponse
    bundleSyllabus(bundleId: ID!): SyllabusResponse
  }

  input BundlesFilterInput {
    paid: Boolean
    type: BundleType
    language: LanguageType
    visible: Boolean
    enable: Boolean
  }

  type BundlesFilterType {
    paid: Boolean
    type: BundleType
    language: LanguageType
    visible: Boolean
    enable: Boolean
  }

  extend type Mutation {
    addBundle(bundleInput: BundleInput!): BundleResponse
    editBundle(bundleId: ID!, bundleInput: BundleEditInput!): BundleResponse
    deleteBundle(bundleId: ID!): BundleResponse
  }

  input BundleInput {
    categories: [String!]
    exams: [String!]
    tags: [String!]
    subject: String!
    image: String!
    title: String!
    type: BundleType!
    paid: Boolean!
    price: NonNegativeInt
    offer: NonNegativeInt
    offerType: OfferType
    highlight: String
    instructors: [String!]
    language: LanguageType!
    index: String
    description: String!
    validity: Duration
    visible: Boolean
  }

  input BundleEditInput {
    categories: [String!]
    exams: [String!]
    tags: [String!]
    subject: String
    image: String
    title: String
    type: BundleType!
    paid: Boolean
    price: NonNegativeInt
    offer: NonNegativeInt
    offerType: OfferType
    highlight: String
    instructors: [String!]
    language: LanguageType
    index: String
    description: String
    validity: Duration
    visible: Boolean
  }

  type Bundle {
    _id: ID!
    # Used for filter
    categories: [String!]
    exams: [String!]
    tags: [String!]
    subject: String!
    # General fields
    image: String!
    title: String!
    type: BundleType!
    paid: Boolean!
    price: NonNegativeInt
    offer: NonNegativeInt
    offerType: OfferType
    highlight: String
    instructors: [String!]
    language: LanguageType!
    index: String
    description: String!
    validity: Duration!
    visible: Boolean!
    enable: Boolean!
    createdAt: String!
    updatedAt: String!
    # Populate fields
    likes: NonNegativeInt
    liked: NonNegativeInt
    purchases: NonNegativeInt
    purchased: NonNegativeInt
    bookmarked: NonNegativeInt
  }

  type BundleListResponse implements ListResponse {
    code: String!
    success: Boolean!
    message: String!
    token: JWT
    offset: Int!
    limit: Int!
    search: String
    filter: BundlesFilterType
    payload: [Bundle]
  }

  type BundleResponse implements Response {
    code: String!
    success: Boolean!
    message: String!
    token: JWT
    payload: Bundle
  }

  type SyllabusResponse implements Response {
    code: String!
    success: Boolean!
    message: String!
    token: JWT
    payload: JSON
  }
`;

module.exports = BundleSchema;
