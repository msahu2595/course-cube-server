const { GraphQLError } = require("graphql");

const BookmarkResolver = {
  Query: {
    bookmarks: async (
      _,
      { offset = 0, limit = 10, filter },
      { token, dataSources: { bookmarkAPI } }
    ) => {
      try {
        const payload = await bookmarkAPI.bookmarks({
          offset,
          limit,
          ...filter,
        });
        return {
          code: 200,
          success: true,
          message: "Successfully get bookmarks.",
          token,
          limit,
          offset,
          filter,
          payload,
        };
      } catch (error) {
        throw new GraphQLError(error.message);
      }
    },
    bookmarkedUsers: async (
      _,
      { offset = 0, limit = 10, refId },
      { token, dataSources: { bookmarkAPI } }
    ) => {
      try {
        const payload = await bookmarkAPI.bookmarkedUsers({
          offset,
          limit,
          refId,
        });
        return {
          code: 200,
          success: true,
          message: "Successfully get bookmarked users.",
          token,
          limit,
          offset,
          refId,
          payload,
        };
      } catch (error) {
        throw new GraphQLError(error.message);
      }
    },
  },
  Mutation: {
    bookmark: async (
      _,
      { refId, type },
      { token, dataSources: { bookmarkAPI } }
    ) => {
      try {
        const payload = await bookmarkAPI.bookmark({ refId, type });
        return {
          code: "200",
          success: true,
          message: "You are successfully bookmarked.",
          token,
          payload,
        };
      } catch (error) {
        throw new Error(error.message, error.extensions.code);
      }
    },
    unbookmark: async (
      _,
      { refId, type },
      { token, dataSources: { bookmarkAPI } }
    ) => {
      try {
        const payload = await bookmarkAPI.unbookmark({ refId, type });
        return {
          code: "200",
          success: true,
          message: "You are successfully un-bookmarked.",
          token,
          payload,
        };
      } catch (error) {
        throw new Error(error.message, error.extensions.code);
      }
    },
  },
};

module.exports = BookmarkResolver;
