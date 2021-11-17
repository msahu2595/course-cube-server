const { UserInputError } = require("apollo-server");

const HeadlineResolver = {
  Query: {
    headlines: async (
      _,
      { offset = 0, limit = 10 },
      { dataSources: { headlineAPI } }
    ) => {
      try {
        const payload = await headlineAPI.headlines({
          offset,
          limit,
        });
        return {
          code: 200,
          success: true,
          message: "Successfully get headlines.",
          offset,
          limit,
          payload,
        };
      } catch (error) {
        throw new UserInputError(error.message, error.extensions.code);
      }
    },
  },
  Mutation: {
    createHeadline: async (
      _,
      { headlineInput },
      { dataSources: { headlineAPI } }
    ) => {
      try {
        const payload = await headlineAPI.createHeadline({ headlineInput });
        return {
          code: "200",
          success: true,
          message: "Headline added successfully.",
          payload,
        };
      } catch (error) {
        console.log(error);
        throw new UserInputError(error.message, error.extensions.code);
      }
    },
    editHeadline: async (
      _,
      { headlineId, headlineInput },
      { dataSources: { headlineAPI } }
    ) => {
      try {
        const payload = await headlineAPI.editHeadline({
          headlineId,
          headlineInput,
        });
        return {
          code: "200",
          success: true,
          message: "Headline edited successfully.",
          payload,
        };
      } catch (error) {
        throw new UserInputError(error.message, error.extensions.code);
      }
    },
    deleteHeadline: async (
      _,
      { headlineId },
      { dataSources: { headlineAPI } }
    ) => {
      try {
        const payload = await headlineAPI.deleteHeadline({ headlineId });
        return {
          code: "200",
          success: true,
          message: "Headline deleted successfully.",
          payload,
        };
      } catch (error) {
        throw new UserInputError(error.message, error.extensions.code);
      }
    },
  },
};

module.exports = HeadlineResolver;
