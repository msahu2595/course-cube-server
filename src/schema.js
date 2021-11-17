const { typeDefs: scalarTypeDefs } = require("graphql-scalars");
const ScalarsSchema = require("./components/Scalars/ScalarsSchema");
const DirectivesSchema = require("./components/Directives/DirectivesSchema");
const UserSchema = require("./components/User/UserSchema");
const FollowSchema = require("./components/Follow/FollowSchema");
const { CourseSchema } = require("./components/Course");
const { VideoSchema } = require("./components/Video");
const { TestSchema } = require("./components/Test");
const { DocumentSchema } = require("./components/Document");
const { HeadlineSchema } = require("./components/Headline");
const { PurchaseSchema } = require("./components/Purchase");
const { QuestionSchema } = require("./components/Question");
const { AnswerSchema } = require("./components/Answer");
const { HistorySchema } = require("./components/History");
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
  CourseSchema,
  VideoSchema,
  TestSchema,
  DocumentSchema,
  HeadlineSchema,
  PurchaseSchema,
  QuestionSchema,
  AnswerSchema,
  HistorySchema,
  VoteSchema,
  LikeSchema,
  BookmarkSchema,
  NotificationSchema,
];
