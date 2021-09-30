const { MongoDataSource } = require("apollo-datasource-mongodb");

class AccountAPI extends MongoDataSource {
  getAccount(accountId) {
    return this.model
      .findById(accountId || this.context.account._id)
      .populate("followers")
      .populate("followings")
      .exec();
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
