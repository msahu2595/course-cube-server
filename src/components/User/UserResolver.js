const { UserInputError } = require("apollo-server");
// const getVideoUrl = require("../../libs/getVideoUrl");

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
        // const { stdout } = await getVideoUrl({
        //   url: "https://www.youtube.com/watch?v=mV8ZB7w1KQM",
        // });
        // console.log({ stdout });
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
