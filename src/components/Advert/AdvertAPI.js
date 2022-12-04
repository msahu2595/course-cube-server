const { MongoDataSource } = require("apollo-datasource-mongodb");

class AdvertAPI extends MongoDataSource {
  constructor(options) {
    super(options); // this sends our server's `cache` through
    this.model = options.AdvertModel;
    this.context = options.context;
  }

  adverts({ offset, limit, type, enable = true }) {
    const filter = { enable };
    if (type) {
      filter["type"] = type;
    }
    return this.model
      .find(filter)
      .sort({ createdAt: -1 })
      .skip(offset)
      .limit(limit)
      .exec();
  }

  createAdvert({ advertInput }) {
    return this.model.create(advertInput);
  }

  editAdvert({ advertId, advertInput }) {
    return this.model
      .findOneAndUpdate(
        {
          _id: advertId,
        },
        { ...advertInput },
        { new: true }
      )
      .exec();
  }

  deleteAdvert({ advertId }) {
    return this.model
      .findOneAndUpdate(
        {
          _id: advertId,
        },
        { enable: false },
        { new: true }
      )
      .exec();
  }
}

module.exports = AdvertAPI;
