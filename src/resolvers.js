const { resolvers: scalarResolvers } = require("graphql-scalars");
const PasswordResolver = require("./components/Scalars/PasswordResolver");
const UserResolver = require("./components/User/UserResolver");
const FollowResolver = require("./components/Follow/FollowResolver");
const { QuestionResolver } = require("./components/Question");
const { VoteResolver } = require("./components/Vote");
const { NotificationResolver } = require("./components/Notification");

module.exports = [
  scalarResolvers,
  PasswordResolver,
  UserResolver,
  FollowResolver,
  QuestionResolver,
  VoteResolver,
  NotificationResolver,
];
