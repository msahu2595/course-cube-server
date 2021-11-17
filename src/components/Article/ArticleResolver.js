const { UserInputError } = require("apollo-server");

const ArticleResolver = {
  Query: {
    articles: async (
      _,
      { offset = 0, limit = 10 },
      { dataSources: { articleAPI } }
    ) => {
      try {
        const payload = await articleAPI.articles({
          offset,
          limit,
        });
        return {
          code: 200,
          success: true,
          message: "Successfully get articles.",
          offset,
          limit,
          payload,
        };
      } catch (error) {
        throw new UserInputError(error.message, error.extensions.code);
      }
    },
    article: async (_, { articleId }, { dataSources: { articleAPI } }) => {
      try {
        const payload = await articleAPI.article({
          articleId,
        });
        return {
          code: 200,
          success: true,
          message: "Successfully get article.",
          payload,
        };
      } catch (error) {
        throw new UserInputError(error.message, error.extensions.code);
      }
    },
  },
  Mutation: {
    createArticle: async (
      _,
      { articleInput },
      { dataSources: { articleAPI } }
    ) => {
      try {
        const payload = await articleAPI.createArticle({ articleInput });
        return {
          code: "200",
          success: true,
          message: "Article added successfully.",
          payload,
        };
      } catch (error) {
        console.log(error);
        throw new UserInputError(error.message, error.extensions.code);
      }
    },
    editArticle: async (
      _,
      { articleId, articleInput },
      { dataSources: { articleAPI } }
    ) => {
      try {
        const payload = await articleAPI.editArticle({
          articleId,
          articleInput,
        });
        return {
          code: "200",
          success: true,
          message: "Article edited successfully.",
          payload,
        };
      } catch (error) {
        throw new UserInputError(error.message, error.extensions.code);
      }
    },
    deleteArticle: async (
      _,
      { articleId },
      { dataSources: { articleAPI } }
    ) => {
      try {
        const payload = await articleAPI.deleteArticle({ articleId });
        return {
          code: "200",
          success: true,
          message: "Article deleted successfully.",
          payload,
        };
      } catch (error) {
        throw new UserInputError(error.message, error.extensions.code);
      }
    },
  },
};

module.exports = ArticleResolver;
