const { GraphQLError } = require("graphql");

const QuestionResolver = {
  Query: {
    questions: async (
      _,
      { offset = 0, limit = 10, search, filter },
      { token, dataSources: { questionAPI } }
    ) => {
      try {
        const payload = await questionAPI.questions({
          offset,
          limit,
          search,
          ...filter,
        });
        return {
          code: "200",
          success: true,
          message: "Successful",
          token,
          offset,
          limit,
          search,
          filter,
          payload,
        };
      } catch (error) {
        console.log(error);
        throw new GraphQLError(error.message);
      }
    },
    question: async (
      _,
      { questionId },
      { token, dataSources: { questionAPI } }
    ) => {
      try {
        const payload = await questionAPI.question({ questionId });
        return {
          code: "200",
          success: true,
          message: "Successful",
          token,
          payload,
        };
      } catch (error) {
        throw new GraphQLError(error.message);
      }
    },
  },
  Mutation: {
    createQuestion: async (
      _,
      { questionInput },
      { token, dataSources: { questionAPI } }
    ) => {
      try {
        const question = await questionAPI.createQuestion(questionInput);
        const payload = await questionAPI.populateQuestion(question);
        return {
          code: "200",
          success: true,
          message: "Question created successfully.",
          token,
          payload,
        };
      } catch (error) {
        console.log(error);
        throw new GraphQLError(error.message);
      }
    },
    editQuestion: async (
      _,
      { questionId, questionInput },
      { token, dataSources: { questionAPI } }
    ) => {
      try {
        const payload = await questionAPI.editQuestion({
          questionId,
          ...questionInput,
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
    verifyQuestion: async (
      _,
      { questionId, questionInput },
      { token, dataSources: { questionAPI }, user: { role } }
    ) => {
      try {
        if (role !== "ADMIN") {
          throw new GraphQLError("You are not authorized.");
        }
        const payload = await questionAPI.verifyQuestion({
          questionId,
          ...questionInput,
        });
        return {
          code: "200",
          success: true,
          message: "Question verified successfully.",
          token,
          payload,
        };
      } catch (error) {
        throw new GraphQLError(error.message);
      }
    },
    deleteQuestion: async (
      _,
      { questionId },
      { token, dataSources: { questionAPI } }
    ) => {
      try {
        const payload = await questionAPI.deleteQuestion({ questionId });
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

module.exports = QuestionResolver;
