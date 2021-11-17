const UserModel = require("./components/User/UserModel");
const FollowModel = require("./components/Follow/FollowModel");
const { CourseModel } = require("./components/Course");
const { VideoModel } = require("./components/Video");
const { TestModel } = require("./components/Test");
const { DocumentModel } = require("./components/Document");
const { HeadlineModel } = require("./components/Headline");
const { ArticleModel } = require("./components/Article");
const { PurchaseModel } = require("./components/Purchase");
const { QuestionModel } = require("./components/Question");
const { AnswerModel } = require("./components/Answer");
const { HistoryModel } = require("./components/History");
const { LikeModel } = require("./components/Like");
const { BookmarkModel } = require("./components/Bookmark");
const { NotificationModel } = require("./components/Notification");

module.exports = {
  UserModel,
  FollowModel,
  CourseModel,
  VideoModel,
  TestModel,
  DocumentModel,
  HeadlineModel,
  ArticleModel,
  PurchaseModel,
  QuestionModel,
  AnswerModel,
  HistoryModel,
  LikeModel,
  BookmarkModel,
  NotificationModel,
};
