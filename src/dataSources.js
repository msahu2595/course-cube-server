// Account API
const AccountAPI = require("./components/Account/AccountAPI");
const AccountModel = require("./components/Account/AccountModel");
// Follow API
const FollowAPI = require("./components/Follow/FollowAPI");
const FollowModel = require("./components/Follow/FollowModel");

const dataSources = () => ({
  accountAPI: new AccountAPI(AccountModel),
  followAPI: new FollowAPI(FollowModel),
});

module.exports = dataSources;
