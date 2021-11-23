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
    type: PurchaseType
    visible: Boolean
    enable: Boolean
  }

  type DocumentsFilterType {
    type: PurchaseType
    visible: Boolean
    enable: Boolean
  }

  extend type Mutation {
    addDocument(documentInput: DocumentInput): DocumentResponse
    editDocument(
      documentId: ID!
      documentInput: DocumentInput
    ): DocumentResponse
    deleteDocument(documentId: ID!): DocumentResponse
  }

  input DocumentInput {
    image: URL!
    subject: String!
    tags: [String!]!
    title: String!
    paid: Boolean!
    price: NonNegativeInt
    offer: NonNegativeInt
    offerType: OfferType
    highlight: String
    instructors: [String]
    language: LanguageType!
    index: String
    description: String!
    validity: PositiveInt
    period: Period
    visible: Boolean
    link: URL!
    pages: NonNegativeInt!
  }

  type Document {
    _id: ID!
    image: URL!
    subject: String!
    tags: [String!]!
    title: String!
    paid: Boolean!
    price: NonNegativeInt
    offer: NonNegativeInt
    offerType: OfferType
    highlight: String
    instructors: [String]
    language: LanguageType!
    index: String
    description: String!
    validity: PositiveInt
    visible: Boolean!
    link: URL!
    pages: NonNegativeInt!
    likes: NonNegativeInt
    reads: NonNegativeInt
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
