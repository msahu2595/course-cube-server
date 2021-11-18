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
    statistics(userId: ID): UserStatisticsResponse
    leaderboard(limit: Int, offset: Int): UserListResponse
  }

  type Mutation {
    googleLogIn(token: String!): UserResponse
    # appleLogIn(token: String!): UserResponse
    assignRole(userId: ID!, role: Role!): UserResponse
  }

  type User {
    _id: ID!
    email: EmailAddress!
    emailVerified: Boolean!
    mobile: PhoneNumber
    mobileVerified: Boolean!
    fullName: String @capitalize
    picture: URL
    gender: Gender
    about: String
    education: String
    workAt: String
    workAs: String
    facebook: String
    instagram: String
    twitter: String
    linkedin: String
    pincode: PostalCode
    country: String
    state: String
    district: String
    cityVillage: String
    area: String
    street: String
    landmark: String
    acceptTnC: Boolean!
    role: Role!
    followers: Int
    followings: Int
    history: Int
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  enum Gender {
    MALE
    FEMALE
    THIRD
  }

  enum Role {
    USER
    ADMIN
  }

  type UserStatistics {
    _id: ID!
    videos: NonNegativeInt
    tests: NonNegativeInt
    documents: NonNegativeInt
    questions: NonNegativeInt
  }

  type UserListResponse implements ListResponse {
    code: String!
    success: Boolean!
    message: String!
    limit: Int!
    offset: Int!
    payload: [User!]
  }

  type UserResponse implements Response {
    code: String!
    success: Boolean!
    message: String!
    payload: User
  }

  type UserStatisticsResponse implements Response {
    code: String!
    success: Boolean!
    message: String!
    payload: UserStatistics
  }
`;

module.exports = UserSchema;
