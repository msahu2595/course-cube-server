const gql = require("graphql-tag");

const DocumentSchema = gql`
  extend type Query {
    documents(
      offset: Int
      limit: Int
      search: String
      filter: DocumentsFilterInput
    ): DocumentListResponse
    document(documentId: ID!): DocumentResponse
  }

  input DocumentsFilterInput {
    enable: Boolean
  }

  type DocumentsFilterType {
    enable: Boolean
  }

  extend type Mutation {
    addDocument(documentInput: DocumentInput!): DocumentResponse
    editDocument(
      documentId: ID!
      documentInput: DocumentEditInput!
    ): DocumentResponse
    deleteDocument(documentId: ID!): DocumentResponse
  }

  input DocumentInput {
    title: String!
    thumbnail: String
    url: String!
    pages: PositiveInt!
  }

  input DocumentEditInput {
    title: String
    thumbnail: String
    url: String
    pages: PositiveInt
  }

  type Document {
    _id: ID!
    title: String!
    thumbnail: String
    #
    url: String!
    pages: PositiveInt!
    #
    enable: Boolean!
    createdAt: String!
    updatedAt: String!
  }

  type DocumentListResponse implements ListResponse {
    code: String!
    success: Boolean!
    message: String!
    token: JWT
    offset: Int!
    limit: Int!
    search: String
    filter: DocumentsFilterType
    payload: [Document]
  }

  type DocumentResponse implements Response {
    code: String!
    success: Boolean!
    message: String!
    token: JWT
    payload: Document
  }
`;

module.exports = DocumentSchema;
