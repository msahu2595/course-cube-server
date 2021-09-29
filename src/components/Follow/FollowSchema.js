const { gql } = require("apollo-server");

const FollowSchema = gql`
  # extend type Query {
  #   account(_id: ID!): Account
  # }

  extend type Mutation {
    follow(followingId: ID!): FollowMutationResponse
  }

  type Follow {
    _id: ID!
    followerId: ID!
    followingId: ID!
    active: Boolean!
    createdAt: String!
    updatedAt: String!
  }

  type FollowMutationResponse implements MutationResponse {
    code: String!
    success: Boolean!
    message: String!
    follow: Follow
  }
`;

module.exports = FollowSchema;
