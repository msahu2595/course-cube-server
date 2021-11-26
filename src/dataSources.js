// User API
const UserAPI = require("./components/User/UserAPI");
const UserModel = require("./components/User/UserModel");
// Follow API
const FollowAPI = require("./components/Follow/FollowAPI");
const FollowModel = require("./components/Follow/FollowModel");
// Course API
const { CourseAPI, CourseModel } = require("./components/Course");
// Content API
const { ContentAPI, ContentModel } = require("./components/Content");
// Video API
const { VideoAPI, VideoModel } = require("./components/Video");
// Test API
const { TestAPI, TestModel } = require("./components/Test");
// Document API
const { DocumentAPI, DocumentModel } = require("./components/Document");
// Headline API
const { HeadlineAPI, HeadlineModel } = require("./components/Headline");
// Article API
const { ArticleAPI, ArticleModel } = require("./components/Article");
// Purchase API
const { PurchaseAPI, PurchaseModel } = require("./components/Purchase");
// Question API
const { QuestionAPI, QuestionModel } = require("./components/Question");
// Answer API
const { AnswerAPI, AnswerModel } = require("./components/Answer");
// Vote API
const { HistoryAPI, HistoryModel } = require("./components/History");
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
  courseAPI: new CourseAPI(CourseModel),
  contentAPI: new ContentAPI(ContentModel),
  videoAPI: new VideoAPI(VideoModel),
  testAPI: new TestAPI(TestModel),
  documentAPI: new DocumentAPI(DocumentModel),
  headlineAPI: new HeadlineAPI(HeadlineModel),
  articleAPI: new ArticleAPI(ArticleModel),
  purchaseAPI: new PurchaseAPI(PurchaseModel),
  answerAPI: new AnswerAPI(AnswerModel),
  historyAPI: new HistoryAPI(HistoryModel),
  likeAPI: new LikeAPI(LikeModel),
  bookmarkAPI: new BookmarkAPI(BookmarkModel),
  notificationAPI: new NotificationAPI(NotificationModel),
});

module.exports = dataSources;
