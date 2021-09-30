const { gql } = require("apollo-server");

const AccountSchema = gql`
  interface ListResponse {
    code: String!
    success: Boolean!
    message: String!
    limit: Int!
    offset: Int!
  }

  interface Response {
    code: String!
    success: Boolean!
    message: String!
  }

  type Query {
    account(accountId: ID): AccountResponse
  }

  type Mutation {
    accountCreate(
      firstName: String!
      lastName: String!
      email: EmailAddress!
      password: Password!
      acceptTnC: Boolean!
    ): AccountResponse
  }

  type Account {
    _id: ID!
    firstName: String! @capitalize
    lastName: String! @capitalize
    email: EmailAddress!
    password: Void
    followers: Int
    followings: Int
    acceptTnC: Boolean!
    createdAt: String!
    updatedAt: String!
  }

  type AccountResponse implements Response {
    code: String!
    success: Boolean!
    message: String!
    account: Account
  }
`;

module.exports = AccountSchema;
