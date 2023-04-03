const { MongoDataSource } = require("apollo-datasource-mongodb");

class WebsiteAPI extends MongoDataSource {
  constructor(options) {
    super(options); // this sends our server's `cache` through
    this.model = options.WebsiteModel;
    this.context = options.context;
  }

  websites({ offset, limit, search, enable = true }) {
    const filter = { enable };
    if (search) {
      filter["$text"] = { $search: search };
    }
    return this.model
      .find(filter)
      .sort({ createdAt: -1 })
      .skip(offset)
      .limit(limit)
      .exec();
  }

  websiteLinkExists({ link }) {
    return this.model.exists({ link });
  }

  addWebsite({ websiteInput }) {
    return this.model.create(websiteInput);
  }

  editWebsite({ websiteId, websiteInput }) {
    return this.model
      .findByIdAndUpdate(websiteId, websiteInput, { new: true })
      .exec();
  }

  deleteWebsite({ websiteId }) {
    return this.model
      .findByIdAndUpdate(websiteId, { enable: false }, { new: true })
      .exec();
  }
}

module.exports = WebsiteAPI;
