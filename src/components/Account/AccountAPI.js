const { MongoDataSource } = require("apollo-datasource-mongodb");

class AccountAPI extends MongoDataSource {
  getAccount(_id) {
    return this.findOneById(_id);
  }

  createAccount(email, password) {
    return this.model.create({ email, password });
  }
}

module.exports = AccountAPI;
