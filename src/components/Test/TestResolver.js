const { GraphQLError } = require("graphql");

const TestResolver = {
  Test: {
    questions: (parent) =>
      parent?.questions?.filter((ques) => ques.enable).length,
    totalMarks: (parent) =>
      parent?.questions?.reduce(
        (accumulator, question) =>
          question.enable ? accumulator + question.mark : accumulator,
        0
      ),
  },
  Query: {
    tests: async (
      _,
      { offset = 0, limit = 10, search, filter },
      { token, dataSources: { testAPI } }
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
    test: async (_, { testId }, { token, dataSources: { testAPI } }) => {
      try {
        const payload = await testAPI.test({
          testId,
        });
        return {
          code: 200,
          success: true,
          message: "Successfully get test.",
          token,
          payload,
        };
      } catch (error) {
        console.log(error);
        throw new GraphQLError(error.message);
      }
    },
    testQuestions: async (
      _,
      { offset = 0, limit = 10, testId },
      { token, dataSources: { testAPI } }
    ) => {
      try {
        const { questions: payload } = await testAPI.testQuestions({
          offset,
          limit,
          testId,
        });
        return {
          code: 200,
          success: true,
          message: "Successfully get test questions.",
          token,
          limit,
          offset,
          testId,
          payload,
        };
      } catch (error) {
        throw new GraphQLError(error.message);
      }
    },
  },
  Mutation: {
    addTest: async (_, { testInput }, { token, dataSources: { testAPI } }) => {
      try {
        const payload = await testAPI.addTest({ testInput });
        return {
          code: "200",
          success: true,
          message: "Test added successfully.",
          token,
          payload,
        };
      } catch (error) {
        console.log(error);
        throw new GraphQLError(error.message);
      }
    },
    editTest: async (
      _,
      { testId, testInput },
      { token, dataSources: { testAPI } }
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
          token,
          payload,
        };
      } catch (error) {
        throw new GraphQLError(error.message);
      }
    },
    deleteTest: async (
      _,
      { testId },
      { token, dataSources: { testAPI, contentAPI, bundleContentAPI } }
    ) => {
      try {
        const contentExists = await contentAPI.mediaContentExists({
          media: testId,
        });
        const bundleContentExists =
          await bundleContentAPI.mediaBundleContentExists({
            media: testId,
          });
        if (contentExists || bundleContentExists)
          throw new GraphQLError(
            `${
              contentExists ? "Content" : "Course content"
            } is using this test, Please remove from that before deleting this.`
          );
        const payload = await testAPI.deleteTest({ testId });
        return {
          code: "200",
          success: true,
          message: "Test deleted successfully.",
          token,
          payload,
        };
      } catch (error) {
        throw new GraphQLError(error.message);
      }
    },
    addTestQuestion: async (
      _,
      { testId, questionInput },
      { token, dataSources: { testAPI } }
    ) => {
      try {
        const { questions } = await testAPI.addTestQuestion({
          testId,
          questionInput,
        });
        const payload = questions.at(-1);
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
      { questionId, questionInput },
      { token, dataSources: { testAPI } }
    ) => {
      try {
        const { questions } = await testAPI.editTestQuestion({
          questionId,
          questionInput,
        });
        const payload = questions?.find(
          (question) => question?._id == questionId
        );
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
      { questionId, invalid },
      { token, dataSources: { testAPI } }
    ) => {
      try {
        const { questions } = await testAPI.deleteTestQuestion({
          questionId,
          invalid,
        });
        const payload = questions?.find(
          (question) => question?._id == questionId
        );
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

module.exports = TestResolver;
