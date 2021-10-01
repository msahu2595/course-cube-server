const { MongoDataSource } = require("apollo-datasource-mongodb");

class UserAPI extends MongoDataSource {
  user({ userId }) {
    return this.model
      .findById(userId || this.context.user._id)
      .populate("followers")
      .populate("followings")
      .exec();
  }

  logIn({ email, password, image, firstName, lastName, acceptTnC }) {
    return this.model.findOneAndUpdate(
      {
        email,
      },
      { password, image, firstName, lastName, acceptTnC },
      { upsert: true, new: true }
    );
  }
}

module.exports = UserAPI;
