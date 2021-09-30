const { gql } = require("apollo-server");

const FollowSchema = gql`
  extend type Query {
    followerList(limit: Int, offset: Int, accountId: ID): FollowerListResponse
    followingList(limit: Int, offset: Int, accountId: ID): FollowingListResponse
  }

  extend type Mutation {
    follow(followingId: ID!): FollowResponse
    unFollow(followingId: ID!): FollowResponse
  }

  type Follow {
    _id: ID!
    follower: Account
    following: Account
    active: Boolean!
    createdAt: String!
    updatedAt: String!
  }

  type FollowerListResponse implements ListResponse {
    code: String!
    success: Boolean!
    message: String!
    limit: Int!
    offset: Int!
    followers: [Follow]
  }

  type FollowingListResponse implements ListResponse {
    code: String!
    success: Boolean!
    message: String!
    limit: Int!
    offset: Int!
    followings: [Follow]
  }

  type FollowResponse implements Response {
    code: String!
    success: Boolean!
    message: String!
    follow: Follow
  }
`;

module.exports = FollowSchema;
