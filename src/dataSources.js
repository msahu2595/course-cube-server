// User API
const UserAPI = require("./components/User/UserAPI");
const UserModel = require("./components/User/UserModel");
// Follow API
const FollowAPI = require("./components/Follow/FollowAPI");
const FollowModel = require("./components/Follow/FollowModel");
// Question API
const { QuestionAPI, QuestionModel } = require("./components/Question");
// Vote API
const { VoteAPI, VoteModel } = require("./components/Vote");
// Notification API
const {
  NotificationAPI,
  NotificationModel,
} = require("./components/Notification");

const dataSources = () => ({
  userAPI: new UserAPI(UserModel),
  followAPI: new FollowAPI(FollowModel),
  questionAPI: new QuestionAPI(QuestionModel),
  voteAPI: new VoteAPI(VoteModel),
  notificationAPI: new NotificationAPI(NotificationModel),
});

module.exports = dataSources;
