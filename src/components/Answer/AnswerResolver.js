const { UserInputError } = require("apollo-server");

const AnswerResolver = {
  Query: {
    answers: async (
      _,
      { offset = 0, limit = 10, questionId },
      { dataSources: { answerAPI } }
    ) => {
      try {
        const payload = await answerAPI.answers({
          offset,
          limit,
          questionId,
        });
        return {
          code: 200,
          success: true,
          message: "",
          limit,
          offset,
          payload,
        };
      } catch (error) {
        console.log(error);
        throw new UserInputError(error.message, error.extensions.code);
      }
    },
    userAnswers: async (
      _,
      { offset = 0, limit = 10, filter },
      { dataSources: { answerAPI } }
    ) => {
      try {
        const payload = await answerAPI.userAnswers({
          offset,
          limit,
          ...filter,
        });
        return {
          code: 200,
          success: true,
          message: "",
          limit,
          offset,
          payload,
        };
      } catch (error) {
        throw new UserInputError(error.message, error.extensions.code);
      }
    },
    answer: async (_, { answerId }, { dataSources: { answerAPI } }) => {
      try {
        const payload = await answerAPI.answer({ answerId });
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
    createAnswer: async (
      _,
      { questionId, answerInput },
      { dataSources: { answerAPI } }
    ) => {
      try {
        const payload = await answerAPI.createAnswer({
          questionId,
          ...answerInput,
        });
        return {
          code: "200",
          success: true,
          message: "Answer created successfully.",
          payload,
        };
      } catch (error) {
        console.log(error);
        throw new UserInputError(error.message, error.extensions.code);
      }
    },
    editAnswer: async (
      _,
      { answerId, answerInput },
      { dataSources: { answerAPI } }
    ) => {
      try {
        const payload = await answerAPI.editAnswer({
          answerId,
          ...answerInput,
        });
        return {
          code: "200",
          success: true,
          message: "Answer edited successfully.",
          payload,
        };
      } catch (error) {
        throw new UserInputError(error.message, error.extensions.code);
      }
    },
    verifyAnswer: async (
      _,
      { answerId, answerInput },
      { dataSources: { answerAPI }, user: { role } }
    ) => {
      try {
        if (role !== "ADMIN") {
          throw new UserInputError("You are not authorized.");
        }
        const payload = await answerAPI.verifyAnswer({
          answerId,
          ...answerInput,
        });
        return {
          code: "200",
          success: true,
          message: "Answer verified successfully.",
          payload,
        };
      } catch (error) {
        throw new UserInputError(error.message, error.extensions.code);
      }
    },
    deleteAnswer: async (_, { answerId }, { dataSources: { answerAPI } }) => {
      try {
        const payload = await answerAPI.deleteAnswer({ answerId });
        return {
          code: "200",
          success: true,
          message: "Answer deleted successfully.",
          payload,
        };
      } catch (error) {
        throw new UserInputError(error.message, error.extensions.code);
      }
    },
  },
};

module.exports = AnswerResolver;
