const UserModel = require("./components/User/UserModel");
const FollowModel = require("./components/Follow/FollowModel");
const { UserNotificationModel } = require("./components/UserNotification");
const {
  CommunityNotificationModel,
} = require("./components/CommunityNotification");

module.exports = {
  UserModel,
  FollowModel,
  UserNotificationModel,
  CommunityNotificationModel,
};
