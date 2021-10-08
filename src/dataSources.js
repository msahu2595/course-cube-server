// User API
const UserAPI = require("./components/User/UserAPI");
const UserModel = require("./components/User/UserModel");
// Follow API
const FollowAPI = require("./components/Follow/FollowAPI");
const FollowModel = require("./components/Follow/FollowModel");
// User Notification API
const {
  NotificationAPI,
  NotificationModel,
} = require("./components/Notification");

const dataSources = () => ({
  userAPI: new UserAPI(UserModel),
  followAPI: new FollowAPI(FollowModel),
  notificationAPI: new NotificationAPI(NotificationModel),
});

module.exports = dataSources;
