const { GraphQLError } = require("graphql");

const LikeResolver = {
  Query: {
    likedUsers: async (
      _,
      { offset = 0, limit = 10, refId, filter },
      { token, dataSources: { likeAPI } }
    ) => {
      try {
        const payload = await likeAPI.likedUsers({
          offset,
          limit,
          refId,
          ...filter,
        });
        return {
          code: 200,
          success: true,
          message: "Successfully get liked users.",
          token,
          limit,
          offset,
          refId,
          filter,
          payload,
        };
      } catch (error) {
        throw new GraphQLError(error.message);
      }
    },
  },
  Mutation: {
    like: async (_, { refId, type }, { token, dataSources: { likeAPI } }) => {
      try {
        const payload = await likeAPI.like({ refId, type });
        return {
          code: "200",
          success: payload?._id ? true : false,
          message: `You are${payload?._id ? " " : " not "}successfully like.`,
          token,
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
          success: payload?.deletedCount ? true : false,
          message: `You are${
            payload?.deletedCount ? " " : " not "
          }successfully unlike.`,
          token,
        };
      } catch (error) {
        throw new Error(error.message, error.extensions.code);
      }
    },
  },
};

module.exports = LikeResolver;
