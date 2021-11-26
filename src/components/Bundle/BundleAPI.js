const { MongoDataSource } = require("apollo-datasource-mongodb");

class BundleAPI extends MongoDataSource {
  bundles({
    offset,
    limit,
    search,
    paid,
    type,
    language,
    visible = true,
    enable = true,
  }) {
    const filter = { visible, enable };
    if (paid) {
      filter["paid"] = paid;
    }
    if (type) {
      filter["type"] = type;
    }
    if (language) {
      filter["language"] = language;
    }
    if (search) {
      filter["$text"] = { $search: search };
    }
    return this.model
      .find(filter)
      .skip(offset)
      .limit(limit)
      .populate([
        "likes",
        "purchases",
        {
          path: "purchased",
          match: { user: this.context.user._id },
        },
      ])
      .exec();
  }

  bundle({ bundleId }) {
    return this.model
      .findById(bundleId)
      .populate([
        "likes",
        "purchases",
        {
          path: "purchased",
          match: { user: this.context.user._id },
        },
      ])
      .exec();
  }

  bundleExists({ bundleId }) {
    return this.model.exists({ _id: bundleId });
  }

  addBundle({ bundleInput }) {
    const bundle = new this.model(bundleInput);
    return bundle.save();
  }

  editBundle({ bundleId, bundleInput }) {
    return this.model
      .findByIdAndUpdate(bundleId, bundleInput, { new: true })
      .exec();
  }

  deleteBundle({ bundleId }) {
    return this.model
      .findByIdAndUpdate(bundleId, { enable: false }, { new: true })
      .exec();
  }
}

module.exports = BundleAPI;
