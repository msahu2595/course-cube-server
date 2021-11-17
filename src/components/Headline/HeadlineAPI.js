const { MongoDataSource } = require("apollo-datasource-mongodb");

class HeadlineAPI extends MongoDataSource {
  headlines({ offset, limit }) {
    return this.model
      .find({ enable: true })
      .skip(offset)
      .limit(limit)
      .sort("createdAt")
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
