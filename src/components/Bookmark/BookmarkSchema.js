const { gql } = require("apollo-server");

const BookmarkSchema = gql`
  enum BookmarkType {
    VIDEO
    TEST
    DOCUMENT
    QUESTION
    ANSWER
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
    unBookmark(bookmarkId: ID!): BookmarkResponse
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
    active: Boolean!
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
    payload: Bookmark
  }
`;

module.exports = BookmarkSchema;
