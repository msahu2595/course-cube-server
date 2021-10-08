const { MongoDataSource } = require("apollo-datasource-mongodb");

class VoteAPI extends MongoDataSource {
  voters({ offset, limit, refId }) {
    return this.model
      .find({ refId, active: true })
      .skip(offset)
      .limit(limit)
      .populate("user")
      .exec();
  }

  vote({ refId }) {
    return this.model.findOneAndUpdate(
      {
        user: this.context.user._id,
        refId: refId,
      },
      { active: true },
      { upsert: true, new: true }
    );
  }

  unVote({ refId }) {
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

module.exports = VoteAPI;
