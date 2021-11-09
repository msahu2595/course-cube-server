const { gql } = require("apollo-server");

const VideoSchema = gql`
  enum PurchaseType {
    FREE
    PAID
  }

  enum OfferType {
    PERCENT
    AMOUNT
  }

  enum LanguageType {
    HI
    EN
  }

  extend type Query {
    videos(
      offset: Int
      limit: Int
      search: String
      filter: VideosFilterInput
    ): VideoListResponse
    video(videoId: ID!): VideoResponse
  }

  input VideosFilterInput {
    type: PurchaseType
    visible: Boolean
    enable: Boolean
  }

  type VideosFilterType {
    type: PurchaseType
    visible: Boolean
    enable: Boolean
  }

  extend type Mutation {
    addVideo(videoInput: VideoInput): VideoResponse
    editVideo(videoId: ID!, videoInput: VideoInput): VideoResponse
    refreshVideo(videoId: ID!): VideoResponse
    deleteVideo(videoId: ID!): VideoResponse
  }

  input VideoInput {
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
    visible: Boolean
    link: URL!
  }

  type Video {
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
    link: Void
    urls: [VideoURL]
    likes: NonNegativeInt
    watches: NonNegativeInt
    enable: Boolean!
    createdAt: String!
    updatedAt: String!
  }

  type VideoURL {
    url: URL
    duration: String
    format: String
  }

  type VideoListResponse implements ListResponse {
    code: String!
    success: Boolean!
    message: String!
    offset: Int!
    limit: Int!
    search: String
    filter: VideosFilterType
    payload: [Video]
  }

  type VideoResponse implements Response {
    code: String!
    success: Boolean!
    message: String!
    payload: Video
  }
`;

module.exports = VideoSchema;
