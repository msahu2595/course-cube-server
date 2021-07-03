const { resolvers: scalarResolvers } = require("graphql-scalars");
const PasswordResolver = require("./components/Scalars/PasswordResolver");
const AccountResolver = require("./components/Account/AccountResolver");

module.exports = [scalarResolvers, PasswordResolver, AccountResolver];
