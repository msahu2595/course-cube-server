const { typeDefs: scalarTypeDefs } = require("graphql-scalars");
const ScalarsSchema = require("./components/Scalars/ScalarsSchema");
const DirectivesSchema = require("./components/Directives/DirectivesSchema");
const UserSchema = require("./components/User/UserSchema");
const FollowSchema = require("./components/Follow/FollowSchema");
const { UserNotificationSchema } = require("./components/UserNotification");
const {
  CommunityNotificationSchema,
} = require("./components/CommunityNotification");

module.exports = [
  ...scalarTypeDefs,
  ScalarsSchema,
  DirectivesSchema,
  UserSchema,
  FollowSchema,
  UserNotificationSchema,
  CommunityNotificationSchema,
];
