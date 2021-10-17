const { gql } = require("apollo-server");

const BookmarkSchema = gql`
  extend type Query {
    bookmarks(
      limit: Int
      offset: Int
      filter: BookmarksFilterInput
    ): BookmarkListResponse
    bookmarkedUsers(limit: Int, offset: Int, refId: ID!): BookmarkedUserListResponse
  }

  extend type Mutation {
    bookmark(refId: ID!): BookmarkResponse
    unBookmark(refId: ID!): BookmarkResponse
  }

  input BookmarksFilterInput {
    userId: ID
    type: BookmarkType
  }

  type BookmarksFilterType {
    userId: ID
    type: BookmarkType
  }

  enum BookmarkType {
    VIDEO
    TEST
    PDF
    QUESTION
    ANSWER
  }

  type Bookmark {
    _id: ID!
    user: User
    refId: ID!
    active: Boolean!
    createdAt: String!
    updatedAt: String!
  }

  type BookmarkListResponse implements ListResponse {
    code: String!
    success: Boolean!
    message: String!
    limit: Int!
    offset: Int!
    filter: BookmarksFilterType
    payload: [Bookmark]
  }

  type BookmarkedUserListResponse implements ListResponse {
    code: String!
    success: Boolean!
    message: String!
    limit: Int!
    offset: Int!
    refId: ID!
    payload: [Bookmark]
  }

  type BookmarkResponse implements Response {
    code: String!
    success: Boolean!
    message: String!
    payload: Bookmark
  }
`;

module.exports = BookmarkSchema;
