const gql = require("graphql-tag");

const LikeSchema = gql`
  enum LikeType {
    UP
    DOWN
  }

  extend type Query {
    likedUsers(
      limit: Int
      offset: Int
      refId: ID!
      filter: LikesFilterInput
    ): LikeListResponse
  }

  input LikesFilterInput {
    type: LikeType
  }

  type LikesFilterType {
    type: LikeType
  }

  extend type Mutation {
    like(refId: ID!, type: LikeType): LikeResponse
    unlike(refId: ID!): LikeResponse
  }

  type Like {
    _id: ID!
    refId: ID!
    user: User
    type: LikeType!
    createdAt: String!
    updatedAt: String!
  }

  type LikeListResponse implements ListResponse {
    code: String!
    success: Boolean!
    message: String!
    token: JWT
    offset: Int!
    limit: Int!
    refId: ID!
    filter: LikesFilterType
    payload: [Like]
  }

  type LikeResponse implements Response {
    code: String!
    success: Boolean!
    message: String!
    token: JWT
  }
`;

module.exports = LikeSchema;
