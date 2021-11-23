const { UserInputError } = require("apollo-server");

const TestResolver = {
  Query: {
    tests: async (
      _,
      { offset = 0, limit = 10, search, filter },
      { dataSources: { testAPI } }
    ) => {
      try {
        const payload = await testAPI.tests({
          offset,
          limit,
          search,
          ...filter,
        });
        return {
          code: 200,
          success: true,
          message: "Successfully get tests.",
          limit,
          offset,
          search,
          filter,
          payload,
        };
      } catch (error) {
        throw new UserInputError(error.message, error.extensions.code);
      }
    },
    test: async (
      _,
      { testId, questionEnable },
      { dataSources: { testAPI } }
    ) => {
      try {
        const payload = await testAPI.test({
          testId,
          questionEnable,
        });
        console.log(payload);
        return {
          code: 200,
          success: true,
          message: "Successfully get test.",
          payload,
        };
      } catch (error) {
        console.log(error);
        throw new UserInputError(error.message, error.extensions.code);
      }
    },
  },
  Mutation: {
    addTest: async (_, { testInput }, { dataSources: { testAPI } }) => {
      try {
        const payload = await testAPI.addTest({ testInput });
        return {
          code: "200",
          success: true,
          message: "Test added successfully.",
          payload,
        };
      } catch (error) {
        console.log(error);
        throw new UserInputError(error.message, error.extensions.code);
      }
    },
    editTest: async (
      _,
      { testId, testInput },
      { dataSources: { testAPI } }
    ) => {
      try {
        const payload = await testAPI.editTest({
          testId,
          testInput,
        });
        return {
          code: "200",
          success: true,
          message: "Test edited successfully.",
          payload,
        };
      } catch (error) {
        throw new UserInputError(error.message, error.extensions.code);
      }
    },
    deleteTest: async (_, { testId }, { dataSources: { testAPI } }) => {
      try {
        const payload = await testAPI.deleteTest({ testId });
        return {
          code: "200",
          success: true,
          message: "Test deleted successfully.",
          payload,
        };
      } catch (error) {
        throw new UserInputError(error.message, error.extensions.code);
      }
    },
    addTestQuestion: async (
      _,
      { testId, questionInput },
      { dataSources: { testAPI } }
    ) => {
      try {
        const payload = await testAPI.addTestQuestion({
          testId,
          questionInput,
        });
        return {
          code: "200",
          success: true,
          message: "Question added successfully.",
          payload,
        };
      } catch (error) {
        console.log(error);
        throw new UserInputError(error.message, error.extensions.code);
      }
    },
    editTestQuestion: async (
      _,
      { questionId, questionInput },
      { dataSources: { testAPI } }
    ) => {
      try {
        const payload = await testAPI.editTestQuestion({
          questionId,
          questionInput,
        });
        return {
          code: "200",
          success: true,
          message: "Question edited successfully.",
          payload,
        };
      } catch (error) {
        throw new UserInputError(error.message, error.extensions.code);
      }
    },
    deleteTestQuestion: async (
      _,
      { questionId },
      { dataSources: { testAPI } }
    ) => {
      try {
        const payload = await testAPI.deleteTestQuestion({ questionId });
        return {
          code: "200",
          success: true,
          message: "Question deleted successfully.",
          payload,
        };
      } catch (error) {
        throw new UserInputError(error.message, error.extensions.code);
      }
    },
  },
};

module.exports = TestResolver;
