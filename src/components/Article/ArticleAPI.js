const { MongoDataSource } = require("apollo-datasource-mongodb");

class ArticleAPI extends MongoDataSource {
  articles({ offset, limit }) {
    return this.model
      .find({ enable: true })
      .skip(offset)
      .limit(limit)
      .sort("createdAt")
      .exec();
  }

  article({ articleId }) {
    return this.model.findById(articleId).populate("likes").exec();
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
