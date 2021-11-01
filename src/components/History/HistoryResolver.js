const { UserInputError } = require("apollo-server");

const HistoryResolver = {
  Query: {
    history: async (
      _,
      { offset = 0, limit = 10, filter },
      { dataSources: { historyAPI } }
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
          limit,
          offset,
          filter,
          payload,
        };
      } catch (error) {
        throw new UserInputError(error.message, error.extensions.code);
      }
    },
    historyUsers: async (
      _,
      { offset = 0, limit = 10, refId },
      { dataSources: { historyAPI } }
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
    addHistory: async (_, { refId, type }, { dataSources: { historyAPI } }) => {
      try {
        const payload = await historyAPI.addHistory({ refId, type });
        return {
          code: "200",
          success: true,
          message: "You are successfully added history.",
          payload,
        };
      } catch (error) {
        throw new Error(error.message, error.extensions.code);
      }
    },
    removeHistory: async (
      _,
      { historyId },
      { dataSources: { historyAPI } }
    ) => {
      try {
        const payload = await historyAPI.removeHistory({ historyId });
        return {
          code: "200",
          success: true,
          message: "You are successfully removed history.",
          payload,
        };
      } catch (error) {
        throw new Error(error.message, error.extensions.code);
      }
    },
  },
};

module.exports = HistoryResolver;
