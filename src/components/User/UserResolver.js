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
    user: async (_, { userId }, { user, token, dataSources: { userAPI } }) => {
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
        throw new UserInputError(error.message, error.extensions.code);
      }
    },
    statistics: async (_, { userId }, { dataSources: { userAPI } }) => {
      try {
        const payload = await userAPI.statistics({ userId });
        return {
          code: "200",
          success: true,
          message: "Successful",
          payload,
        };
      } catch (error) {
        throw new UserInputError(error.message, error.extensions.code);
      }
    },
    leaderboard: async (
      _,
      { offset = 0, limit = 10 },
      { dataSources: { userAPI } }
    ) => {
      try {
        const payload = await userAPI.leaderboard({ offset, limit });
        return {
          code: "200",
          success: true,
          message: "Successful",
          offset,
          limit,
          payload,
        };
      } catch (error) {
        throw new UserInputError(error.message, error.extensions.code);
      }
    },
  },
  Mutation: {
    googleLogIn: async (_, { token }, { redis, dataSources: { userAPI } }) => {
      try {
        const {
          email,
          email_verified: emailVerified,
          name: fullName,
          picture,
        } = await verifyIdToken(token);
        const payload = await userAPI.logIn({
          email,
          emailVerified,
          fullName,
          picture,
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
        throw new UserInputError(error.message, error.extensions.code);
      }
    },
    assignRole: async (
      _,
      { userId, role },
      { dataSources: { userAPI }, user: { role: contextUserRole } }
    ) => {
      try {
        if (contextUserRole !== "ADMIN") {
          throw new UserInputError("You are not authorized.");
        }
        const payload = await userAPI.assignRole({
          userId,
          role,
        });
        return {
          code: "200",
          success: true,
          message: `Your role changed to "${role}".`,
          payload,
        };
      } catch (error) {
        throw new UserInputError(error.message, error.extensions.code);
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
        throw new UserInputError(error.message, error.extensions.code);
      }
    },
  },
};

module.exports = UserResolver;
