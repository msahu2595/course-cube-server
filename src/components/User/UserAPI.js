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

  user(props) {
    return this.model
      .findById(props?.userId || this.context.user?._id)
      .populate(props?.populate || [])
      .exec();
  }

  // https://www.geeksforgeeks.org/mongoose-populate/
  statistics({ userId }) {
    return this.model
      .findById(userId || this.context.user?._id)
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

  async logIn({ email, mobile, ...rest }) {
    if (email || mobile) {
      const filter = {};
      if (email) {
        filter["email"] = email;
      } else {
        filter["mobile"] = mobile;
      }
      const payload = await this.model
        .findOneAndUpdate(filter, rest, { upsert: false, new: true })
        .populate(["followers", "followings"])
        .exec();
      if (!payload) {
        const newUser = new this.model({ ...filter, ...rest });
        const user = await newUser.save();
        return this.model.populate(user, ["followers", "followings"]);
      }
      return payload;
    } else {
      throw new Error("Please provide valid email or mobile number.");
    }
  }

  logout() {
    return this.model
      .findOneAndUpdate(
        { _id: this.context.user?._id },
        { FCMToken: "" },
        { new: true }
      )
      .exec();
  }

  createProfile({ userInput }) {
    return this.model
      .findOneAndUpdate(
        {
          _id: this.context.user?._id,
          userVerified: false,
        },
        { ...userInput, userVerified: true },
        { new: true }
      )
      .exec();
  }

  editProfile({ userInput }) {
    return this.model
      .findOneAndUpdate(
        {
          _id: this.context.user?._id,
          userVerified: true,
        },
        userInput,
        { new: true }
      )
      .exec();
  }

  assignRole({ userId, role }) {
    return this.model
      .findOneAndUpdate({ _id: userId }, { role }, { new: true })
      .exec();
  }

  addProfileImage({ picture }) {
    return this.model
      .findOneAndUpdate(
        { _id: this.context.user?._id },
        { picture },
        { new: true }
      )
      .exec();
  }

  removeProfileImage() {
    return this.model
      .findOneAndUpdate(
        { _id: this.context.user?._id },
        { picture: "" },
        { new: true }
      )
      .exec();
  }
}

module.exports = UserAPI;
