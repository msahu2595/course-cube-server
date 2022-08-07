const { UserInputError } = require("apollo-server");

const QuestionResolver = {
  Query: {
    questions: async (
      _,
      { offset = 0, limit = 10, search, filter },
      { dataSources: { questionAPI } }
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
          offset,
          limit,
          search,
          filter,
          payload,
        };
      } catch (error) {
        console.log(error);
        throw new UserInputError(error.message);
      }
    },
    question: async (_, { questionId }, { dataSources: { questionAPI } }) => {
      try {
        const payload = await questionAPI.question({ questionId });
        return {
          code: "200",
          success: true,
          message: "Successful",
          payload,
        };
      } catch (error) {
        throw new UserInputError(error.message);
      }
    },
  },
  Mutation: {
    createQuestion: async (
      _,
      { questionInput },
      { dataSources: { questionAPI } }
    ) => {
      try {
        const payload = await questionAPI.createQuestion(questionInput);
        return {
          code: "200",
          success: true,
          message: "Question created successfully.",
          payload,
        };
      } catch (error) {
        console.log(error);
        throw new UserInputError(error.message);
      }
    },
    editQuestion: async (
      _,
      { questionId, questionInput },
      { dataSources: { questionAPI } }
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
          payload,
        };
      } catch (error) {
        throw new UserInputError(error.message);
      }
    },
    verifyQuestion: async (
      _,
      { questionId, questionInput },
      { dataSources: { questionAPI }, user: { role } }
    ) => {
      try {
        if (role !== "ADMIN") {
          throw new UserInputError("You are not authorized.");
        }
        const payload = await questionAPI.verifyQuestion({
          questionId,
          ...questionInput,
        });
        return {
          code: "200",
          success: true,
          message: "Question verified successfully.",
          payload,
        };
      } catch (error) {
        throw new UserInputError(error.message);
      }
    },
    deleteQuestion: async (
      _,
      { questionId },
      { dataSources: { questionAPI } }
    ) => {
      try {
        const payload = await questionAPI.deleteQuestion({ questionId });
        return {
          code: "200",
          success: true,
          message: "Question deleted successfully.",
          payload,
        };
      } catch (error) {
        throw new UserInputError(error.message);
      }
    },
  },
};

module.exports = QuestionResolver;
