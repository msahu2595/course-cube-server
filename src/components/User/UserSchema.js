const { gql } = require("apollo-server");

const UserSchema = gql`
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
    user(userId: ID): UserResponse
  }

  type Mutation {
    logIn(
      firstName: String!
      lastName: String!
      email: EmailAddress!
      password: Password!
      acceptTnC: Boolean!
    ): UserResponse
    assignRole(userId: ID!, role: Role!): UserResponse
  }

  type User {
    _id: ID!
    email: EmailAddress!
    password: Void
    image: URL
    firstName: String! @capitalize
    lastName: String! @capitalize
    acceptTnC: Boolean!
    role: Role
    followers: Int
    followings: Int
    createdAt: String!
    updatedAt: String!
  }

  enum Role {
    USER
    ADMIN
  }

  type UserResponse implements Response {
    code: String!
    success: Boolean!
    message: String!
    payload: User
  }
`;

module.exports = UserSchema;
