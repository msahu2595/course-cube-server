const { UserInputError } = require("apollo-server");

const UserResolver = {
  Query: {
    userNotifications: async (
      _,
      { offset = 0, limit = 10 },
      { dataSources: { userNotificationAPI } }
    ) => {
      try {
        const payload = await userNotificationAPI.userNotifications({
          offset,
          limit,
        });
        return {
          code: "200",
          success: true,
          message: "",
          payload,
        };
      } catch (error) {
        throw new UserInputError(error.message, error.extensions.code);
      }
    },
  },
  Mutation: {
    readUserNotification: async (
      _,
      { userNotificationId },
      { dataSources: { userNotificationAPI } }
    ) => {
      try {
        const payload = await userNotificationAPI.readUserNotification({
          userNotificationId,
        });
        return {
          code: "200",
          success: true,
          message: "",
          payload,
        };
      } catch (error) {
        throw new UserInputError(error.message, error.extensions.code);
      }
    },
  },
};

module.exports = UserResolver;
