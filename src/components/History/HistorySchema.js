const gql = require("graphql-tag");

const HistorySchema = gql`
  enum HistoryType {
    BundleContent
    Content
    Article
    Question
  }

  enum HistorySubType {
    Video
    Test
    Document
  }

  extend type Query {
    history(
      limit: Int
      offset: Int
      filter: HistoryFilterInput
    ): HistoryListResponse
    historyUsers(limit: Int, offset: Int, refId: ID!): HistoryUserListResponse
  }

  extend type Mutation {
    addHistory(
      refId: ID!
      type: HistoryType!
      subType: HistorySubType
    ): HistoryResponse
    removeHistory(refId: ID!): HistoryResponse
  }

  input HistoryFilterInput {
    userId: ID
    type: HistoryType
    subType: HistorySubType
  }

  type HistoryFilterType {
    userId: ID
    type: HistoryType
    subType: HistorySubType
  }

  type History {
    _id: ID!
    user: User
    ref: Ref
    type: HistoryType!
    subType: HistorySubType
    visible: Boolean!
    createdAt: String!
    updatedAt: String!
  }

  type HistoryListResponse implements ListResponse {
    code: String!
    success: Boolean!
    message: String!
    token: JWT
    limit: Int!
    offset: Int!
    filter: HistoryFilterType
    payload: [History]
  }

  type HistoryUserListResponse implements ListResponse {
    code: String!
    success: Boolean!
    message: String!
    token: JWT
    limit: Int!
    offset: Int!
    refId: ID!
    payload: [History]
  }

  type HistoryResponse implements Response {
    code: String!
    success: Boolean!
    message: String!
    token: JWT
  }
`;

module.exports = HistorySchema;
