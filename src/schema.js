const { typeDefs: scalarTypeDefs } = require("graphql-scalars");
const ScalarsSchema = require("./components/Scalars/ScalarsSchema");
const DirectivesSchema = require("./components/Directives/DirectivesSchema");
const UserSchema = require("./components/User/UserSchema");
const FollowSchema = require("./components/Follow/FollowSchema");
const { VideoSchema } = require("./components/Video");
const { TestSchema } = require("./components/Test");
const { DocumentSchema } = require("./components/Document");
const { QuestionSchema } = require("./components/Question");
const { AnswerSchema } = require("./components/Answer");
const { VoteSchema } = require("./components/Vote");
const { LikeSchema } = require("./components/Like");
const { BookmarkSchema } = require("./components/Bookmark");
const { NotificationSchema } = require("./components/Notification");

module.exports = [
  ...scalarTypeDefs,
  ScalarsSchema,
  DirectivesSchema,
  UserSchema,
  FollowSchema,
  VideoSchema,
  TestSchema,
  DocumentSchema,
  QuestionSchema,
  AnswerSchema,
  VoteSchema,
  LikeSchema,
  BookmarkSchema,
  NotificationSchema,
];
