const { GraphQLError } = require("graphql");

const HistoryResolver = {
  Query: {
    history: async (
      _,
      { offset = 0, limit = 10, filter },
      { token, dataSources: { historyAPI } }
    ) => {
      try {
        const payload = await historyAPI.history({
          offset,
          limit,
          ...filter,
        });
        return {
          code: 200,
          success: true,
          message: "Successfully get history.",
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
    historyUsers: async (
      _,
      { offset = 0, limit = 10, refId },
      { token, dataSources: { historyAPI } }
    ) => {
      try {
        const payload = await historyAPI.historyUsers({
          offset,
          limit,
          refId,
        });
        return {
          code: 200,
          success: true,
          message: "Successfully get history users.",
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
    removeHistory: async (
      _,
      { refId },
      { token, dataSources: { historyAPI } }
    ) => {
      try {
        const payload = await historyAPI.removeHistory({ refId });
        return {
          code: "200",
          success: payload?._id ? true : false,
          message: `${
            payload?._id ? "Removed" : "Not removed"
          } from your history.`,
          token,
        };
      } catch (error) {
        throw new Error(error.message, error.extensions.code);
      }
    },
  },
};

module.exports = HistoryResolver;
