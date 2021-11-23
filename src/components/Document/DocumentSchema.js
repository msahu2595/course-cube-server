const { gql } = require("apollo-server");

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
    thumbnail: URL
    link: URL!
    pages: PositiveInt!
  }

  input DocumentEditInput {
    title: String
    thumbnail: URL
    link: URL
    pages: PositiveInt
  }

  type Document {
    _id: ID!
    title: String!
    thumbnail: URL
    link: URL!
    pages: PositiveInt!
    enable: Boolean!
    createdAt: String!
    updatedAt: String!
  }

  type DocumentListResponse implements ListResponse {
    code: String!
    success: Boolean!
    message: String!
    token: String
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
    token: String
    payload: Document
  }
`;

module.exports = DocumentSchema;
