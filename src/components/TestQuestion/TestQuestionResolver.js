const { GraphQLError } = require("graphql");

const TestQuestionResolver = {
  Query: {
    testQuestions: async (
      _,
      { offset = 0, limit = 10, search, testId, filter },
      { token, dataSources: { testQuestionAPI } }
    ) => {
      try {
        const payload = await testQuestionAPI.testQuestions({
          offset,
          limit,
          search,
          testId,
          ...filter,
        });
        return {
          code: 200,
          success: true,
          message: "Successfully get test questions.",
          token,
          limit,
          offset,
          search,
          filter,
          testId,
          payload,
        };
      } catch (error) {
        throw new GraphQLError(error.message);
      }
    },
    testQuestion: async (
      _,
      { testQuestionId },
      { token, dataSources: { testQuestionAPI } }
    ) => {
      try {
        const payload = await testQuestionAPI.testQuestion({
          testQuestionId,
        });
        return {
          code: 200,
          success: true,
          message: "Successfully get test question.",
          token,
          payload,
        };
      } catch (error) {
        console.log(error);
        throw new GraphQLError(error.message);
      }
    },
  },
  Mutation: {
    addTestQuestion: async (
      _,
      { testId, testQuestionInput },
      { token, dataSources: { testQuestionAPI } }
    ) => {
      try {
        const payload = await testQuestionAPI.addTestQuestion({
          testId,
          testQuestionInput,
        });
        return {
          code: "200",
          success: true,
          message: "Test question added successfully.",
          token,
          payload,
        };
      } catch (error) {
        console.log(error);
        throw new GraphQLError(error.message);
      }
    },
    editTestQuestion: async (
      _,
      { testQuestionId, testQuestionInput },
      { token, dataSources: { testQuestionAPI } }
    ) => {
      try {
        const payload = await testQuestionAPI.editTestQuestion({
          testQuestionId,
          testQuestionInput,
        });
        return {
          code: "200",
          success: true,
          message: "Test question edited successfully.",
          token,
          payload,
        };
      } catch (error) {
        throw new GraphQLError(error.message);
      }
    },
    deleteTestQuestion: async (
      _,
      { testQuestionId, testQuestionInput },
      { token, dataSources: { testQuestionAPI } }
    ) => {
      try {
        const payload = await testQuestionAPI.deleteTestQuestion({
          testQuestionId,
          testQuestionInput,
        });
        return {
          code: "200",
          success: true,
          message: "Test question deleted successfully.",
          token,
          payload,
        };
      } catch (error) {
        throw new GraphQLError(error.message);
      }
    },
  },
};

module.exports = TestQuestionResolver;
