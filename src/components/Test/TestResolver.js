const { GraphQLError } = require("graphql");

const TestResolver = {
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
        const payload = await testAPI.editTest({
          testId,
          testInput: {
            totalMarks: questions.reduce(
              (accumulator, question) => accumulator + question.mark,
              0
            ),
          },
        });
        return {
          code: "200",
          success: true,
          message: "Question added successfully.",
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
        const { _id: testId, questions } = await testAPI.editTestQuestion({
          questionId,
          questionInput,
        });
        const payload = await testAPI.editTest({
          testId,
          testInput: {
            totalMarks: questions.reduce(
              (accumulator, question) => accumulator + question.mark,
              0
            ),
          },
        });
        return {
          code: "200",
          success: true,
          message: "Question edited successfully.",
          token,
          payload,
        };
      } catch (error) {
        throw new GraphQLError(error.message);
      }
    },
    deleteTestQuestion: async (
      _,
      { questionId },
      { token, dataSources: { testAPI } }
    ) => {
      try {
        const { _id: testId, questions } = await testAPI.deleteTestQuestion({
          questionId,
        });
        const payload = await testAPI.editTest({
          testId,
          testInput: {
            totalMarks: questions.reduce(
              (accumulator, question) => accumulator + question.mark,
              0
            ),
          },
        });
        return {
          code: "200",
          success: true,
          message: "Question deleted successfully.",
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
