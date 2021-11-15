const { resolvers: scalarResolvers } = require("graphql-scalars");
const PasswordResolver = require("./components/Scalars/PasswordResolver");
const UserResolver = require("./components/User/UserResolver");
const FollowResolver = require("./components/Follow/FollowResolver");
const { CourseResolver } = require("./components/Course");
const { VideoResolver } = require("./components/Video");
const { TestResolver } = require("./components/Test");
const { DocumentResolver } = require("./components/Document");
const { PurchaseResolver } = require("./components/Purchase");
const { QuestionResolver } = require("./components/Question");
const { AnswerResolver } = require("./components/Answer");
const { HistoryResolver } = require("./components/History");
const { VoteResolver } = require("./components/Vote");
const { LikeResolver } = require("./components/Like");
const { BookmarkResolver } = require("./components/Bookmark");
const { NotificationResolver } = require("./components/Notification");

module.exports = [
  scalarResolvers,
  PasswordResolver,
  UserResolver,
  CourseResolver,
  VideoResolver,
  TestResolver,
  DocumentResolver,
  PurchaseResolver,
  FollowResolver,
  QuestionResolver,
  AnswerResolver,
  HistoryResolver,
  VoteResolver,
  LikeResolver,
  BookmarkResolver,
  NotificationResolver,
];
