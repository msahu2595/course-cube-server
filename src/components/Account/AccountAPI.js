const { MongoDataSource } = require("apollo-datasource-mongodb");

class AccountAPI extends MongoDataSource {
  getAccount(_id) {
    return this.findOneById(_id);
  }

  createAccount(firstName, lastName, email, password, acceptTnC) {
    return this.model.create({
      firstName,
      lastName,
      email,
      password,
      acceptTnC,
    });
  }
}

module.exports = AccountAPI;
