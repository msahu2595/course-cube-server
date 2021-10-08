const { UserInputError } = require("apollo-server");

const VoteResolver = {
  Query: {
    voters: async (
      _,
      { offset = 0, limit = 10, refId },
      { dataSources: { voteAPI } }
    ) => {
      try {
        const payload = await voteAPI.voters({
          offset,
          limit,
          refId,
        });
        return {
          code: 200,
          success: true,
          message: "Successfully get voters.",
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
    vote: async (_, { refId }, { dataSources: { voteAPI } }) => {
      try {
        const payload = await voteAPI.vote({ refId });
        return {
          code: "200",
          success: true,
          message: "You are successfully voted.",
          payload,
        };
      } catch (error) {
        throw new Error(error.message, error.extensions.code);
      }
    },
    unVote: async (_, { refId }, { dataSources: { voteAPI } }) => {
      try {
        const payload = await voteAPI.unVote({ refId });
        return {
          code: "200",
          success: true,
          message: "You are successfully un-voted.",
          payload,
        };
      } catch (error) {
        throw new Error(error.message, error.extensions.code);
      }
    },
  },
};

module.exports = VoteResolver;
