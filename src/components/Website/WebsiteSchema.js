const gql = require("graphql-tag");

const WebsiteSchema = gql`
  extend type Query {
    websites(
      offset: Int
      limit: Int
      search: String
      filter: WebsitesFilterInput
    ): WebsiteListResponse
  }

  input WebsitesFilterInput {
    enable: Boolean
  }

  type WebsitesFilterType {
    enable: Boolean
  }

  extend type Mutation {
    addWebsite(websiteInput: WebsiteInput!): WebsiteResponse
    editWebsite(websiteId: ID!, websiteInput: WebsiteInput!): WebsiteResponse
    deleteWebsite(websiteId: ID!): WebsiteResponse
  }

  input WebsiteInput {
    name: String!
    link: URL!
  }

  type Website {
    _id: ID!
    name: String!
    link: URL!
    enable: Boolean!
    createdAt: String!
    updatedAt: String!
  }

  type WebsiteListResponse implements ListResponse {
    code: String!
    success: Boolean!
    message: String!
    token: JWT
    offset: Int!
    limit: Int!
    search: String
    filter: WebsitesFilterType
    payload: [Website]
  }

  type WebsiteResponse implements Response {
    code: String!
    success: Boolean!
    message: String!
    token: JWT
    payload: Website
  }
`;

module.exports = WebsiteSchema;
