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
    fetchURL(videoLink: URL!): URLResponse
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
    editVideo(videoId: ID!, videoInput: VideoInput!): VideoResponse
    deleteVideo(videoId: ID!): VideoResponse
  }

  input VideoInput {
    title: String!
    thumbnail: URL!
  }

  type Video {
    _id: ID!
    title: String!
    thumbnail: URL
    time: String!
    link: URL!
    enable: Boolean!
    createdAt: String!
    updatedAt: String!
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

  type URLData {
    title: String
    thumbnail: URL
    time: String
  }

  type URLResponse implements Response {
    code: String!
    success: Boolean!
    message: String!
    token: JWT
    payload: URLData
  }

  type VideoURL {
    url: URL
    format: String
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
