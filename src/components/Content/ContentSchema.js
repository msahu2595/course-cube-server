const { gql } = require("apollo-server");

const ContentSchema = gql`
  union Media = Video | Test | Document

  enum ContentType {
    Video
    Test
    Document
    Book
  }

  extend type Query {
    contents(
      offset: Int
      limit: Int
      search: String
      filter: ContentsFilterInput
    ): ContentListResponse
    content(contentId: ID!): ContentResponse
  }

  input ContentsFilterInput {
    paid: Boolean
    type: ContentType
    language: LanguageType
    visible: Boolean
    enable: Boolean
  }

  type ContentsFilterType {
    paid: Boolean
    type: ContentType
    language: LanguageType
    visible: Boolean
    enable: Boolean
  }

  extend type Mutation {
    addContent(contentInput: ContentInput!): ContentResponse
    editContent(contentId: ID!, contentInput: ContentInput!): ContentResponse
    deleteContent(contentId: ID!): ContentResponse
  }

  input ContentInput {
    categories: [String!]
    exams: [String!]
    tags: [String!]
    subject: String!
    image: URL!
    title: String!
    media: ID!
    type: ContentType!
    paid: Boolean!
    price: NonNegativeInt
    offer: NonNegativeInt
    offerType: OfferType
    highlight: String
    instructors: [String!]
    language: LanguageType!
    index: String
    description: String!
    validity: Duration
    visible: Boolean
  }

  type Content {
    _id: ID!
    # Used for filter
    categories: [String!]
    exams: [String!]
    tags: [String!]
    subject: String!
    # General fields
    image: URL!
    title: String!
    media: Media
    type: ContentType!
    paid: Boolean!
    price: NonNegativeInt
    offer: NonNegativeInt
    offerType: OfferType
    highlight: String
    instructors: [String!]
    language: LanguageType!
    index: String
    description: String!
    validity: Duration!
    visible: Boolean!
    enable: Boolean!
    createdAt: String!
    updatedAt: String!
    # Populate fields
    likes: NonNegativeInt
    purchases: NonNegativeInt
    purchased: NonNegativeInt
  }

  type ContentListResponse implements ListResponse {
    code: String!
    success: Boolean!
    message: String!
    token: JWT
    offset: Int!
    limit: Int!
    search: String
    filter: ContentsFilterType
    payload: [Content]
  }

  type ContentResponse implements Response {
    code: String!
    success: Boolean!
    message: String!
    token: JWT
    payload: Content
  }
`;

module.exports = ContentSchema;
