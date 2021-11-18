const { MongoDataSource } = require("apollo-datasource-mongodb");

class UserAPI extends MongoDataSource {
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

  async logIn({ email, emailVerified, fullName, picture }) {
    console.log({ email, emailVerified, fullName, picture });
    const payload = await this.findByFields({
      email,
    });
    if (!payload.length) {
      return this.model
        .findOneAndUpdate(
          {
            email,
          },
          { emailVerified, fullName, picture },
          { upsert: true, new: true }
        )
        .exec();
    }
    return payload[0];
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
