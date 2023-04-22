const gql = require("graphql-tag");

const BookmarkSchema = gql`
  union Ref = Bundle | BundleContent | Content | Article | Question | Answer

  enum BookmarkType {
    Bundle
    BundleContent
    Content
    Article
    Question
    Answer
  }

  enum BookmarkSubType {
    Video
    Test
    Document
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
    bookmark(
      refId: ID!
      type: BookmarkType!
      subType: BookmarkSubType
    ): BookmarkResponse
    unbookmark(refId: ID!): BookmarkResponse
  }

  input BookmarksFilterInput {
    userId: ID
    type: BookmarkType
    subType: BookmarkSubType
  }

  type BookmarksFilterType {
    userId: ID
    type: BookmarkType
    subType: BookmarkSubType
  }

  type Bookmark {
    _id: ID!
    user: User
    ref: Ref
    type: BookmarkType!
    subType: BookmarkSubType
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
