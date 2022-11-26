const gql = require("graphql-tag");

const ArticleSchema = gql`
  extend type Query {
    articles(
      offset: Int
      limit: Int
      search: String
      filter: ArticlesFilterInput
    ): ArticleListResponse
    article(articleId: ID!): ArticleResponse
  }

  input ArticlesFilterInput {
    author: String
    tag: String
    visible: Boolean
    enable: Boolean
  }

  type ArticlesFilterType {
    author: String
    tag: String
    visible: Boolean
    enable: Boolean
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
    author: String!
    tags: [String!]
    sources: [URL!]
    visible: Boolean
  }

  type Article {
    _id: ID!
    image: URL
    title: String!
    description: String!
    author: String!
    tags: [String!]
    sources: [URL!]
    visible: Boolean!
    enable: Boolean!
    likes: NonNegativeInt
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
    search: String
    filter: ArticlesFilterType
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
