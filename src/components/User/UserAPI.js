const { MongoDataSource } = require("apollo-datasource-mongodb");

class UserAPI extends MongoDataSource {
  constructor(options) {
    super(options); // this sends our server's `cache` through
    this.model = options.UserModel;
    this.context = options.context;
  }

  users({ offset, limit, search, role, gender, platform }) {
    const filter = {};
    if (role) {
      filter["role"] = role;
    }
    if (gender) {
      filter["gender"] = gender;
    }
    if (platform) {
      filter["platform"] = platform;
    }
    if (search) {
      filter["$text"] = { $search: search };
    }
    const populateArray = ["followers", "activities"];
    return this.model
      .find(filter)
      .sort({ createdAt: -1 })
      .skip(offset)
      .limit(limit)
      .populate(populateArray)
      .exec();
  }

  user({ userId }) {
    return this.model
      .findById(userId || this.context.user._id)
      .populate(["followers", "followings"])
      .exec();
  }

  // https://www.geeksforgeeks.org/mongoose-populate/
  statistics({ userId }) {
    return this.model
      .findById(userId || this.context.user._id)
      .select("_id")
      .populate({
        path: "videos",
        match: { type: /^(Content|BundleContent)$/, subType: "Video" },
      })
      .populate({
        path: "tests",
        match: { type: /^(Content|BundleContent)$/, subType: "Test" },
      })
      .populate({
        path: "documents",
        match: { type: /^(Content|BundleContent)$/, subType: "Document" },
      })
      .populate({
        path: "articles",
        match: { type: "Article" },
      })
      .exec();
  }

  usersFromIds({ userIds }) {
    const populateArray = ["followers", "activities"];
    return this.model
      .find({ _id: { $in: userIds } })
      .populate(populateArray)
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
