const { gql } = require("apollo-server");

const HistorySchema = gql`
  enum HistoryType {
    VIDEO
    TEST
    DOCUMENT
    QUESTION
  }

  extend type Query {
    history(
      limit: Int
      offset: Int
      filter: HistoryFilterInput
    ): HistoryListResponse
    historyUsers(limit: Int, offset: Int, refId: ID!): HistoryUserListResponse
  }

  input HistoryFilterInput {
    userId: ID
    type: HistoryType
  }

  type HistoryFilterType {
    userId: ID
    type: HistoryType
  }

  extend type Mutation {
    addHistory(refId: ID!, type: HistoryType!): HistoryResponse
    removeHistory(historyId: ID!): HistoryResponse
  }

  type History {
    _id: ID!
    user: User
    refId: ID!
    type: HistoryType!
    visible: Boolean!
    createdAt: String!
    updatedAt: String!
  }

  type HistoryListResponse implements ListResponse {
    code: String!
    success: Boolean!
    message: String!
    token: String
    limit: Int!
    offset: Int!
    filter: HistoryFilterType
    payload: [History]
  }

  type HistoryUserListResponse implements ListResponse {
    code: String!
    success: Boolean!
    message: String!
    token: String
    limit: Int!
    offset: Int!
    refId: ID!
    payload: [History]
  }

  type HistoryResponse implements Response {
    code: String!
    success: Boolean!
    message: String!
    token: String
    payload: History
  }
`;

module.exports = HistorySchema;
