const { MongoDataSource } = require("apollo-datasource-mongodb");

class ContentAPI extends MongoDataSource {
  contents({
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
      .sort({ createdAt: -1 })
      .skip(offset)
      .limit(limit)
      .populate([
        "media",
        "likes",
        "purchases",
        {
          path: "purchased",
          match: { user: this.context.user._id },
        },
      ])
      .exec();
  }

  content({ contentId }) {
    return this.model
      .findById(contentId)
      .populate([
        "media",
        "likes",
        "purchases",
        {
          path: "purchased",
          match: { user: this.context.user._id },
        },
      ])
      .exec();
  }

  // addContent({ contentInput }) {
  //   const content = new this.model(contentInput);
  //   return content.save((err, content) => {
  //     return this.model.populate(content, { path: "media" });
  //   });
  // }

  addContent({ contentInput }) {
    return this.model
      .findOneAndUpdate({ media: contentInput?.media }, contentInput, {
        upsert: true,
        new: true,
      })
      .populate("media")
      .exec();
  }

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
