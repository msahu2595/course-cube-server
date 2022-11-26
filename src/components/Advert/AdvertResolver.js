const { GraphQLError } = require("graphql");

const AdvertResolver = {
  Query: {
    adverts: async (
      _,
      { offset = 0, limit = 10, filter },
      { dataSources: { advertAPI } }
    ) => {
      try {
        const payload = await advertAPI.adverts({
          offset,
          limit,
          ...filter,
        });
        return {
          code: 200,
          success: true,
          message: "Successfully get adverts.",
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
    createAdvert: async (
      _,
      { advertInput },
      { dataSources: { advertAPI } }
    ) => {
      try {
        const payload = await advertAPI.createAdvert({ advertInput });
        return {
          code: "200",
          success: true,
          message: "Advert added successfully.",
          payload,
        };
      } catch (error) {
        console.log(error);
        throw new GraphQLError(error.message);
      }
    },
    editAdvert: async (
      _,
      { advertId, advertInput },
      { dataSources: { advertAPI } }
    ) => {
      try {
        const payload = await advertAPI.editAdvert({
          advertId,
          advertInput,
        });
        return {
          code: "200",
          success: true,
          message: "Advert edited successfully.",
          payload,
        };
      } catch (error) {
        throw new GraphQLError(error.message);
      }
    },
    deleteAdvert: async (_, { advertId }, { dataSources: { advertAPI } }) => {
      try {
        const payload = await advertAPI.deleteAdvert({ advertId });
        return {
          code: "200",
          success: true,
          message: "Advert deleted successfully.",
          payload,
        };
      } catch (error) {
        throw new GraphQLError(error.message);
      }
    },
  },
};

module.exports = AdvertResolver;
