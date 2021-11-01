const { MongoDataSource } = require("apollo-datasource-mongodb");

class UserAPI extends MongoDataSource {
  user({ userId }) {
    return this.model
      .findById(userId || this.context.user._id)
      .populate("followers")
      .populate("followings")
      .exec();
  }

  statistics({ userId }) {
    return this.model
      .findById(userId || this.context.user._id)
      .populate({
        path: "videos",
        match: { type: "VIDEO" },
      })
      .populate({
        path: "tests",
        match: { type: "TEST" },
      })
      .populate({
        path: "documents",
        match: { type: "DOCUMENT" },
      })
      .populate({
        path: "questions",
        match: { type: "QUESTION" },
      })
      .exec();
  }

  logIn({ email, password, image, firstName, lastName, acceptTnC }) {
    return this.model
      .findOneAndUpdate(
        {
          email,
        },
        { password, image, firstName, lastName, acceptTnC },
        { upsert: true, new: true }
      )
      .populate("followers")
      .populate("followings")
      .exec();
  }

  assignRole({ userId, role }) {
    return this.model
      .findOneAndUpdate(
        {
          _id: userId,
        },
        { role },
        { new: true }
      )
      .populate("followers")
      .populate("followings")
      .exec();
  }
}

module.exports = UserAPI;
