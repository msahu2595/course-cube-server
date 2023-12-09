const { GraphQLError } = require("graphql");
const fileHandler = require("../../libs/fileHandler");

const AdvertResolver = {
  Query: {
    adverts: async (
      _,
      { offset = 0, limit = 10, filter },
      { token, dataSources: { advertAPI } }
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
    createAdvert: async (
      _,
      { advertInput },
      { token, dataSources: { advertAPI } }
    ) => {
      try {
        advertInput.image = await fileHandler.moveFromTmp({
          filePath: advertInput.image,
          folderName: "advert",
        });
        const payload = await advertAPI.createAdvert({ advertInput });
        return {
          code: "200",
          success: true,
          message: "Advert added successfully.",
          token,
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
      { token, dataSources: { advertAPI } }
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
          token,
          payload,
        };
      } catch (error) {
        throw new GraphQLError(error.message);
      }
    },
    deleteAdvert: async (
      _,
      { advertId },
      { token, dataSources: { advertAPI } }
    ) => {
      try {
        const payload = await advertAPI.deleteAdvert({ advertId });
        return {
          code: "200",
          success: true,
          message: "Advert deleted successfully.",
          token,
          payload,
        };
      } catch (error) {
        throw new GraphQLError(error.message);
      }
    },
  },
};

module.exports = AdvertResolver;
