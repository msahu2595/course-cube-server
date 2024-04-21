const moment = require("moment");
const { GraphQLError } = require("graphql");
const fileHandler = require("../../libs/fileHandler");
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
    user: async (_, { userId }, { token, dataSources: { userAPI }, user }) => {
      if (!user) throw new Error("Authentication token required.");
      try {
        const payload = await userAPI.user({
          userId,
          populate: ["followers", "followings"],
        });
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
    statistics: async (
      _,
      { userId },
      { token, dataSources: { userAPI }, user }
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
      { token, dataSources: { historyAPI, userAPI }, user }
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
      { token, dataSources: { historyAPI, userAPI }, user }
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
      { redis, dataSources: { userAPI, notificationAPI } }
    ) => {
      try {
        if (!acceptTnC) {
          throw new GraphQLError("Please accept terms & conditions.");
        }
        const {
          email,
          email_verified: emailVerified,
          name: fullName,
        } = await verifyIdToken(idToken, platform);
        const payload = await userAPI.logIn({
          email,
          emailVerified,
          fullName,
          FCMToken,
          platform,
          acceptTnC,
        });
        if (
          Math.abs(moment().diff(moment(payload.createdAt), "seconds")) <= 2
        ) {
          notificationAPI.createNotification({
            userId: `${payload._id}`,
            title: "New User Registered.",
            body: `${fullName} created his account.`,
            type: "ADMIN",
            route: "UserProfileScreen",
            params: { userId: `${payload._id}` },
          });
        }
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
        throw new GraphQLError(error.message);
      }
    },
    createProfile: async (
      _,
      { userInput },
      { token, dataSources: { userAPI }, user }
    ) => {
      if (!user) throw new Error("Authentication token required.");
      try {
        const payload = await userAPI.createProfile({ userInput });
        if (!payload) {
          throw new GraphQLError("User has already created his profile.");
        }
        return {
          code: "200",
          success: true,
          message: "Your profile created successfully.",
          token,
          payload,
        };
      } catch (error) {
        throw new GraphQLError(error.message);
      }
    },
    editProfile: async (
      _,
      { userInput },
      { token, dataSources: { userAPI }, user }
    ) => {
      if (!user) throw new Error("Authentication token required.");
      try {
        const payload = await userAPI.editProfile({ userInput });
        if (!payload) {
          throw new GraphQLError("User has not created his profile.");
        }
        return {
          code: "200",
          success: true,
          message: "Your profile edited successfully.",
          token,
          payload,
        };
      } catch (error) {
        throw new GraphQLError(error.message);
      }
    },
    assignRole: async (
      _,
      { userId, role },
      { token, dataSources: { userAPI }, user }
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
          payload,
        };
      } catch (error) {
        throw new GraphQLError(error.message);
      }
    },
    addProfileImage: async (
      _,
      { picture },
      { token, dataSources: { userAPI }, user }
    ) => {
      if (!user) throw new Error("Authentication token required.");
      try {
        const userPayload = await userAPI.user();
        if (userPayload?.picture) {
          await fileHandler
            .remove({ filePath: userPayload?.picture })
            .catch((error) => {
              console.log(error?.message || "Something wrong happened!!");
            });
        }
        const newPicture = await fileHandler.moveFromTmp({
          filePath: picture,
          folderName: "avatar",
        });
        const payload = await userAPI.addProfileImage({ picture: newPicture });
        return {
          code: 200,
          success: true,
          message: "Your profile picture added successfully.",
          token,
          payload,
        };
      } catch (error) {
        throw new GraphQLError(error.message);
      }
    },
    removeProfileImage: async (
      _,
      __,
      { token, dataSources: { userAPI }, user }
    ) => {
      if (!user) throw new Error("Authentication token required.");
      try {
        const userPayload = await userAPI.user();
        if (userPayload?.picture) {
          await fileHandler
            .remove({ filePath: userPayload?.picture })
            .catch((error) => {
              console.log(error?.message || "Something wrong happened!!");
            });
        }
        const payload = await userAPI.removeProfileImage();
        return {
          code: 200,
          success: true,
          message: "Your profile picture removed successfully.",
          token,
          payload,
        };
      } catch (error) {
        throw new GraphQLError(error.message);
      }
    },
    logout: async (_, __, { redis, dataSources: { userAPI }, user }) => {
      try {
        await userAPI.logout();
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
