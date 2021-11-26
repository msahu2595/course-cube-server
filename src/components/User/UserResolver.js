const { UserInputError } = require("apollo-server");
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
    user: async (_, { userId }, { dataSources: { userAPI }, user, token }) => {
      if (!user) throw new Error("Authentication token required.");
      try {
        const payload = await userAPI.user({ userId });
        return {
          code: "200",
          success: true,
          message: "Successful",
          token,
          payload,
        };
      } catch (error) {
        throw new UserInputError(error.message);
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
        throw new UserInputError(error.message);
      }
    },
    leaderboard: async (
      _,
      { offset = 0, limit = 10 },
      { dataSources: { userAPI }, user, token }
    ) => {
      if (!user) throw new Error("Authentication token required.");
      try {
        const payload = await userAPI.leaderboard({ offset, limit });
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
        throw new UserInputError(error.message);
      }
    },
  },
  Mutation: {
    googleLogIn: async (
      _,
      { idToken, acceptTnC, FCMToken },
      { redis, dataSources: { userAPI } }
    ) => {
      try {
        if (!acceptTnC)
          throw new UserInputError("Please accept terms & conditions.");
        const {
          email,
          email_verified: emailVerified,
          name: fullName,
          picture,
        } = await verifyIdToken(idToken);
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
        console.log("error ==> ", error.message);
        throw new UserInputError(error.message);
      }
    },
    editProfile: async (
      _,
      { userInput },
      { dataSources: { userAPI }, user }
    ) => {
      if (!user) throw new Error("Authentication token required.");
      try {
        const payload = await userAPI.editProfile({
          userInput,
        });
        const accessToken = createAccessToken(payload.toJSON());
        const refreshToken = createRefreshToken(payload.toJSON());
        return {
          code: "200",
          success: true,
          message: "Your profile edited successfully.",
          token: accessToken,
          refresh: refreshToken,
          payload,
        };
      } catch (error) {
        throw new UserInputError(error.message);
      }
    },
    assignRole: async (
      _,
      { userId, role },
      { dataSources: { userAPI }, user, token }
    ) => {
      if (user?.role !== "ADMIN") {
        throw new UserInputError("You are not authorized.");
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
          payload,
        };
      } catch (error) {
        throw new UserInputError(error.message);
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
        };
      } catch (error) {
        throw new UserInputError(error.message);
      }
    },
  },
};

module.exports = UserResolver;
