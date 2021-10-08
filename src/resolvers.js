const { resolvers: scalarResolvers } = require("graphql-scalars");
const PasswordResolver = require("./components/Scalars/PasswordResolver");
const UserResolver = require("./components/User/UserResolver");
const FollowResolver = require("./components/Follow/FollowResolver");
const { NotificationResolver } = require("./components/Notification");

module.exports = [
  scalarResolvers,
  PasswordResolver,
  UserResolver,
  FollowResolver,
  NotificationResolver,
];
