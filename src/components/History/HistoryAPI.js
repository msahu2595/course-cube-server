const { MongoDataSource } = require("apollo-datasource-mongodb");

class HistoryAPI extends MongoDataSource {
  constructor(options) {
    super(options); // this sends our server's `cache` through
    this.model = options.HistoryModel;
    this.context = options.context;
  }

  history({ offset, limit, userId, type }) {
    const query = { user: userId || this.context.user._id, visible: true };
    if (type) {
      query["type"] = type;
    }
    return this.model.find(query).skip(offset).limit(limit).exec();
  }

  historyUsers({ offset, limit, refId }) {
    return this.model
      .find({ refId, visible: true })
      .skip(offset)
      .limit(limit)
      .populate("user")
      .exec();
  }

  addHistory({ refId, type }) {
    return this.model.findOneAndUpdate(
      {
        user: this.context.user._id,
        refId,
        type,
      },
      { visible: true },
      { upsert: true, new: true }
    );
  }

  removeHistory({ historyId }) {
    return this.model.findOneAndUpdate(
      {
        _id: historyId,
        user: this.context.user._id,
      },
      { visible: false },
      { upsert: true, new: true }
    );
  }
}

module.exports = HistoryAPI;
