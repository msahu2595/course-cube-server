const { MongoDataSource } = require("apollo-datasource-mongodb");

class BookmarkAPI extends MongoDataSource {
  constructor(options) {
    super(options); // this sends our server's `cache` through
    this.model = options.BookmarkModel;
    this.context = options.context;
  }

  bookmarks({ offset, limit, userId, type, subType }) {
    const filter = { user: userId || this.context.user._id };
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

  bookmarkedUsers({ offset, limit, refId }) {
    return this.model
      .find({ ref: refId })
      .skip(offset)
      .limit(limit)
      .populate("user")
      .exec();
  }

  bookmark({ refId, type, subType }) {
    const bookmarkInput = { type };
    if (subType) {
      bookmarkInput.subType = subType;
    }
    return this.model.findOneAndUpdate(
      {
        user: this.context.user._id,
        ref: refId,
      },
      bookmarkInput,
      { upsert: true, new: true }
    );
  }

  unbookmark({ refId }) {
    return this.model.deleteOne({
      user: this.context.user._id,
      ref: refId,
    });
  }
}

module.exports = BookmarkAPI;
