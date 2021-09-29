const { resolvers: scalarResolvers } = require("graphql-scalars");
const PasswordResolver = require("./components/Scalars/PasswordResolver");
const AccountResolver = require("./components/Account/AccountResolver");
const FollowResolver = require("./components/Follow/FollowResolver");

module.exports = [
  scalarResolvers,
  PasswordResolver,
  AccountResolver,
  FollowResolver,
];
