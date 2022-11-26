const { GraphQLError } = require("graphql");

const ArticleResolver = {
  Query: {
    articles: async (
      _,
      { offset = 0, limit = 10, search, filter },
      { dataSources: { articleAPI } }
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
        throw new GraphQLError(error.message);
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
        throw new GraphQLError(error.message);
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
        throw new GraphQLError(error.message);
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
        throw new GraphQLError(error.message);
      }
    },
  },
};

module.exports = ArticleResolver;
