const { MongoDataSource } = require("apollo-datasource-mongodb");

class BundleContentAPI extends MongoDataSource {
  bundleContents({
    offset,
    limit,
    bundleId,
    value,
    type,
    visible = true,
    enable = true,
  }) {
    const filter = { visible, enable, bundle: bundleId };
    if (value) {
      filter["value"] = value;
    }
    if (type) {
      filter["type"] = type;
    }
    return this.model
      .find(filter)
      .skip(offset)
      .limit(limit)
      .populate([
        "media",
        {
          path: "purchased",
          match: { user: this.context.user._id },
        },
      ])
      .exec();
  }

  bundleContent({ bundleContentId }) {
    return this.model
      .findById(bundleContentId)
      .populate([
        "media",
        {
          path: "purchased",
          match: { user: this.context.user._id },
        },
      ])
      .exec();
  }

  // addBundleContent({ bundleContentInput }) {
  //   const bundleContent = new this.model(bundleContentInput);
  //   return bundleContent.save((err, bundleContent) => {
  //     return this.model.populate(bundleContent, { path: "media" });
  //   });
  // }

  addBundleContent({ bundleId, bundleContentInput }) {
    return this.model
      .findOneAndUpdate(
        { bundle: bundleId, media: bundleContentInput?.media },
        bundleContentInput,
        {
          upsert: true,
          new: true,
        }
      )
      .populate("media")
      .exec();
  }

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
