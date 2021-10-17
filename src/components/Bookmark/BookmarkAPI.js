const { MongoDataSource } = require("apollo-datasource-mongodb");

class BookmarkAPI extends MongoDataSource {
  bookmarks({ offset, limit, userId, type }) {
    const query = { user: userId || this.context.user._id, active: true };
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
      .find({ refId, active: true })
      .skip(offset)
      .limit(limit)
      .populate("user")
      .exec();
  }

  bookmark({ refId }) {
    return this.model.findOneAndUpdate(
      {
        user: this.context.user._id,
        refId: refId,
      },
      { active: true },
      { upsert: true, new: true }
    );
  }

  unBookmark({ refId }) {
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

module.exports = BookmarkAPI;
