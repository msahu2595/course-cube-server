const { resolvers: scalarResolvers } = require("graphql-scalars");
const PasswordResolver = require("./components/Scalars/PasswordResolver");
const { UserResolver } = require("./components/User");
const { FollowResolver } = require("./components/Follow");
const { AdvertResolver } = require("./components/Advert");
const { BundleResolver } = require("./components/Bundle");
const { BundleContentResolver } = require("./components/BundleContent");
const { ContentResolver } = require("./components/Content");
const { VideoResolver } = require("./components/Video");
const { TestResolver } = require("./components/Test");
const { DocumentResolver } = require("./components/Document");
const { HeadlineResolver } = require("./components/Headline");
const { ArticleResolver } = require("./components/Article");
const { WebsiteResolver } = require("./components/Website");
const { PurchaseResolver } = require("./components/Purchase");
const { QuestionResolver } = require("./components/Question");
const { AnswerResolver } = require("./components/Answer");
const { HistoryResolver } = require("./components/History");
const { LikeResolver } = require("./components/Like");
const { BookmarkResolver } = require("./components/Bookmark");
const { NotificationResolver } = require("./components/Notification");

module.exports = [
  scalarResolvers,
  PasswordResolver,
  UserResolver,
  AdvertResolver,
  BundleResolver,
  BundleContentResolver,
  ContentResolver,
  VideoResolver,
  TestResolver,
  DocumentResolver,
  HeadlineResolver,
  ArticleResolver,
  WebsiteResolver,
  PurchaseResolver,
  FollowResolver,
  QuestionResolver,
  AnswerResolver,
  HistoryResolver,
  LikeResolver,
  BookmarkResolver,
  NotificationResolver,
];
