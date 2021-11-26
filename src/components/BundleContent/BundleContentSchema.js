const { gql } = require("apollo-server");

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
    value: String
    type: MediaType
    visible: Boolean
    enable: Boolean
  }

  type BundleContentsFilterType {
    value: String
    type: MediaType
    visible: Boolean
    enable: Boolean
  }

  extend type Mutation {
    addBundleContent(
      bundleId: ID!
      bundleContentInput: BundleContentInput!
    ): BundleContentResponse
    editBundleContent(
      bundleContentId: ID!
      bundleContentInput: BundleContentInput!
    ): BundleContentResponse
    deleteBundleContent(bundleContentId: ID!): BundleContentResponse
  }

  input BundleContentInput {
    subject: String!
    value: String
    image: URL!
    title: String!
    media: ID!
    type: MediaType!
    description: String!
    visible: Boolean
  }

  type BundleContent {
    _id: ID!
    # Used for filter
    subject: String!
    # General fields
    bundle: Bundle!
    value: String
    image: URL!
    title: String!
    media: Media
    type: MediaType!
    description: String!
    visible: Boolean!
    enable: Boolean!
    createdAt: String!
    updatedAt: String!
    # Populate fields
    purchased: NonNegativeInt
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
