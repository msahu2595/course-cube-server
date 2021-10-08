const { gql } = require("apollo-server");

const VoteSchema = gql`
  extend type Query {
    voters(limit: Int, offset: Int, refId: ID!): VoteListResponse
  }

  extend type Mutation {
    vote(refId: ID!): VoteResponse
    unVote(refId: ID!): VoteResponse
  }

  type Vote {
    _id: ID!
    user: User
    refId: ID!
    active: Boolean!
    createdAt: String!
    updatedAt: String!
  }

  type VoteListResponse implements ListResponse {
    code: String!
    success: Boolean!
    message: String!
    limit: Int!
    offset: Int!
    refId: ID!
    payload: [Vote]
  }

  type VoteResponse implements Response {
    code: String!
    success: Boolean!
    message: String!
    payload: Vote
  }
`;

module.exports = VoteSchema;
