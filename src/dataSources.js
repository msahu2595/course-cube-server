const AccountAPI = require("./components/Account/AccountAPI");
const AccountModel = require("./components/Account/AccountModel");

const dataSources = () => ({
  accountAPI: new AccountAPI(AccountModel),
});

module.exports = dataSources;
