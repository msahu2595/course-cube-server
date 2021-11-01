const { UserInputError } = require("apollo-server");

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
    user: async (_, { userId }, { dataSources: { userAPI } }) => {
      try {
        const payload = await userAPI.user({ userId });
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
    logIn: async (
      _,
      { email, password, image, firstName, lastName, acceptTnC },
      { dataSources: { userAPI } }
    ) => {
      try {
        const payload = await userAPI.logIn({
          email,
          password,
          image,
          firstName,
          lastName,
          acceptTnC,
        });
        console.log({ payload });
        return {
          code: "200",
          success: true,
          message: "You are successfully registered.",
          payload,
        };
      } catch (error) {
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
        console.log({ payload });
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
  },
};

module.exports = UserResolver;
