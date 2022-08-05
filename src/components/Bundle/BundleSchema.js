const { gql } = require("apollo-server");

const BundleSchema = gql`
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
  }

  input BundlesFilterInput {
    paid: Boolean
    language: LanguageType
    type: BundleType
    visible: Boolean
    enable: Boolean
  }

  type BundlesFilterType {
    paid: Boolean
    language: LanguageType
    type: BundleType
    visible: Boolean
    enable: Boolean
  }

  extend type Mutation {
    addBundle(bundleInput: BundleInput!): BundleResponse
    editBundle(bundleId: ID!, bundleInput: BundleInput!): BundleResponse
    deleteBundle(bundleId: ID!): BundleResponse
  }

  input BundleInput {
    categories: [String!]
    exams: [String!]
    tags: [String!]
    subject: String
    image: URL!
    title: String!
    syllabus: [SyllabusInput]
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

  input SyllabusInput {
    name: String!
    value: ID
    items: [SyllabusInput]
  }

  type Bundle {
    _id: ID!
    # Used for filter
    categories: [String!]
    exams: [String!]
    tags: [String!]
    subject: String
    # General fields
    image: URL!
    title: String!
    syllabus: JSON
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
    purchases: NonNegativeInt
    purchased: NonNegativeInt
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
`;

module.exports = BundleSchema;
