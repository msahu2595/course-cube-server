const { MongoDataSource } = require("apollo-datasource-mongodb");

class HeadlineAPI extends MongoDataSource {
  constructor(options) {
    super(options); // this sends our server's `cache` through
    this.model = options.HeadlineModel;
    this.context = options.context;
  }

  headlines({ offset, limit, search, enable = true }) {
    const filter = { enable };
    if (search) {
      filter["$text"] = { $search: search };
    }
    return this.model
      .find(filter)
      .sort({ updatedAt: -1 })
      .skip(offset)
      .limit(limit)
      .exec();
  }

  createHeadline({ headlineInput }) {
    return this.model.create(headlineInput);
  }

  editHeadline({ headlineId, headlineInput }) {
    return this.model
      .findOneAndUpdate(
        {
          _id: headlineId,
        },
        { ...headlineInput },
        { new: true }
      )
      .exec();
  }

  deleteHeadline({ headlineId }) {
    return this.model
      .findOneAndUpdate(
        {
          _id: headlineId,
        },
        { enable: false },
        { new: true }
      )
      .exec();
  }
}

module.exports = HeadlineAPI;
