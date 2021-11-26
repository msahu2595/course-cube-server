const { gql } = require("apollo-server");

const UserSchema = gql`
  interface ListResponse {
    code: String!
    success: Boolean!
    message: String!
    token: JWT
    limit: Int!
    offset: Int!
  }

  interface Response {
    code: String!
    success: Boolean!
    message: String!
    token: JWT
  }

  type Query {
    user(userId: ID): UserResponse
    statistics(userId: ID): UserStatisticsResponse
    leaderboard(limit: Int, offset: Int): UserListResponse
  }

  type Mutation {
    googleLogIn(
      idToken: String!
      acceptTnC: Boolean!
      FCMToken: String
    ): UserResponse
    # appleLogIn(idToken: String!, acceptTnC: Boolean!, FCMToken: String): UserResponse
    editProfile(userInput: UserInput!): UserResponse
    assignRole(userId: ID!, role: Role!): UserResponse
    logout: UserResponse
  }

  input UserInput {
    phoneNumber: PhoneNumber
    fullName: String
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
    FCMToken: String
  }

  type User {
    _id: ID!
    email: EmailAddress!
    emailVerified: Boolean!
    phoneNumber: PhoneNumber
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
    FCMToken: String
    platform: Platform
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

  enum Platform {
    android
    ios
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
    token: JWT
    limit: Int!
    offset: Int!
    payload: [User!]
  }

  type UserResponse implements Response {
    code: String!
    success: Boolean!
    message: String!
    token: JWT
    refresh: JWT
    payload: User
  }

  type UserStatisticsResponse implements Response {
    code: String!
    success: Boolean!
    message: String!
    token: JWT
    payload: UserStatistics
  }
`;

module.exports = UserSchema;
