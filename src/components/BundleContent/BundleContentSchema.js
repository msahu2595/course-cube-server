const gql = require("graphql-tag");

const BundleContentSchema = gql`
  extend type Query {
    bundleContents(
      offset: Int
      limit: Int
      bundleId: ID!
      filter: BundleContentsFilterInput
    ): BundleContentListResponse
    bundleContent(bundleContentId: ID!): BundleContentResponse
  }

  input BundleContentsFilterInput {
    subjectId: ID
    type: MediaType
    language: LanguageType
    visible: Boolean
    enable: Boolean
  }

  type BundleContentsFilterType {
    subjectId: ID
    type: MediaType
    language: LanguageType
    visible: Boolean
    enable: Boolean
  }

  extend type Mutation {
    addBundleContent(
      bundleId: ID!
      bundleContentInput: BundleContentInput!
    ): BundleContentResponse
    editBundleContent(
      bundleId: ID!
      bundleContentId: ID!
      bundleContentInput: BundleContentEditInput!
    ): BundleContentResponse
    deleteBundleContent(bundleContentId: ID!): BundleContentResponse
  }

  input BundleContentInput {
    subjectId: ID
    subject: String!
    image: String!
    title: String!
    media: ID!
    type: MediaType!
    highlight: String
    instructors: [String!]
    language: LanguageType!
    index: String
    description: String!
    visible: Boolean
  }

  input BundleContentEditInput {
    subjectId: ID
    subject: String
    image: String
    title: String
    media: ID!
    type: MediaType!
    highlight: String
    instructors: [String!]
    language: LanguageType
    index: String
    description: String
    visible: Boolean
  }

  type BundleContent {
    _id: ID!
    # Used for filter
    subjectId: ID
    subject: String!
    # General fields
    image: String!
    title: String!
    media: Media
    type: MediaType!
    highlight: String
    instructors: [String!]
    language: LanguageType!
    index: String
    description: String!
    visible: Boolean!
    enable: Boolean!
    createdAt: String!
    updatedAt: String!
    # Populate fields
    bundle: Bundle
    likes: NonNegativeInt
    liked: NonNegativeInt
    views: NonNegativeInt
    purchased: NonNegativeInt
    bookmarked: NonNegativeInt
  }

  type BundleContentListResponse implements ListResponse {
    code: String!
    success: Boolean!
    message: String!
    token: JWT
    offset: Int!
    limit: Int!
    bundleId: ID!
    filter: BundleContentsFilterType
    payload: [BundleContent]
  }

  type BundleContentResponse implements Response {
    code: String!
    success: Boolean!
    message: String!
    token: JWT
    payload: BundleContent
  }
`;

module.exports = BundleContentSchema;
