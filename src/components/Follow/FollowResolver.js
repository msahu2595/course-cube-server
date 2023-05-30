const { GraphQLError } = require("graphql");

const FollowResolver = {
  Query: {
    follower: async (
      _,
      { userId },
      { user, token, dataSources: { followAPI } }
    ) => {
      try {
        if (!user) throw new Error("Authentication token required.");
        const payload = await followAPI.follower({ userId });
        return {
          code: "200",
          success: true,
          message: `This user is${payload?._id ? " " : " not "} your follower.`,
          token,
          payload: payload?._id ? true : false,
        };
      } catch (error) {
        throw new GraphQLError(error.message);
      }
    },
    following: async (
      _,
      { userId },
      { user, token, dataSources: { followAPI } }
    ) => {
      try {
        if (!user) throw new Error("Authentication token required.");
        const payload = await followAPI.following({ userId });
        return {
          code: "200",
          success: true,
          message: `You are${payload?._id ? " " : " not "}following this user.`,
          token,
          payload: payload?._id ? true : false,
        };
      } catch (error) {
        throw new GraphQLError(error.message);
      }
    },
    followerList: async (
      _,
      { offset = 0, limit = 10, userId },
      { user, token, dataSources: { followAPI } }
    ) => {
      try {
        if (!user) throw new Error("Authentication token required.");
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
      { user, token, dataSources: { followAPI } }
    ) => {
      try {
        if (!user) throw new Error("Authentication token required.");
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
      { user, token, dataSources: { followAPI } }
    ) => {
      try {
        if (!user) throw new Error("Authentication token required.");
        if (user._id === followingId) {
          throw new GraphQLError("You can't follow or un-follow yourself.");
        }
        const payload = await followAPI.follow({ followingId });
        return {
          code: "200",
          success: true,
          message: `You are successfully${
            payload?._id ? " " : " not "
          }followed.`,
          token,
          payload: payload?._id ? true : false,
        };
      } catch (error) {
        throw new Error(error.message, error.extensions.code);
      }
    },
    unFollow: async (
      _,
      { followingId },
      { user, token, dataSources: { followAPI } }
    ) => {
      try {
        if (!user) throw new Error("Authentication token required.");
        if (user._id === followingId) {
          throw new GraphQLError("You can't follow or un-follow yourself.");
        }
        const payload = await followAPI.unFollow({ followingId });
        return {
          code: "200",
          success: true,
          message: `You are successfully${
            payload?.deletedCount ? " " : " not "
          }un-followed.`,
          token,
          payload: payload?.deletedCount ? true : false,
        };
      } catch (error) {
        throw new Error(error.message, error.extensions.code);
      }
    },
  },
};

module.exports = FollowResolver;
