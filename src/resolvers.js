const { resolvers: scalarResolvers } = require("graphql-scalars");
const PasswordResolver = require("./components/Scalars/PasswordResolver");
const UserResolver = require("./components/User/UserResolver");
const FollowResolver = require("./components/Follow/FollowResolver");
const { UserNotificationResolver } = require("./components/UserNotification");
const {
  CommunityNotificationResolver,
} = require("./components/CommunityNotification");

module.exports = [
  scalarResolvers,
  PasswordResolver,
  UserResolver,
  FollowResolver,
  UserNotificationResolver,
  CommunityNotificationResolver,
];
