const { GraphQLError } = require("graphql");

const NotificationResolver = {
  Query: {
    notifications: async (
      _,
      { offset = 0, limit = 10, filter },
      { token, dataSources: { notificationAPI } }
    ) => {
      try {
        const payload = await notificationAPI.notifications({
          offset,
          limit,
          ...filter,
        });
        return {
          code: "200",
          success: true,
          message: "Successfully get notifications.",
          token,
          limit,
          offset,
          filter,
          payload,
        };
      } catch (error) {
        throw new GraphQLError(error.message);
      }
    },
  },
  Mutation: {
    readNotification: async (
      _,
      { notificationId },
      { token, dataSources: { notificationAPI } }
    ) => {
      try {
        const payload = await notificationAPI.readNotification({
          notificationId,
        });
        return {
          code: "200",
          success: true,
          message: "Successfully read notification.",
          token,
          payload,
        };
      } catch (error) {
        throw new GraphQLError(error.message);
      }
    },
  },
};

module.exports = NotificationResolver;
