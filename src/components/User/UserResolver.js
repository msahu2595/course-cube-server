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
        const payload = await userAPI.user(userId);
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
    logIn: async (
      _,
      { email, password, firstName, lastName, acceptTnC },
      { dataSources: { userAPI } }
    ) => {
      try {
        const payload = await userAPI.logIn(
          email,
          password,
          firstName,
          lastName,
          acceptTnC
        );
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
  },
};

module.exports = UserResolver;
