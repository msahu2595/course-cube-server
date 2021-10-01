const { resolvers: scalarResolvers } = require("graphql-scalars");
const PasswordResolver = require("./components/Scalars/PasswordResolver");
const UserResolver = require("./components/User/UserResolver");
const FollowResolver = require("./components/Follow/FollowResolver");

module.exports = [
  scalarResolvers,
  PasswordResolver,
  UserResolver,
  FollowResolver,
];
