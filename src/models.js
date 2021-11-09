const UserModel = require("./components/User/UserModel");
const FollowModel = require("./components/Follow/FollowModel");
const { CourseModel } = require("./components/Course");
const { VideoModel } = require("./components/Video");
const { TestModel } = require("./components/Test");
const { DocumentModel } = require("./components/Document");
const { QuestionModel } = require("./components/Question");
const { AnswerModel } = require("./components/Answer");
const { HistoryModel } = require("./components/History");
const { VoteModel } = require("./components/Vote");
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
  QuestionModel,
  AnswerModel,
  HistoryModel,
  VoteModel,
  LikeModel,
  BookmarkModel,
  NotificationModel,
};

