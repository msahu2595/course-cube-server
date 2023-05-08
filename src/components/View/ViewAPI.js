const { MongoDataSource } = require("apollo-datasource-mongodb");

class ViewAPI extends MongoDataSource {
  constructor(options) {
    super(options); // this sends our server's `cache` through
    this.model = options.ViewModel;
    this.context = options.context;
  }

  viewedUsers({ offset, limit, refId }) {
    return this.model
      .find({ refId })
      .skip(offset)
      .limit(limit)
      .populate("user")
      .exec();
  }

  addView({ refId }) {
    return this.model.create({
      user: this.context.user._id,
      refId: refId,
    });
  }
}

module.exports = ViewAPI;
