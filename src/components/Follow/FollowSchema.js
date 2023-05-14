const gql = require("graphql-tag");

const FollowSchema = gql`
  extend type Query {
    followerList(limit: Int, offset: Int, userId: ID): FollowListResponse
    followingList(limit: Int, offset: Int, userId: ID): FollowListResponse
  }

  extend type Mutation {
    follow(followingId: ID!): FollowResponse
    unFollow(followingId: ID!): FollowResponse
  }

  type Follow {
    _id: ID!
    follower: User
    following: User
    createdAt: String!
    updatedAt: String!
  }

  type FollowListResponse implements ListResponse {
    code: String!
    success: Boolean!
    message: String!
    token: JWT
    limit: Int!
    offset: Int!
    payload: [Follow]
  }

  type FollowResponse implements Response {
    code: String!
    success: Boolean!
    message: String!
    token: JWT
  }
`;

module.exports = FollowSchema;
