const { MongoDataSource } = require("apollo-datasource-mongodb");

class BundleAPI extends MongoDataSource {
  constructor(options) {
    super(options); // this sends our server's `cache` through
    this.model = options.BundleModel;
    this.context = options.context;
  }

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
    const populateArray = ["likes", "purchases"];
    if (this.context?.user?.role === "USER") {
      populateArray.push({
        path: "purchased",
        match: { user: this.context?.user?._id },
      });
    }
    return this.model
      .find(filter)
      .sort({ createdAt: -1 })
      .skip(offset)
      .limit(limit)
      .populate(populateArray)
      .exec();
  }

  bundle({ bundleId }) {
    const populateArray = ["likes", "purchases"];
    if (this.context?.user?.role === "USER") {
      populateArray.push({
        path: "purchased",
        match: { user: this.context?.user?._id },
      });
    }
    return this.model.findById(bundleId).populate(populateArray).exec();
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
