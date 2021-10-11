const { UserInputError } = require("apollo-server");

const AnswerResolver = {
  Query: {
    questions: async (
      _,
      { offset = 0, limit = 10, search },
      { dataSources: { questionAPI } }
    ) => {
      try {
        const payload = await questionAPI.questions({ offset, limit, search });
        return {
          code: "200",
          success: true,
          message: "",
          payload,
        };
      } catch (error) {
        console.log(error);
        throw new UserInputError(error.message, error.extensions.code);
      }
    },
    userQuestions: async (
      _,
      { offset = 0, limit = 10, userId },
      { dataSources: { questionAPI } }
    ) => {
      try {
        const payload = await questionAPI.userQuestions({
          offset,
          limit,
          userId,
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
    question: async (_, { questionId }, { dataSources: { questionAPI } }) => {
      try {
        const payload = await questionAPI.question({ questionId });
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
        throw new UserInputError(error.message, error.extensions.code);
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
        throw new UserInputError(error.message, error.extensions.code);
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
        throw new UserInputError(error.message, error.extensions.code);
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
        throw new UserInputError(error.message, error.extensions.code);
      }
    },
  },
};

module.exports = AnswerResolver;
