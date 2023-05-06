const { MongoDataSource } = require("apollo-datasource-mongodb");

class LikeAPI extends MongoDataSource {
  constructor(options) {
    super(options); // this sends our server's `cache` through
    this.model = options.LikeModel;
    this.context = options.context;
  }

  likedUsers({ offset, limit, refId, type }) {
    const filter = { refId };
    if (type) {
      filter["type"] = type;
    }
    return this.model
      .find(filter)
      .skip(offset)
      .limit(limit)
      .populate("user")
      .exec();
  }

  like({ refId, type }) {
    const likeInput = {};
    if (type) {
      likeInput["type"] = type;
    }
    return this.model.findOneAndUpdate(
      {
        user: this.context.user._id,
        refId: refId,
      },
      likeInput,
      { upsert: true, new: true }
    );
  }

  unlike({ refId }) {
    return this.model.deleteOne({
      user: this.context.user._id,
      refId: refId,
    });
  }
}

module.exports = LikeAPI;
