// User API
const UserAPI = require("./components/User/UserAPI");
const UserModel = require("./components/User/UserModel");
// Follow API
const FollowAPI = require("./components/Follow/FollowAPI");
const FollowModel = require("./components/Follow/FollowModel");
// Video API
const { VideoAPI, VideoModel } = require("./components/Video");
// Test API
const { TestAPI, TestModel } = require("./components/Test");
// Document API
const { DocumentAPI, DocumentModel } = require("./components/Document");
// Question API
const { QuestionAPI, QuestionModel } = require("./components/Question");
// Answer API
const { AnswerAPI, AnswerModel } = require("./components/Answer");
// Vote API
const { VoteAPI, VoteModel } = require("./components/Vote");
// Like API
const { LikeAPI, LikeModel } = require("./components/Like");
// Bookmark API
const { BookmarkAPI, BookmarkModel } = require("./components/Bookmark");
// Notification API
const {
  NotificationAPI,
  NotificationModel,
} = require("./components/Notification");

const dataSources = () => ({
  userAPI: new UserAPI(UserModel),
  followAPI: new FollowAPI(FollowModel),
  questionAPI: new QuestionAPI(QuestionModel),
  videoAPI: new VideoAPI(VideoModel),
  testAPI: new TestAPI(TestModel),
  documentAPI: new DocumentAPI(DocumentModel),
  answerAPI: new AnswerAPI(AnswerModel),
  voteAPI: new VoteAPI(VoteModel),
  likeAPI: new LikeAPI(LikeModel),
  bookmarkAPI: new BookmarkAPI(BookmarkModel),
  notificationAPI: new NotificationAPI(NotificationModel),
});

module.exports = dataSources;
