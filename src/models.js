const UserModel = require("./components/User/UserModel");
const FollowModel = require("./components/Follow/FollowModel");
const { QuestionModel } = require("./components/Question");
const { VoteModel } = require("./components/Vote");
const { NotificationModel } = require("./components/Notification");

module.exports = {
  UserModel,
  FollowModel,
  QuestionModel,
  VoteModel,
  NotificationModel,
};
