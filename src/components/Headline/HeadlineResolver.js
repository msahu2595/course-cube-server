const { GraphQLError } = require("graphql");
const fileHandler = require("../../libs/fileHandler");

const HeadlineResolver = {
  Query: {
    headlines: async (
      _,
      { offset = 0, limit = 10, search, filter },
      { token, dataSources: { headlineAPI } }
    ) => {
      try {
        const payload = await headlineAPI.headlines({
          offset,
          limit,
          search,
          ...filter,
        });
        return {
          code: 200,
          success: true,
          message: "Successfully get headlines.",
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
    createHeadline: async (
      _,
      { headlineInput },
      { token, dataSources: { headlineAPI } }
    ) => {
      try {
        if (headlineInput.image) {
          headlineInput.image = await fileHandler.moveFromTmp({
            filePath: headlineInput.image,
            folderName: "headline",
          });
        }
        const payload = await headlineAPI.createHeadline({ headlineInput });
        return {
          code: "200",
          success: true,
          message: "Headline added successfully.",
          token,
          payload,
        };
      } catch (error) {
        console.log(error);
        throw new GraphQLError(error.message);
      }
    },
    editHeadline: async (
      _,
      { headlineId, headlineInput },
      { token, dataSources: { headlineAPI } }
    ) => {
      try {
        if (headlineInput.image) {
          const headline = await headlineAPI.headline({ headlineId });
          headlineInput.image = await fileHandler.moveFromTmp({
            filePath: headlineInput.image,
            folderName: "headline",
          });
          if (/^assets\/headline\/.*$/gm.test(headline.image)) {
            fileHandler.remove({ filePath: headline.image });
          }
        }
        const payload = await headlineAPI.editHeadline({
          headlineId,
          headlineInput,
        });
        return {
          code: "200",
          success: true,
          message: "Headline edited successfully.",
          token,
          payload,
        };
      } catch (error) {
        throw new GraphQLError(error.message);
      }
    },
    deleteHeadline: async (
      _,
      { headlineId },
      { token, dataSources: { headlineAPI } }
    ) => {
      try {
        const headline = await headlineAPI.headline({ headlineId });
        if (/^assets\/headline\/.*$/gm.test(headline.image)) {
          fileHandler.remove({ filePath: headline.image });
        }
        const payload = await headlineAPI.deleteHeadline({ headlineId });
        return {
          code: "200",
          success: true,
          message: "Headline deleted successfully.",
          token,
          payload,
        };
      } catch (error) {
        throw new GraphQLError(error.message);
      }
    },
  },
};

module.exports = HeadlineResolver;
