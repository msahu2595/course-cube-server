const { MongoDataSource } = require("apollo-datasource-mongodb");

class ContentAPI extends MongoDataSource {
  constructor(options) {
    super(options); // this sends our server's `cache` through
    this.model = options.ContentModel;
    this.context = options.context;
  }

  contents({
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

  content({ contentId }) {
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
    return this.model.findById(contentId).populate(populateArray).exec();
  }

  contentById(id) {
    return this.model.findById(id).exec();
  }

  contentExists({ contentId, ...rest }) {
    return this.model.exists({ _id: contentId, enable: true, ...rest });
  }

  mediaContentExists({ media }) {
    return this.model.exists({ media, enable: true });
  }

  addContent({ contentInput }) {
    const content = new this.model(contentInput);
    return content.save((err, content) => {
      if (err) {
        throw new Error("Error while adding content in DB.");
      }
      return this.model.populate(content, { path: "media" });
    });
  }

  // addContent({ contentInput }) {
  //   return this.model
  //     .findOneAndUpdate({ media: contentInput?.media }, contentInput, {
  //       upsert: true,
  //       new: true,
  //     })
  //     .populate("media")
  //     .exec();
  // }

  editContent({ contentId, contentInput }) {
    return this.model
      .findByIdAndUpdate(contentId, contentInput, { new: true })
      .populate("media")
      .exec();
  }

  deleteContent({ contentId }) {
    return this.model
      .findByIdAndUpdate(contentId, { enable: false }, { new: true })
      .populate("media")
      .exec();
  }
}

module.exports = ContentAPI;
