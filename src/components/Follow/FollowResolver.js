const { GraphQLError } = require("graphql");

const FollowResolver = {
  Query: {
    followerList: async (
      _,
      { offset = 0, limit = 10, userId },
      { token, dataSources: { followAPI } }
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
          token,
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
      { token, dataSources: { followAPI } }
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
          token,
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
      { token, dataSources: { followAPI }, user: { _id: followerId } }
    ) => {
      try {
        if (followerId === followingId) {
          throw new GraphQLError("You can't follow or un-follow yourself.");
        }
        const payload = await followAPI.follow({ followingId });
        return {
          code: "200",
          success: payload?._id ? true : false,
          message: `You are successfully${
            payload?._id ? " " : " not "
          }followed.`,
          token,
        };
      } catch (error) {
        throw new Error(error.message, error.extensions.code);
      }
    },
    unFollow: async (
      _,
      { followingId },
      { token, dataSources: { followAPI }, user: { _id: followerId } }
    ) => {
      try {
        if (followerId === followingId) {
          throw new GraphQLError("You can't follow or un-follow yourself.");
        }
        const payload = await followAPI.unFollow({ followingId });
        return {
          code: "200",
          success: payload?.deletedCount ? true : false,
          message: `You are successfully${
            payload?.deletedCount ? " " : " not "
          }un-followed.`,
          token,
        };
      } catch (error) {
        throw new Error(error.message, error.extensions.code);
      }
    },
  },
};

module.exports = FollowResolver;
