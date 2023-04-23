const { MongoDataSource } = require("apollo-datasource-mongodb");

class ArticleAPI extends MongoDataSource {
  constructor(options) {
    super(options); // this sends our server's `cache` through
    this.model = options.ArticleModel;
    this.context = options.context;
  }

  articles({
    offset,
    limit,
    search,
    author,
    tag,
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
    if (author) {
      filter["author"] = author;
    }
    if (tag) {
      filter["tags"] = tag;
    }
    if (search) {
      filter["$text"] = { $search: search };
    }
    const populateArray = ["likes"];
    return this.model
      .find(filter)
      .sort({ updatedAt: -1 })
      .skip(offset)
      .limit(limit)
      .populate(populateArray)
      .exec();
  }

  article({ articleId }) {
    const populateArray = ["likes"];
    if (this.context?.user?._id) {
      populateArray.push({
        path: "liked",
        match: { user: this.context?.user?._id },
      });
      populateArray.push({
        path: "bookmarked",
        match: { user: this.context?.user?._id },
      });
    }
    return this.model.findById(articleId).populate(populateArray).exec();
  }

  createArticle({ articleInput }) {
    return this.model.create(articleInput);
  }

  editArticle({ articleId, articleInput }) {
    return this.model
      .findByIdAndUpdate(articleId, articleInput, { new: true })
      .exec();
  }

  deleteArticle({ articleId }) {
    return this.model
      .findByIdAndUpdate(articleId, { enable: false }, { new: true })
      .exec();
  }
}

module.exports = ArticleAPI;
