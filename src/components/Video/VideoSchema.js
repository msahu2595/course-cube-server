const gql = require("graphql-tag");

const VideoSchema = gql`
  extend type Query {
    videos(
      offset: Int
      limit: Int
      search: String
      filter: VideosFilterInput
    ): VideoListResponse
    video(videoId: ID!): VideoResponse
    fetchURL(url: URL!): URLResponse
    fetchDownloadURL(videoId: ID!): DownloadURLResponse
  }

  input VideosFilterInput {
    enable: Boolean
  }

  type VideosFilterType {
    enable: Boolean
  }

  extend type Mutation {
    addVideo(videoLink: URL!): VideoResponse
    editVideo(videoId: ID!, videoLink: URL!): VideoResponse
    refreshVideo(videoId: ID!): VideoResponse
    deleteVideo(videoId: ID!): VideoResponse
  }

  type Video {
    _id: ID!
    title: String!
    thumbnail: URL
    link: Void
    time: String!
    urls: [VideoURL!]
    enable: Boolean!
    createdAt: String!
    updatedAt: String!
  }

  type VideoURL {
    url: URL
    format: String
  }

  type VideoListResponse implements ListResponse {
    code: String!
    success: Boolean!
    message: String!
    token: JWT
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
    token: JWT
    payload: Video
  }

  type URLResponse implements Response {
    code: String!
    success: Boolean!
    message: String!
    token: JWT
    payload: URLData
  }

  type URLData {
    title: String
    thumbnail: URL
    time: String
  }

  type DownloadURLResponse implements Response {
    code: String!
    success: Boolean!
    message: String!
    token: JWT
    payload: [VideoURL!]
  }
`;

module.exports = VideoSchema;
