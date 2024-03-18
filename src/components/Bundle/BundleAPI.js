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
    visible = null,
    enable = true,
  }) {
    const filter = { enable };
    if (this.context?.user?.role === "USER") {
      filter["visible"] = true;
    }
    if (typeof visible == "boolean" && this.context?.user?.role !== "USER") {
      filter["visible"] = visible;
    }
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
    if (this.context?.user?._id) {
      populateArray.push({
        path: "liked",
        match: { user: this.context?.user?._id },
      });
      populateArray.push({
        path: "purchased",
        match: { user: this.context?.user?._id },
      });
      populateArray.push({
        path: "bookmarked",
        match: { user: this.context?.user?._id },
      });
    }
    return this.model
      .find(filter, "-syllabus")
      .sort({ createdAt: -1 })
      .skip(offset)
      .limit(limit)
      .populate(populateArray)
      .exec();
  }

  bundle({ bundleId }) {
    const populateArray = ["likes", "purchases"];
    if (this.context?.user?._id) {
      populateArray.push({
        path: "liked",
        match: { user: this.context?.user?._id },
      });
      populateArray.push({
        path: "purchased",
        match: { user: this.context?.user?._id },
      });
      populateArray.push({
        path: "bookmarked",
        match: { user: this.context?.user?._id },
      });
    }
    return this.model
      .findById(bundleId)
      .select("-syllabus")
      .populate(populateArray)
      .exec();
  }

  bundleSyllabus({ bundleId }) {
    return this.model.findById(bundleId).select("_id syllabus").exec();
  }

  bundleById(id) {
    return this.model.findById(id).exec();
  }

  bundleExists({ bundleId, ...rest }) {
    return this.model.exists({ _id: bundleId, enable: true, ...rest });
  }

  addBundle({ bundleInput }) {
    const bundle = new this.model(bundleInput);
    return bundle.save();
  }

  editBundle({ bundleId, bundleInput }) {
    return this.model
      .findByIdAndUpdate(bundleId, bundleInput, { new: true })
      .select("-syllabus")
      .exec();
  }

  deleteBundle({ bundleId }) {
    return this.model
      .findByIdAndUpdate(bundleId, { enable: false }, { new: true })
      .select("-syllabus")
      .exec();
  }
}

module.exports = BundleAPI;
