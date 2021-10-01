const { UserInputError } = require("apollo-server");

const FollowResolver = {
  Query: {
    followerList: async (
      _,
      { limit = 1, offset = 0, userId },
      { dataSources: { followAPI } }
    ) => {
      try {
        const payload = await followAPI.followerList(userId);
        console.log(payload);
        return {
          code: 200,
          success: true,
          message: "Successfully get your followers.",
          limit,
          offset,
          payload,
        };
      } catch (error) {
        throw new UserInputError(error.message, error.extensions.code);
      }
    },
    followingList: async (
      _,
      { limit = 1, offset = 0, userId },
      { dataSources: { followAPI } }
    ) => {
      try {
        const payload = await followAPI.followingList(userId);
        return {
          code: 200,
          success: true,
          message: "Successfully get your followings.",
          limit,
          offset,
          payload,
        };
      } catch (error) {
        throw new UserInputError(error.message, error.extensions.code);
      }
    },
  },
  Mutation: {
    follow: async (
      _,
      { followingId },
      { dataSources: { followAPI }, user: { _id: followerId } }
    ) => {
      try {
        if (followerId === followingId) {
          throw new UserInputError("You can't follow or un-follow yourself.");
        }
        const payload = await followAPI.follow(followingId);
        return {
          code: "200",
          success: true,
          message: "You are successfully followed.",
          payload,
        };
      } catch (error) {
        throw new Error(error.message, error.extensions.code);
      }
    },
    unFollow: async (
      _,
      { followingId },
      { dataSources: { followAPI }, user: { _id: followerId } }
    ) => {
      try {
        if (followerId === followingId) {
          throw new UserInputError("You can't follow or un-follow yourself.");
        }
        const payload = await followAPI.unFollow(followingId);
        return {
          code: "200",
          success: true,
          message: "You are successfully un-followed.",
          payload,
        };
      } catch (error) {
        throw new Error(error.message, error.extensions.code);
      }
    },
  },
};

module.exports = FollowResolver;
