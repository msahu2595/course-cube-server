const { MongoDataSource } = require("apollo-datasource-mongodb");

class BundleContentAPI extends MongoDataSource {
  constructor(options) {
    super(options); // this sends our server's `cache` through
    this.model = options.BundleContentModel;
    this.context = options.context;
  }

  bundleContents({
    offset,
    limit,
    search,
    bundleId,
    subjectId,
    type,
    language,
    visible = null,
    enable = true,
  }) {
    const filter = { bundle: bundleId, enable };
    if (this.context?.user?.role === "USER") {
      filter["visible"] = true;
    }
    if (typeof visible == "boolean" && this.context?.user?.role !== "USER") {
      filter["visible"] = visible;
    }
    if (subjectId) {
      filter["subjectId"] = subjectId;
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
    const populateArray = ["media", "likes", "views"];
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
      .find(filter)
      .sort({ createdAt: -1 })
      .skip(offset)
      .limit(limit)
      .populate(populateArray)
      .exec();
  }

  bundleContent({ bundleContentId }) {
    const populateArray = ["media", "likes", "views"];
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
    return this.model.findById(bundleContentId).populate(populateArray).exec();
  }

  bundleContentById(id) {
    return this.model.findById(id).exec();
  }

  bundleContentExists({ bundleContentId, ...rest }) {
    return this.model.exists({ _id: bundleContentId, enable: true, ...rest });
  }

  mediaBundleContentExists({ bundleId, media, subjectId }) {
    return this.model.exists({
      bundle: bundleId,
      media,
      subjectId,
      enable: true,
    });
  }

  addBundleContent({ bundleId, bundleContentInput }) {
    const bundleContent = new this.model({
      bundle: bundleId,
      ...bundleContentInput,
    });
    return bundleContent.save((err, bundleContent) => {
      if (err) {
        throw new Error("Error while adding bundle content in DB.");
      }
      return this.model.populate(bundleContent, { path: "media" });
    });
  }

  // addBundleContent({ bundleId, bundleContentInput }) {
  //   return this.model
  //     .findOneAndUpdate(
  //       {
  //         bundle: bundleId,
  //         media: bundleContentInput.media,
  //         subjectId: bundleContentInput?.subjectId || null,
  //       },
  //       bundleContentInput,
  //       {
  //         upsert: true,
  //         new: true,
  //       }
  //     )
  //     .populate("media")
  //     .exec();
  // }

  editBundleContent({ bundleContentId, bundleContentInput }) {
    return this.model
      .findByIdAndUpdate(bundleContentId, bundleContentInput, { new: true })
      .populate("media")
      .exec();
  }

  deleteBundleContent({ bundleContentId }) {
    return this.model
      .findByIdAndUpdate(bundleContentId, { enable: false }, { new: true })
      .populate("media")
      .exec();
  }
}

module.exports = BundleContentAPI;
