const { gql } = require("apollo-server");

const AccountSchema = gql`
  interface MutationResponse {
    code: String!
    success: Boolean!
    message: String!
  }

  type Query {
    account(_id: ID!): Account
  }

  type Mutation {
    accountCreate(
      firstName: String!
      lastName: String!
      email: EmailAddress!
      password: Password!
      acceptTnC: Boolean!
    ): AccountMutationResponse
  }

  type Account {
    _id: ID!
    firstName: String! @upper
    lastName: String! @upper
    email: EmailAddress!
    password: Void
    acceptTnC: Boolean!
    createdAt: String!
    updatedAt: String!
  }

  type AccountMutationResponse implements MutationResponse {
    code: String!
    success: Boolean!
    message: String!
    account: Account
  }
`;

module.exports = AccountSchema;
