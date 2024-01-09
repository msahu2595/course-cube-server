const { GraphQLError } = require("graphql");
const fileHandler = require("../../libs/fileHandler");

const ArticleResolver = {
  Query: {
    articles: async (
      _,
      { offset = 0, limit = 10, search, filter },
      { token, dataSources: { articleAPI } }
    ) => {
      try {
        const payload = await articleAPI.articles({
          offset,
          limit,
          search,
          ...filter,
        });
        return {
          code: 200,
          success: true,
          message: "Successfully get articles.",
          token,
          limit,
          offset,
          search,
          filter,
          payload,
        };
      } catch (error) {
        throw new GraphQLError(error.message);
      }
    },
    article: async (
      _,
      { articleId },
      { token, dataSources: { articleAPI, historyAPI } }
    ) => {
      try {
        const payload = await articleAPI.article({
          articleId,
        });
        historyAPI.addHistory({
          refId: articleId,
          type: "Article",
        });
        return {
          code: 200,
          success: true,
          message: "Successfully get article.",
          token,
          payload,
        };
      } catch (error) {
        throw new GraphQLError(error.message);
      }
    },
  },
  Mutation: {
    createArticle: async (
      _,
      { articleInput },
      { token, dataSources: { articleAPI } }
    ) => {
      try {
        if (articleInput.image) {
          articleInput.image = await fileHandler.moveFromTmp({
            filePath: articleInput.image,
            folderName: "article",
          });
        }
        const payload = await articleAPI.createArticle({ articleInput });
        return {
          code: "200",
          success: true,
          message: "Article added successfully.",
          token,
          payload,
        };
      } catch (error) {
        console.log(error);
        throw new GraphQLError(error.message);
      }
    },
    editArticle: async (
      _,
      { articleId, articleInput },
      { token, dataSources: { articleAPI } }
    ) => {
      try {
        if (articleInput.image) {
          const article = await articleAPI.article({ articleId });
          articleInput.image = await fileHandler.moveFromTmp({
            filePath: articleInput.image,
            folderName: "article",
          });
          if (/^assets\/article\/.*$/gm.test(article.image)) {
            fileHandler.remove({ filePath: article.image });
          }
        }
        const payload = await articleAPI.editArticle({
          articleId,
          articleInput,
        });
        return {
          code: "200",
          success: true,
          message: "Article edited successfully.",
          token,
          payload,
        };
      } catch (error) {
        throw new GraphQLError(error.message);
      }
    },
    deleteArticle: async (
      _,
      { articleId },
      { token, dataSources: { articleAPI } }
    ) => {
      try {
        const article = await articleAPI.article({ articleId });
        if (/^assets\/article\/.*$/gm.test(article.image)) {
          fileHandler.remove({ filePath: article.image });
        }
        const payload = await articleAPI.deleteArticle({ articleId });
        return {
          code: "200",
          success: true,
          message: "Article deleted successfully.",
          token,
          payload,
        };
      } catch (error) {
        throw new GraphQLError(error.message);
      }
    },
  },
};

module.exports = ArticleResolver;
