const { MongoDataSource } = require("apollo-datasource-mongodb");

class LikeAPI extends MongoDataSource {
  likedUsers({ offset, limit, refId }) {
    return this.model
      .find({ refId, active: true })
      .skip(offset)
      .limit(limit)
      .populate("user")
      .exec();
  }

  like({ refId }) {
    return this.model.findOneAndUpdate(
      {
        user: this.context.user._id,
        refId: refId,
      },
      { active: true },
      { upsert: true, new: true }
    );
  }

  unlike({ refId }) {
    return this.model.findOneAndUpdate(
      {
        user: this.context.user._id,
        refId: refId,
      },
      { active: false },
      { upsert: true, new: true }
    );
  }
}

module.exports = LikeAPI;
