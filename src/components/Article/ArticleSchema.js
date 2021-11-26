const { gql } = require("apollo-server");

const ArticleSchema = gql`
  extend type Query {
    articles(offset: Int, limit: Int): ArticleListResponse
    article(articleId: ID!): ArticleResponse
  }

  extend type Mutation {
    createArticle(articleInput: ArticleInput!): ArticleResponse
    editArticle(articleId: ID!, articleInput: ArticleInput!): ArticleResponse
    deleteArticle(articleId: ID!): ArticleResponse
  }

  input ArticleInput {
    image: URL
    title: String!
    description: String!
    tags: [String!]
    sources: [URL!]
  }

  type Article {
    _id: ID!
    image: URL
    title: String!
    description: String!
    tags: [String!]
    sources: [URL!]
    likes: NonNegativeInt
    enable: Boolean!
    createdAt: String!
    updatedAt: String!
  }

  type ArticleListResponse implements ListResponse {
    code: String!
    success: Boolean!
    message: String!
    token: JWT
    offset: Int!
    limit: Int!
    payload: [Article]
  }

  type ArticleResponse implements Response {
    code: String!
    success: Boolean!
    message: String!
    token: JWT
    payload: Article
  }
`;

module.exports = ArticleSchema;
