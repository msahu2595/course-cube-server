const { typeDefs: scalarTypeDefs } = require("graphql-scalars");
const { ScalarsSchema } = require("./components/Scalars");
const DirectivesSchema = require("./components/Directives/DirectivesSchema");
const { UserSchema } = require("./components/User");
const { FollowSchema } = require("./components/Follow");
const { AdvertSchema } = require("./components/Advert");
const { BundleSchema } = require("./components/Bundle");
const { BundleContentSchema } = require("./components/BundleContent");
const { ContentSchema } = require("./components/Content");
const { VideoSchema } = require("./components/Video");
const { TestSchema } = require("./components/Test");
const { DocumentSchema } = require("./components/Document");
const { ExamSchema } = require("./components/Exam");
const { HeadlineSchema } = require("./components/Headline");
const { ArticleSchema } = require("./components/Article");
const { WebsiteSchema } = require("./components/Website");
const { PurchaseSchema } = require("./components/Purchase");
const { QuestionSchema } = require("./components/Question");
const { AnswerSchema } = require("./components/Answer");
const { HistorySchema } = require("./components/History");
const { ViewSchema } = require("./components/View");
const { LikeSchema } = require("./components/Like");
const { BookmarkSchema } = require("./components/Bookmark");
const { NotificationSchema } = require("./components/Notification");

module.exports = [
  ...scalarTypeDefs,
  ScalarsSchema,
  DirectivesSchema,
  UserSchema,
  FollowSchema,
  AdvertSchema,
  BundleSchema,
  BundleContentSchema,
  ContentSchema,
  VideoSchema,
  TestSchema,
  DocumentSchema,
  ExamSchema,
  ArticleSchema,
  WebsiteSchema,
  HeadlineSchema,
  PurchaseSchema,
  QuestionSchema,
  AnswerSchema,
  HistorySchema,
  ViewSchema,
  LikeSchema,
  BookmarkSchema,
  NotificationSchema,
];
