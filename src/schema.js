const { typeDefs: scalarTypeDefs } = require("graphql-scalars");
const ScalarsSchema = require("./components/Scalars/ScalarsSchema");
const DirectivesSchema = require("./components/Directives/DirectivesSchema");
const AccountSchema = require("./components/Account/AccountSchema");
const FollowSchema = require("./components/Follow/FollowSchema");

module.exports = [
  ...scalarTypeDefs,
  ScalarsSchema,
  DirectivesSchema,
  AccountSchema,
  FollowSchema,
];
