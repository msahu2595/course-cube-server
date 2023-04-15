const { MongoDataSource } = require("apollo-datasource-mongodb");

class BookmarkAPI extends MongoDataSource {
  constructor(options) {
    super(options); // this sends our server's `cache` through
    this.model = options.BookmarkModel;
    this.context = options.context;
  }

  bookmarks({ offset, limit, userId, type }) {
    const query = { user: userId || this.context.user._id };
    if (type) {
      query["type"] = type;
    }
    return this.model
      .find(query)
      .skip(offset)
      .limit(limit)
      .populate("user")
      .exec();
  }

  bookmarkedUsers({ offset, limit, refId }) {
    return this.model
      .find({ refId })
      .skip(offset)
      .limit(limit)
      .populate("user")
      .exec();
  }

  bookmark({ refId, type }) {
    return this.model.findOneAndUpdate(
      {
        user: this.context.user._id,
        refId,
      },
      { type },
      { upsert: true, new: true }
    );
  }

  unbookmark({ refId }) {
    return this.model.deleteOne({
      user: this.context.user._id,
      refId: refId,
    });
  }
}

module.exports = BookmarkAPI;
