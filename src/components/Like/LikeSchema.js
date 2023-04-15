const gql = require("graphql-tag");

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
    refId: ID!
    user: User
    createdAt: String!
    updatedAt: String!
  }

  type LikeListResponse implements ListResponse {
    code: String!
    success: Boolean!
    message: String!
    token: JWT
    limit: Int!
    offset: Int!
    refId: ID!
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
