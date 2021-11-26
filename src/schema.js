const { typeDefs: scalarTypeDefs } = require("graphql-scalars");
const ScalarsSchema = require("./components/Scalars/ScalarsSchema");
const DirectivesSchema = require("./components/Directives/DirectivesSchema");
const UserSchema = require("./components/User/UserSchema");
const FollowSchema = require("./components/Follow/FollowSchema");
const { CourseSchema } = require("./components/Course");
const { BundleSchema } = require("./components/Bundle");
const { BundleContentSchema } = require("./components/BundleContent");
const { ContentSchema } = require("./components/Content");
const { VideoSchema } = require("./components/Video");
const { TestSchema } = require("./components/Test");
const { DocumentSchema } = require("./components/Document");
const { HeadlineSchema } = require("./components/Headline");
const { ArticleSchema } = require("./components/Article");
const { PurchaseSchema } = require("./components/Purchase");
const { QuestionSchema } = require("./components/Question");
const { AnswerSchema } = require("./components/Answer");
const { HistorySchema } = require("./components/History");
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
  BundleSchema,
  BundleContentSchema,
  ContentSchema,
  VideoSchema,
  TestSchema,
  DocumentSchema,
  ArticleSchema,
  HeadlineSchema,
  PurchaseSchema,
  QuestionSchema,
  AnswerSchema,
  HistorySchema,
  LikeSchema,
  BookmarkSchema,
  NotificationSchema,
];
