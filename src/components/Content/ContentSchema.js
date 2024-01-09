const gql = require("graphql-tag");

const ContentSchema = gql`
  union Media = Video | Test | Document

  enum MediaType {
    Video
    Test
    Document
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
    type: MediaType
    language: LanguageType
    visible: Boolean
    enable: Boolean
  }

  type ContentsFilterType {
    paid: Boolean
    type: MediaType
    language: LanguageType
    visible: Boolean
    enable: Boolean
  }

  extend type Mutation {
    addContent(contentInput: ContentInput!): ContentResponse
    editContent(
      contentId: ID!
      contentInput: ContentEditInput!
    ): ContentResponse
    deleteContent(contentId: ID!): ContentResponse
    copyImage(imagePath: String!): ImageResponse
  }

  input ContentInput {
    categories: [String!]
    exams: [String!]
    tags: [String!]
    subject: String!
    image: String!
    title: String!
    media: ID!
    type: MediaType!
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

  input ContentEditInput {
    categories: [String!]
    exams: [String!]
    tags: [String!]
    subject: String
    image: String
    title: String
    media: ID
    type: MediaType
    paid: Boolean
    price: NonNegativeInt
    offer: NonNegativeInt
    offerType: OfferType
    highlight: String
    instructors: [String!]
    language: LanguageType
    index: String
    description: String
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
    image: String!
    title: String!
    media: Media
    type: MediaType!
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
    liked: NonNegativeInt
    views: NonNegativeInt
    purchased: NonNegativeInt
    bookmarked: NonNegativeInt
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

  type ImageResponse implements Response {
    code: String!
    success: Boolean!
    message: String!
    token: JWT
    payload: String!
  }
`;

module.exports = ContentSchema;
