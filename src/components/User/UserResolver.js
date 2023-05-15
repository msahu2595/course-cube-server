const { GraphQLError } = require("graphql");
const verifyIdToken = require("../../libs/verifyIdToken");
const {
  createAccessToken,
  createRefreshToken,
} = require("../../libs/manageToken");

const UserResolver = {
  ListResponse: {
    __resolveType() {
      return null;
    },
  },
  Response: {
    __resolveType() {
      return null;
    },
  },
  Query: {
    users: async (
      _,
      { offset = 0, limit = 10, search, filter },
      { token, dataSources: { userAPI } }
    ) => {
      try {
        const payload = await userAPI.users({
          offset,
          limit,
          search,
          ...filter,
        });
        return {
          code: 200,
          success: true,
          message: "Successfully get users.",
          token,
          limit,
          offset,
          search,
          filter,
          payload,
        };
      } catch (error) {
        throw new GraphQLError(error.message);
      }
    },
    user: async (_, { userId }, { dataSources: { userAPI }, user, token }) => {
      if (!user) throw new Error("Authentication token required.");
      try {
        const payload = await userAPI.user({ userId });
        return {
          code: "200",
          success: true,
          message: "Successful",
          token,
          refresh: null,
          payload,
        };
      } catch (error) {
        throw new GraphQLError(error.message);
      }
    },
    statistics: async (
      _,
      { userId },
      { dataSources: { userAPI }, user, token }
    ) => {
      if (!user) throw new Error("Authentication token required.");
      try {
        const payload = await userAPI.statistics({ userId });
        return {
          code: "200",
          success: true,
          message: "Successful",
          token,
          payload,
        };
      } catch (error) {
        throw new GraphQLError(error.message);
      }
    },
    weeklyLeaderboard: async (
      _,
      { offset = 0, limit = 10 },
      { dataSources: { historyAPI, userAPI }, user, token }
    ) => {
      if (!user) throw new Error("Authentication token required.");
      try {
        const userIdsWithCount = await historyAPI.weeklyLeaderboardUserIds({
          offset,
          limit,
        });
        const payload = await userAPI.usersFromIds({
          userIds: userIdsWithCount.map((user) => user._id),
        });
        return {
          code: "200",
          success: true,
          message: "Successful",
          token,
          offset,
          limit,
          payload,
        };
      } catch (error) {
        throw new GraphQLError(error.message);
      }
    },
    monthlyLeaderboard: async (
      _,
      { offset = 0, limit = 10 },
      { dataSources: { historyAPI, userAPI }, user, token }
    ) => {
      if (!user) throw new Error("Authentication token required.");
      try {
        const userIdsWithCount = await historyAPI.monthlyLeaderboardUserIds({
          offset,
          limit,
        });
        const payload = await userAPI.usersFromIds({
          userIds: userIdsWithCount.map((user) => user._id),
        });
        return {
          code: "200",
          success: true,
          message: "Successful",
          token,
          offset,
          limit,
          payload,
        };
      } catch (error) {
        throw new GraphQLError(error.message);
      }
    },
  },
  Mutation: {
    googleLogIn: async (
      _,
      { idToken, acceptTnC, FCMToken, webLogin },
      { redis, dataSources: { userAPI } }
    ) => {
      try {
        if (!acceptTnC) {
          throw new GraphQLError("Please accept terms & conditions.");
        }
        const {
          email,
          email_verified: emailVerified,
          name: fullName,
          picture,
        } = await verifyIdToken(idToken, webLogin);
        const payload = await userAPI.logIn({
          email,
          emailVerified,
          fullName,
          picture,
          acceptTnC,
          FCMToken,
          platform: "android",
        });
        const accessToken = createAccessToken(payload.toJSON());
        const refreshToken = createRefreshToken(payload.toJSON());
        redis.set(payload._id, refreshToken, "ex", 604800000);
        return {
          code: "200",
          success: true,
          message: "You are successfully registered.",
          token: accessToken,
          refresh: refreshToken,
          payload,
        };
      } catch (error) {
        console.log(error);
        throw new GraphQLError(error.message);
      }
    },
    editProfile: async (
      _,
      { userInput },
      { redis, dataSources: { userAPI }, user }
    ) => {
      if (!user) throw new Error("Authentication token required.");
      try {
        const payload = await userAPI.editProfile({
          userInput,
        });
        const accessToken = createAccessToken(payload.toJSON());
        const refreshToken = createRefreshToken(payload.toJSON());
        redis.set(payload._id, refreshToken, "ex", 604800000);
        return {
          code: "200",
          success: true,
          message: "Your profile edited successfully.",
          token: accessToken,
          refresh: refreshToken,
          payload,
        };
      } catch (error) {
        throw new GraphQLError(error.message);
      }
    },
    assignRole: async (
      _,
      { userId, role },
      { dataSources: { userAPI }, user, token }
    ) => {
      if (user?.role !== "ADMIN") {
        throw new GraphQLError("You are not authorized.");
      }
      try {
        const payload = await userAPI.assignRole({
          userId,
          role,
        });
        return {
          code: "200",
          success: true,
          message: `Your role changed to "${role}".`,
          token,
          refresh: null,
          payload,
        };
      } catch (error) {
        throw new GraphQLError(error.message);
      }
    },
    logout: async (_, __, { user, redis }) => {
      try {
        const res = await redis.del(user._id);
        return {
          code: "200",
          success: true,
          message: res
            ? "You are successfully logged out."
            : "You are already logged out.",
          token: null,
          refresh: null,
          payload: null,
        };
      } catch (error) {
        throw new GraphQLError(error.message);
      }
    },
  },
};

module.exports = UserResolver;
