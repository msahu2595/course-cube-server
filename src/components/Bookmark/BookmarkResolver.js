const { UserInputError } = require("apollo-server");

const BookmarkResolver = {
  Query: {
    bookmarks: async (
      _,
      { offset = 0, limit = 10, filter },
      { dataSources: { bookmarkAPI } }
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
          limit,
          offset,
          filter,
          payload,
        };
      } catch (error) {
        throw new UserInputError(error.message, error.extensions.code);
      }
    },
    bookmarkedUsers: async (
      _,
      { offset = 0, limit = 10, refId },
      { dataSources: { bookmarkAPI } }
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
          limit,
          offset,
          refId,
          payload,
        };
      } catch (error) {
        throw new UserInputError(error.message, error.extensions.code);
      }
    },
  },
  Mutation: {
    bookmark: async (_, { refId }, { dataSources: { bookmarkAPI } }) => {
      try {
        const payload = await bookmarkAPI.bookmark({ refId });
        return {
          code: "200",
          success: true,
          message: "You are successfully bookmarked.",
          payload,
        };
      } catch (error) {
        throw new Error(error.message, error.extensions.code);
      }
    },
    unBookmark: async (_, { refId }, { dataSources: { bookmarkAPI } }) => {
      try {
        const payload = await bookmarkAPI.unBookmark({ refId });
        return {
          code: "200",
          success: true,
          message: "You are successfully un-bookmarked.",
          payload,
        };
      } catch (error) {
        throw new Error(error.message, error.extensions.code);
      }
    },
  },
};

module.exports = BookmarkResolver;
