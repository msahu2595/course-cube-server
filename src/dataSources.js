// User API
const { UserAPI, UserModel } = require("./components/User");
// Follow API
const { FollowAPI, FollowModel } = require("./components/Follow");
// Advert API
const { AdvertAPI, AdvertModel } = require("./components/Advert");
// Bundle API
const { BundleAPI, BundleModel } = require("./components/Bundle");
// BundleContent API
const {
  BundleContentAPI,
  BundleContentModel,
} = require("./components/BundleContent");
// Content API
const { ContentAPI, ContentModel } = require("./components/Content");
// Video API
const { VideoAPI, VideoModel } = require("./components/Video");
// Test API
const { TestAPI, TestModel } = require("./components/Test");
// TestQuestion API
const {
  TestQuestionAPI,
  TestQuestionModel,
} = require("./components/TestQuestion");
// Document API
const { DocumentAPI, DocumentModel } = require("./components/Document");
// Headline API
const { HeadlineAPI, HeadlineModel } = require("./components/Headline");
// Article API
const { ArticleAPI, ArticleModel } = require("./components/Article");
// Website API
const { WebsiteAPI, WebsiteModel } = require("./components/Website");
// Purchase API
const { PurchaseAPI, PurchaseModel } = require("./components/Purchase");
// Question API
const { QuestionAPI, QuestionModel } = require("./components/Question");
// Answer API
const { AnswerAPI, AnswerModel } = require("./components/Answer");
// History API
const { HistoryAPI, HistoryModel } = require("./components/History");
// View API
const { ViewAPI, ViewModel } = require("./components/View");
// Like API
const { LikeAPI, LikeModel } = require("./components/Like");
// Bookmark API
const { BookmarkAPI, BookmarkModel } = require("./components/Bookmark");
// Notification API
const {
  NotificationAPI,
  NotificationModel,
} = require("./components/Notification");

const dataSources = (context) => ({
  userAPI: new UserAPI({ UserModel, context }),
  followAPI: new FollowAPI({ FollowModel, context }),
  questionAPI: new QuestionAPI({ QuestionModel, context }),
  advertAPI: new AdvertAPI({ AdvertModel, context }),
  bundleAPI: new BundleAPI({ BundleModel, context }),
  bundleContentAPI: new BundleContentAPI({ BundleContentModel, context }),
  contentAPI: new ContentAPI({ ContentModel, context }),
  videoAPI: new VideoAPI({ VideoModel, context }),
  testAPI: new TestAPI({ TestModel, context }),
  testQuestionAPI: new TestQuestionAPI({ TestQuestionModel, context }),
  documentAPI: new DocumentAPI({ DocumentModel, context }),
  headlineAPI: new HeadlineAPI({ HeadlineModel, context }),
  articleAPI: new ArticleAPI({ ArticleModel, context }),
  websiteAPI: new WebsiteAPI({ WebsiteModel, context }),
  purchaseAPI: new PurchaseAPI({ PurchaseModel, context }),
  answerAPI: new AnswerAPI({ AnswerModel, context }),
  historyAPI: new HistoryAPI({ HistoryModel, context }),
  viewAPI: new ViewAPI({ ViewModel, context }),
  likeAPI: new LikeAPI({ LikeModel, context }),
  bookmarkAPI: new BookmarkAPI({ BookmarkModel, context }),
  notificationAPI: new NotificationAPI({ NotificationModel, context }),
});

module.exports = dataSources;
