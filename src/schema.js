const { typeDefs: scalarTypeDefs } = require("graphql-scalars");
const ScalarsSchema = require("./components/Scalars/ScalarsSchema");
const DirectivesSchema = require("./components/Directives/DirectivesSchema");
const UserSchema = require("./components/User/UserSchema");
const FollowSchema = require("./components/Follow/FollowSchema");
const { NotificationSchema } = require("./components/Notification");

module.exports = [
  ...scalarTypeDefs,
  ScalarsSchema,
  DirectivesSchema,
  UserSchema,
  FollowSchema,
  NotificationSchema,
];
