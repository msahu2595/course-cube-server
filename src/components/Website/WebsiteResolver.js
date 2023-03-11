const { GraphQLError } = require("graphql");

const WebsiteResolver = {
  Query: {
    websites: async (
      _,
      { offset = 0, limit = 10 },
      { token, dataSources: { websiteAPI } }
    ) => {
      try {
        const payload = await websiteAPI.websites({
          offset,
          limit,
        });
        return {
          code: 200,
          success: true,
          message: "Successfully get websites.",
          token,
          offset,
          limit,
          payload,
        };
      } catch (error) {
        throw new GraphQLError(error.message);
      }
    },
  },
  Mutation: {
    addWebsite: async (
      _,
      { websiteInput },
      { token, dataSources: { websiteAPI } }
    ) => {
      try {
        const payload = await websiteAPI.addWebsite({ websiteInput });
        return {
          code: "200",
          success: true,
          message: "Website added successfully.",
          token,
          payload,
        };
      } catch (error) {
        console.log(error);
        throw new GraphQLError(error.message);
      }
    },
    editWebsite: async (
      _,
      { websiteId, websiteInput },
      { token, dataSources: { websiteAPI } }
    ) => {
      try {
        const payload = await websiteAPI.editWebsite({
          websiteId,
          websiteInput,
        });
        return {
          code: "200",
          success: true,
          message: "Website edited successfully.",
          token,
          payload,
        };
      } catch (error) {
        throw new GraphQLError(error.message);
      }
    },
    deleteWebsite: async (
      _,
      { websiteId },
      { token, dataSources: { websiteAPI } }
    ) => {
      try {
        const payload = await websiteAPI.deleteWebsite({ websiteId });
        return {
          code: "200",
          success: true,
          message: "Website deleted successfully.",
          token,
          payload,
        };
      } catch (error) {
        throw new GraphQLError(error.message);
      }
    },
  },
};

module.exports = WebsiteResolver;
