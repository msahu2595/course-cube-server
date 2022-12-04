const { MongoDataSource } = require("apollo-datasource-mongodb");

class HeadlineAPI extends MongoDataSource {
  constructor(options) {
    super(options); // this sends our server's `cache` through
    this.model = options.HeadlineModel;
    this.context = options.context;
  }

  headlines({ offset, limit }) {
    return this.model
      .find({ enable: true })
      .sort({ createdAt: -1 })
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
