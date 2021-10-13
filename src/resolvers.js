const { resolvers: scalarResolvers } = require("graphql-scalars");
const PasswordResolver = require("./components/Scalars/PasswordResolver");
const UserResolver = require("./components/User/UserResolver");
const FollowResolver = require("./components/Follow/FollowResolver");
const { QuestionResolver } = require("./components/Question");
const { AnswerResolver } = require("./components/Answer");
const { VoteResolver } = require("./components/Vote");
const { NotificationResolver } = require("./components/Notification");

module.exports = [
  scalarResolvers,
  PasswordResolver,
  UserResolver,
  FollowResolver,
  QuestionResolver,
  AnswerResolver,
  VoteResolver,
  NotificationResolver,
];
