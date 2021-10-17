const { gql } = require("apollo-server");

const LikeSchema = gql`
  extend type Query {
    likedUsers(limit: Int, offset: Int, refId: ID!): LikeListResponse
  }

  extend type Mutation {
    like(refId: ID!): LikeResponse
    unlike(refId: ID!): LikeResponse
  }

  type Like {
    _id: ID!
    user: User
    refId: ID!
    active: Boolean!
    createdAt: String!
    updatedAt: String!
  }

  type LikeListResponse implements ListResponse {
    code: String!
    success: Boolean!
    message: String!
    limit: Int!
    offset: Int!
    refId: ID!
    payload: [Like]
  }

  type LikeResponse implements Response {
    code: String!
    success: Boolean!
    message: String!
    payload: Like
  }
`;

module.exports = LikeSchema;
