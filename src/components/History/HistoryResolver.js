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
    addHistory: async (
      _,
      { refId, type },
      { token, dataSources: { historyAPI } }
    ) => {
      try {
        const payload = await historyAPI.addHistory({ refId, type });
        return {
          code: "200",
          success: true,
          message: "You are successfully added history.",
          token,
          payload,
        };
      } catch (error) {
        throw new Error(error.message, error.extensions.code);
      }
    },
    removeHistory: async (
      _,
      { historyId },
      { token, dataSources: { historyAPI } }
    ) => {
      try {
        const payload = await historyAPI.removeHistory({ historyId });
        return {
          code: "200",
          success: true,
          message: "You are successfully removed history.",
          token,
          payload,
        };
      } catch (error) {
        throw new Error(error.message, error.extensions.code);
      }
    },
  },
};

module.exports = HistoryResolver;
