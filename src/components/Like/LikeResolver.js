const { GraphQLError } = require("graphql");

const LikeResolver = {
  Query: {
    likedUsers: async (
      _,
      { offset = 0, limit = 10, refId },
      { token, dataSources: { likeAPI } }
    ) => {
      try {
        const payload = await likeAPI.likedUsers({
          offset,
          limit,
          refId,
        });
        return {
          code: 200,
          success: true,
          message: "Successfully get liked users.",
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
    like: async (_, { refId }, { token, dataSources: { likeAPI } }) => {
      try {
        const payload = await likeAPI.like({ refId });
        return {
          code: "200",
          success: true,
          message: "You are successfully like.",
          token,
          payload,
        };
      } catch (error) {
        throw new Error(error.message, error.extensions.code);
      }
    },
    unlike: async (_, { refId }, { token, dataSources: { likeAPI } }) => {
      try {
        const payload = await likeAPI.unlike({ refId });
        return {
          code: "200",
          success: true,
          message: "You are successfully unlike.",
          token,
          payload,
        };
      } catch (error) {
        throw new Error(error.message, error.extensions.code);
      }
    },
  },
};

module.exports = LikeResolver;
