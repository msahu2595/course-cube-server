const { MongoDataSource } = require("apollo-datasource-mongodb");

class UserAPI extends MongoDataSource {
  constructor(options) {
    super(options); // this sends our server's `cache` through
    this.model = options.UserModel;
    this.context = options.context;
  }

  user({ userId }) {
    return this.model
      .findById(userId || this.context.user._id)
      .populate("followers")
      .populate("followings")
      .exec();
  }

  leaderboard({ offset, limit }) {
    return this.model
      .find()
      .populate({ path: "followers" })
      .populate({ path: "history" })
      .sort({ followers: "asc", history: "desc" })
      .skip(offset)
      .limit(limit)
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

  async logIn({
    email,
    emailVerified,
    fullName,
    picture,
    acceptTnC,
    FCMToken,
    platform,
  }) {
    const payload = await this.model.findOne({ email }).exec();
    if (!payload?.length) {
      return this.model
        .findOneAndUpdate(
          {
            email,
          },
          {
            emailVerified,
            fullName,
            picture,
            acceptTnC,
            FCMToken,
            platform,
          },
          { upsert: true, new: true }
        )
        .exec();
    }
    return payload[0];
  }

  editProfile({ userInput }) {
    return this.model
      .findOneAndUpdate(
        {
          _id: this.context.user._id,
        },
        userInput,
        { new: true }
      )
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
      .exec();
  }
}

module.exports = UserAPI;
