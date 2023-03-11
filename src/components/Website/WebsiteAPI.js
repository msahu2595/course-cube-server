const { MongoDataSource } = require("apollo-datasource-mongodb");

class WebsiteAPI extends MongoDataSource {
  constructor(options) {
    super(options); // this sends our server's `cache` through
    this.model = options.WebsiteModel;
    this.context = options.context;
  }

  websites({ offset, limit }) {
    return this.model
      .find({ enable: true })
      .sort({ createdAt: -1 })
      .skip(offset)
      .limit(limit)
      .exec();
  }

  addWebsite({ websiteInput }) {
    return this.model.create(websiteInput);
  }

  editWebsite({ websiteId, websiteInput }) {
    return this.model
      .findOneAndUpdate(
        {
          _id: websiteId,
        },
        { ...websiteInput },
        { new: true }
      )
      .exec();
  }

  deleteWebsite({ websiteId }) {
    return this.model
      .findOneAndUpdate(
        {
          _id: websiteId,
        },
        { enable: false },
        { new: true }
      )
      .exec();
  }
}

module.exports = WebsiteAPI;
