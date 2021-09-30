const { UserInputError } = require("apollo-server");

const FollowResolver = {
  Query: {},
  Mutation: {
    follow: async (
      _,
      { followingId },
      { dataSources: { followAPI }, account: { _id: followerId } }
    ) => {
      try {
        if (followerId === followingId) {
          throw new Error("You can't follow or un-follow yourself.");
        }
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
    unFollow: async (
      _,
      { followingId },
      { dataSources: { followAPI }, account: { _id: followerId } }
    ) => {
      try {
        if (followerId === followingId) {
          throw new Error("You can't follow or un-follow yourself.");
        }
        const follow = await followAPI.unFollow(followingId);
        console.log({
          code: "200",
          success: true,
          message: "You are successfully un-followed.",
          follow,
        });
        return {
          code: "200",
          success: true,
          message: "You are successfully un-followed.",
          follow,
        };
      } catch (error) {
        // logger.error(error);
        console.log(error);
        throw new UserInputError(error.message || "Invalid argument value");
      }
    },
  },
};

module.exports = FollowResolver;
