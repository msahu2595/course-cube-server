const { MongoDataSource } = require("apollo-datasource-mongodb");

class HistoryAPI extends MongoDataSource {
  constructor(options) {
    super(options); // this sends our server's `cache` through
    this.model = options.HistoryModel;
    this.context = options.context;
  }

  history({ offset, limit, userId, type, subType }) {
    const filter = { user: userId || this.context.user._id, visible: true };
    if (type) {
      filter["type"] = type;
    }
    if (subType) {
      filter["subType"] = subType;
    }
    return this.model
      .find(filter)
      .sort({ createdAt: -1 })
      .skip(offset)
      .limit(limit)
      .populate("ref")
      .exec();
  }

  historyUsers({ offset, limit, refId }) {
    return this.model
      .find({ ref: refId })
      .skip(offset)
      .limit(limit)
      .populate("user")
      .exec();
  }

  addHistory({ refId, type, subType }) {
    const historyInput = { type };
    if (subType) {
      historyInput.subType = subType;
    }
    return this.model.findOneAndUpdate(
      {
        user: this.context.user._id,
        ref: refId,
      },
      historyInput,
      { upsert: true, new: true }
    );
  }

  removeHistory({ refId }) {
    return this.model.findOneAndUpdate(
      {
        user: this.context.user._id,
        ref: refId,
      },
      { visible: false },
      { upsert: true, new: true }
    );
  }
}

module.exports = HistoryAPI;
