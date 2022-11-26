const { GraphQLError } = require("graphql");

const NotificationResolver = {
  Query: {
    notifications: async (
      _,
      { offset = 0, limit = 10, type = "USER" },
      { dataSources: { notificationAPI } }
    ) => {
      try {
        const payload = await notificationAPI.notifications({
          offset,
          limit,
          type,
        });
        return {
          code: "200",
          success: true,
          message: "",
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
      { dataSources: { notificationAPI } }
    ) => {
      try {
        const payload = await notificationAPI.readNotification({
          notificationId,
        });
        return {
          code: "200",
          success: true,
          message: "",
          payload,
        };
      } catch (error) {
        throw new GraphQLError(error.message);
      }
    },
  },
};

module.exports = NotificationResolver;
