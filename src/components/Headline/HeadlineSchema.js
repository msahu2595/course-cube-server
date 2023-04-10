const gql = require("graphql-tag");

const HeadlineSchema = gql`
  extend type Query {
    headlines(
      offset: Int
      limit: Int
      search: String
      filter: HeadlinesFilterInput
    ): HeadlineListResponse
  }

  input HeadlinesFilterInput {
    enable: Boolean
  }

  type HeadlinesFilterType {
    enable: Boolean
  }

  extend type Mutation {
    createHeadline(headlineInput: HeadlineInput!): HeadlineResponse
    editHeadline(
      headlineId: ID!
      headlineInput: HeadlineInput!
    ): HeadlineResponse
    deleteHeadline(headlineId: ID!): HeadlineResponse
  }

  input HeadlineInput {
    image: URL
    description: String!
    link: URL
    route: String
    params: JSONObject
  }

  type Headline {
    _id: ID!
    image: URL
    description: String!
    link: URL
    route: String
    params: JSONObject
    enable: Boolean!
    createdAt: String!
    updatedAt: String!
  }

  type HeadlineListResponse implements ListResponse {
    code: String!
    success: Boolean!
    message: String!
    token: JWT
    offset: Int!
    limit: Int!
    search: String
    filter: HeadlinesFilterType
    payload: [Headline]
  }

  type HeadlineResponse implements Response {
    code: String!
    success: Boolean!
    message: String!
    token: JWT
    payload: Headline
  }
`;

module.exports = HeadlineSchema;
