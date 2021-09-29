const { UserInputError } = require("apollo-server");

const FollowResolver = {
  Query: {},
  Mutation: {
    follow: async (_, { followingId }, { dataSources: { followAPI } }) => {
      try {
        const follow = await followAPI.follow(followingId);
        console.log({
          code: "200",
          success: true,
          message: "You are successfully followed.",
          follow,
        });
        return {
          code: "200",
          success: true,
          message: "You are successfully followed.",
          follow,
        };
      } catch (error) {
        // logger.error(error);
        console.log(error);
        throw new UserInputError("Invalid argument value");
      }
    },
  },
};

module.exports = FollowResolver;
