const superagent = require("superagent");
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
      { idToken, FCMToken, platform, acceptTnC },
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
        } = await verifyIdToken(idToken, platform);
        const payload = await userAPI.logIn({
          email,
          emailVerified,
          fullName,
          picture,
          FCMToken,
          platform,
          acceptTnC,
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
    whatsAppLogIn: async (
      _,
      { waId, FCMToken, platform, acceptTnC },
      { redis, dataSources: { userAPI } }
    ) => {
      try {
        if (!acceptTnC) {
          throw new GraphQLError("Please accept terms & conditions.");
        }
        const { text = "{}" } = await superagent
          .post(process.env.OTPLESS_AUTH_LINK)
          .set("clientId", process.env.OTPLESS_CLIENT_ID)
          .set("clientSecret", process.env.OTPLESS_CLIENT_SECRET)
          .send({ waId });
        const response = JSON.parse(text);
        if (!response?.success) {
          throw new GraphQLError("Got error on whatsapp login, try again.");
        }
        const payload = await userAPI.logIn({
          mobile: `+${response?.data?.userMobile}`,
          mobileVerified: true,
          fullName: response?.data?.userName,
          FCMToken,
          platform,
          acceptTnC,
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
    createProfile: async (
      _,
      { userInput },
      { redis, dataSources: { userAPI }, user }
    ) => {
      if (!user) throw new Error("Authentication token required.");
      try {
        const payload = await userAPI.createProfile({ userInput });
        if (!payload) {
          throw new GraphQLError("User has already created his profile.");
        }
        const accessToken = createAccessToken(payload.toJSON());
        const refreshToken = createRefreshToken(payload.toJSON());
        redis.set(payload._id, refreshToken, "ex", 604800000);
        return {
          code: "200",
          success: true,
          message: "Your profile created successfully.",
          token: accessToken,
          refresh: refreshToken,
          payload,
        };
      } catch (error) {
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
        const payload = await userAPI.editProfile({ userInput });
        if (!payload) {
          throw new GraphQLError("User has not created his profile.");
        }
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
        const payload = await userAPI.assignRole({ userId, role });
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
    uploadImage: async (_, __, { dataSources: user, token }) => {
      if (!user) throw new Error("Authentication token required.");
      try {
        const { text = "{}" } = await superagent
          .post(process.env.CFI_UPLOAD_URL)
          .set("Authorization", `Bearer ${process.env.CFI_API_TOKEN}`);
        const response = JSON.parse(text);
        console.log(response);
        if (!response?.success) {
          throw new GraphQLError("Got error on upload image, try again.");
        }
        return {
          code: "200",
          success: response?.success,
          message: "Upload URL will expire after 30 minutes if unused.",
          token,
          payload: response?.result,
        };
      } catch (error) {
        throw new GraphQLError(error.message);
      }
    },
    deleteImage: async (_, { imageId }, { dataSources: user, token }) => {
      if (!user) throw new Error("Authentication token required.");
      try {
        const { text = "{}" } = await superagent
          .delete(process.env.CFI_DELETE_URL + imageId)
          .set("Authorization", `Bearer ${process.env.CFI_API_TOKEN}`);
        const response = JSON.parse(text);
        console.log(response);
        if (!response?.success) {
          throw new GraphQLError("Got error on delete image, try again.");
        }
        return {
          code: "200",
          success: true,
          message: "Image successfully deleted.",
          token,
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
