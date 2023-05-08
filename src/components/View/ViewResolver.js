const { GraphQLError } = require("graphql");

const ViewResolver = {
  Query: {
    viewedUsers: async (
      _,
      { offset = 0, limit = 10, refId },
      { token, dataSources: { viewAPI } }
    ) => {
      try {
        const payload = await viewAPI.viewedUsers({
          offset,
          limit,
          refId,
        });
        return {
          code: 200,
          success: true,
          message: "Successfully get viewed users.",
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
    addView: async (_, { refId }, { token, dataSources: { viewAPI } }) => {
      try {
        const payload = await viewAPI.addView({ refId });
        return {
          code: "200",
          success: payload?._id ? true : false,
          message: `Content has been ${
            payload?._id ? "" : "not"
          } watched/attempted/read.`,
          token,
        };
      } catch (error) {
        throw new Error(error.message, error.extensions.code);
      }
    },
  },
};

module.exports = ViewResolver;
