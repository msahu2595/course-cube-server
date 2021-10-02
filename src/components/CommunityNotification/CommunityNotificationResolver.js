const { UserInputError } = require("apollo-server");

const CommunityResolver = {
  Query: {
    communityNotifications: async (
      _,
      { offset = 0, limit = 10 },
      { dataSources: { communityNotificationAPI } }
    ) => {
      try {
        const payload = await communityNotificationAPI.communityNotifications({
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
    readCommunityNotification: async (
      _,
      { communityNotificationId },
      { dataSources: { communityNotificationAPI } }
    ) => {
      try {
        const payload =
          await communityNotificationAPI.readCommunityNotification({
            communityNotificationId,
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

module.exports = CommunityResolver;
