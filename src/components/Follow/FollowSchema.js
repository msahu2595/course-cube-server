const gql = require("graphql-tag");

const FollowSchema = gql`
  extend type Query {
    followerList(limit: Int, offset: Int, userId: ID): FollowerListResponse
    followingList(limit: Int, offset: Int, userId: ID): FollowingListResponse
  }

  extend type Mutation {
    follow(followingId: ID!): FollowResponse
    unFollow(followingId: ID!): FollowResponse
  }

  type Follow {
    _id: ID!
    follower: User
    following: User
    active: Boolean!
    createdAt: String!
    updatedAt: String!
  }

  type FollowerListResponse implements ListResponse {
    code: String!
    success: Boolean!
    message: String!
    token: JWT
    limit: Int!
    offset: Int!
    payload: [Follow]
  }

  type FollowingListResponse implements ListResponse {
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
    payload: Follow
  }
`;

module.exports = FollowSchema;
