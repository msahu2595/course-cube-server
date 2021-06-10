const { gql } = require("apollo-server");

const AccountSchema = gql`
  type Query {
    account(_id: ID!): Account
  }

  type Mutation {
    accountCreate(email: String!, password: String!): Account
  }

  type Account {
    _id: ID!
    email: String! @upper
    password: String!
    createdAt: String!
    updatedAt: String!
  }
`;

module.exports = AccountSchema;
