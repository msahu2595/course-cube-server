const { resolvers: scalarResolvers } = require("graphql-scalars");
const PasswordResolver = require("./components/Scalars/PasswordResolver");
const UserResolver = require("./components/User/UserResolver");
const FollowResolver = require("./components/Follow/FollowResolver");
const { AdvertResolver } = require("./components/Advert");
const { CourseResolver } = require("./components/Course");
const { BundleResolver } = require("./components/Bundle");
const { BundleContentResolver } = require("./components/BundleContent");
const { ContentResolver } = require("./components/Content");
const { VideoResolver } = require("./components/Video");
const { TestResolver } = require("./components/Test");
const { DocumentResolver } = require("./components/Document");
const { HeadlineResolver } = require("./components/Headline");
const { ArticleResolver } = require("./components/Article");
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
  CourseResolver,
  BundleResolver,
  BundleContentResolver,
  ContentResolver,
  VideoResolver,
  TestResolver,
  DocumentResolver,
  HeadlineResolver,
  ArticleResolver,
  PurchaseResolver,
  FollowResolver,
  QuestionResolver,
  AnswerResolver,
  HistoryResolver,
  LikeResolver,
  BookmarkResolver,
  NotificationResolver,
];
