const { GraphQLError } = require("graphql");

const BookmarkResolver = {
  Ref: {
    __resolveType(obj) {
      const keys = Object.keys(obj?._doc);
      // Only Bundle has a syllabus field
      if (keys.includes("syllabus")) {
        return "Bundle";
      }
      // Only BundleContent has a subjectId field
      if (keys.includes("subjectId")) {
        return "BundleContent";
      }
      // Only Article has a author field
      if (keys.includes("author")) {
        return "Article";
      }
      // Only Question has a options field
      if (keys.includes("options")) {
        return "Question";
      }
      // Only Answer has a answer field
      if (keys.includes("answer")) {
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
      { refId, type, subType = null },
      { token, dataSources: { bookmarkAPI } }
    ) => {
      try {
        const payload = await bookmarkAPI.bookmark({ refId, type, subType });
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
