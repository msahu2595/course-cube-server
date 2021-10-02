// User API
const UserAPI = require("./components/User/UserAPI");
const UserModel = require("./components/User/UserModel");
// Follow API
const FollowAPI = require("./components/Follow/FollowAPI");
const FollowModel = require("./components/Follow/FollowModel");
// User Notification API
const {
  UserNotificationAPI,
  UserNotificationModel,
} = require("./components/UserNotification");
// Community Notification API
const {
  CommunityNotificationAPI,
  CommunityNotificationModel,
} = require("./components/CommunityNotification");

const dataSources = () => ({
  userAPI: new UserAPI(UserModel),
  followAPI: new FollowAPI(FollowModel),
  userNotificationAPI: new UserNotificationAPI(UserNotificationModel),
  communityNotificationAPI: new CommunityNotificationAPI(
    CommunityNotificationModel
  ),
});

module.exports = dataSources;
