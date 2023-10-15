const { resolvers: ScalarResolvers } = require("graphql-scalars");
const { ScalarsResolver } = require("./components/Scalars");
const { UserResolver } = require("./components/User");
const { FollowResolver } = require("./components/Follow");
const { AdvertResolver } = require("./components/Advert");
const { BundleResolver } = require("./components/Bundle");
const { BundleContentResolver } = require("./components/BundleContent");
const { ContentResolver } = require("./components/Content");
const { VideoResolver } = require("./components/Video");
const { TestResolver } = require("./components/Test");
const { DocumentResolver } = require("./components/Document");
const { ExamResolver } = require("./components/Exam");
const { HeadlineResolver } = require("./components/Headline");
const { ArticleResolver } = require("./components/Article");
const { WebsiteResolver } = require("./components/Website");
const { PurchaseResolver } = require("./components/Purchase");
const { QuestionResolver } = require("./components/Question");
const { AnswerResolver } = require("./components/Answer");
const { HistoryResolver } = require("./components/History");
const { ViewResolver } = require("./components/View");
const { LikeResolver } = require("./components/Like");
const { BookmarkResolver } = require("./components/Bookmark");
const { NotificationResolver } = require("./components/Notification");

module.exports = [
  ScalarResolvers,
  ScalarsResolver,
  UserResolver,
  AdvertResolver,
  BundleResolver,
  BundleContentResolver,
  ContentResolver,
  VideoResolver,
  TestResolver,
  DocumentResolver,
  ExamResolver,
  HeadlineResolver,
  ArticleResolver,
  WebsiteResolver,
  PurchaseResolver,
  FollowResolver,
  QuestionResolver,
  AnswerResolver,
  HistoryResolver,
  ViewResolver,
  LikeResolver,
  BookmarkResolver,
  NotificationResolver,
];
