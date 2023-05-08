const gql = require("graphql-tag");

const ViewSchema = gql`
  extend type Query {
    viewedUsers(limit: Int, offset: Int, refId: ID!): ViewListResponse
  }

  extend type Mutation {
    addView(refId: ID!): ViewResponse
  }

  type View {
    _id: ID!
    refId: ID!
    user: User
    createdAt: String!
    updatedAt: String!
  }

  type ViewListResponse implements ListResponse {
    code: String!
    success: Boolean!
    message: String!
    token: JWT
    limit: Int!
    offset: Int!
    refId: ID!
    payload: [View]
  }

  type ViewResponse implements Response {
    code: String!
    success: Boolean!
    message: String!
    token: JWT
  }
`;

module.exports = ViewSchema;
