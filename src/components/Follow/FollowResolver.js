const { GraphQLError } = require("graphql");

const FollowResolver = {
  Query: {
    followerList: async (
      _,
      { offset = 0, limit = 10, userId },
      { dataSources: { followAPI } }
    ) => {
      try {
        const payload = await followAPI.followerList({
          offset,
          limit,
          userId,
        });
        return {
          code: 200,
          success: true,
          message: "Successfully get your followers.",
          limit,
          offset,
          payload,
        };
      } catch (error) {
        throw new GraphQLError(error.message);
      }
    },
    followingList: async (
      _,
      { offset = 0, limit = 10, userId },
      { dataSources: { followAPI } }
    ) => {
      try {
        const payload = await followAPI.followingList({
          offset,
          limit,
          userId,
        });
        return {
          code: 200,
          success: true,
          message: "Successfully get your followings.",
          limit,
          offset,
          payload,
        };
      } catch (error) {
        throw new GraphQLError(error.message);
      }
    },
  },
  Mutation: {
    follow: async (
      _,
      { followingId },
      { dataSources: { followAPI, notificationAPI }, user: { _id: followerId } }
    ) => {
      try {
        if (followerId === followingId) {
          throw new UserInputError("You can't follow or un-follow yourself.");
        }
        const payload = await followAPI.follow({ followingId });
        const { following } = payload;
        notificationAPI.createNotification({
          userId: followingId,
          image: following?.image,
          title: `${following?.firstName} followed you`,
          message: "You can also follow him.",
          route: "UserProfileScreen",
          params: { userId: followingId },
        });
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
        const payload = await followAPI.unFollow({ followingId });
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
