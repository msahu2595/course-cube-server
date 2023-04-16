const { GraphQLError } = require("graphql");

const BookmarkResolver = {
  Ref: {
    __resolveType(obj) {
      // Only Bundle has a time field
      if (Object.hasOwn(obj, "syllabus")) {
        return "Bundle";
      }
      // Only BundleContent has a duration field
      if (Object.hasOwn(obj, "subjectId")) {
        return "BundleContent";
      }
      // Only Article has a duration field
      if (Object.hasOwn(obj, "author")) {
        return "Article";
      }
      // Only Question has a duration field
      if (Object.hasOwn(obj, "options")) {
        return "Question";
      }
      // Only Answer has a pages field
      if (Object.hasOwn(obj, "answer")) {
        return "Answer";
      }
      return "Content";
    },
  },
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
          success: payload?._id ? true : false,
          message: `You are${
            payload?._id ? " " : " not "
          }successfully bookmarked.`,
          token,
        };
      } catch (error) {
        throw new Error(error.message, error.extensions.code);
      }
    },
    unbookmark: async (
      _,
      { refId },
      { token, dataSources: { bookmarkAPI } }
    ) => {
      try {
        const payload = await bookmarkAPI.unbookmark({ refId });
        return {
          code: "200",
          success: payload?.deletedCount ? true : false,
          message: `You are${
            payload?.deletedCount ? " " : " not "
          }successfully un-bookmarked.`,
          token,
        };
      } catch (error) {
        throw new Error(error.message, error.extensions.code);
      }
    },
  },
};

module.exports = BookmarkResolver;
