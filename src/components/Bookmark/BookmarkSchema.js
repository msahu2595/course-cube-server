const gql = require("graphql-tag");

const BookmarkSchema = gql`
  enum BookmarkType {
    VIDEO
    TEST
    DOCUMENT
    ARTICLE
    POST
  }

  extend type Query {
    bookmarks(
      limit: Int
      offset: Int
      filter: BookmarksFilterInput
    ): BookmarkListResponse
    bookmarkedUsers(
      limit: Int
      offset: Int
      refId: ID!
    ): BookmarkedUserListResponse
  }

  extend type Mutation {
    bookmark(refId: ID!, type: BookmarkType!): BookmarkResponse
    unbookmark(refId: ID!, type: BookmarkType!): BookmarkResponse
  }

  input BookmarksFilterInput {
    userId: ID
    type: BookmarkType
  }

  type BookmarksFilterType {
    userId: ID
    type: BookmarkType
  }

  type Bookmark {
    _id: ID!
    user: User
    refId: ID!
    type: BookmarkType!
    createdAt: String!
    updatedAt: String!
  }

  type BookmarkListResponse implements ListResponse {
    code: String!
    success: Boolean!
    message: String!
    token: JWT
    limit: Int!
    offset: Int!
    filter: BookmarksFilterType
    payload: [Bookmark]
  }

  type BookmarkedUserListResponse implements ListResponse {
    code: String!
    success: Boolean!
    message: String!
    token: JWT
    limit: Int!
    offset: Int!
    refId: ID!
    payload: [Bookmark]
  }

  type BookmarkResponse implements Response {
    code: String!
    success: Boolean!
    message: String!
    token: JWT
  }
`;

module.exports = BookmarkSchema;
