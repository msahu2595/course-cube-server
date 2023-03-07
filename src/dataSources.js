// User API
const UserAPI = require("./components/User/UserAPI");
const UserModel = require("./components/User/UserModel");
// Follow API
const FollowAPI = require("./components/Follow/FollowAPI");
const FollowModel = require("./components/Follow/FollowModel");
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
  documentAPI: new DocumentAPI({ DocumentModel, context }),
  headlineAPI: new HeadlineAPI({ HeadlineModel, context }),
  articleAPI: new ArticleAPI({ ArticleModel, context }),
  purchaseAPI: new PurchaseAPI({ PurchaseModel, context }),
  answerAPI: new AnswerAPI({ AnswerModel, context }),
  historyAPI: new HistoryAPI({ HistoryModel, context }),
  likeAPI: new LikeAPI({ LikeModel, context }),
  bookmarkAPI: new BookmarkAPI({ BookmarkModel, context }),
  notificationAPI: new NotificationAPI({ NotificationModel, context }),
});

module.exports = dataSources;
