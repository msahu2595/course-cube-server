const gql = require("graphql-tag");

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
    users(
      offset: Int
      limit: Int
      search: String
      filter: UsersFilterInput
    ): UserListResponse
    user(userId: ID): UserResponse
    statistics(userId: ID): UserStatisticsResponse
    weeklyLeaderboard(limit: Int, offset: Int): UserListResponse
    monthlyLeaderboard(limit: Int, offset: Int): UserListResponse
  }

  input UsersFilterInput {
    role: Role
    gender: Gender
    platform: Platform
  }

  type Mutation {
    googleLogIn(
      idToken: String!
      acceptTnC: Boolean!
      FCMToken: String
      webLogin: Boolean
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
    fullName: String
    gender: Gender
    picture: URL
    # Info
    about: String
    education: String
    workAt: String
    workAs: String
    facebook: String
    instagram: String
    twitter: String
    linkedin: String
    # Address
    pincode: PostalCode
    country: String
    state: String
    district: String
    cityVillage: String
    area: String
    street: String
    landmark: String
    # Other
    role: Role!
    FCMToken: Void
    platform: Platform
    acceptTnC: Boolean!
    createdAt: String!
    updatedAt: String!
    # Populate fields
    followers: NonNegativeInt
    followings: NonNegativeInt
    activities: NonNegativeInt
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
    articles: NonNegativeInt
  }

  type UserListResponse implements ListResponse {
    code: String!
    success: Boolean!
    message: String!
    token: JWT
    limit: Int!
    offset: Int!
    payload: [User]
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
