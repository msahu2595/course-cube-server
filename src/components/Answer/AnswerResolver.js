const { GraphQLError } = require("graphql");

const AnswerResolver = {
  Query: {
    answers: async (
      _,
      { offset = 0, limit = 10, questionId },
      { token, dataSources: { answerAPI } }
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
          token,
          limit,
          offset,
          payload,
        };
      } catch (error) {
        console.log(error);
        throw new GraphQLError(error.message);
      }
    },
    userAnswers: async (
      _,
      { offset = 0, limit = 10, filter },
      { token, dataSources: { answerAPI } }
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
          token,
          limit,
          offset,
          payload,
        };
      } catch (error) {
        throw new GraphQLError(error.message);
      }
    },
    answer: async (_, { answerId }, { token, dataSources: { answerAPI } }) => {
      try {
        const payload = await answerAPI.answer({ answerId });
        return {
          code: "200",
          success: true,
          message: "",
          token,
          payload,
        };
      } catch (error) {
        throw new GraphQLError(error.message);
      }
    },
  },
  Mutation: {
    createAnswer: async (
      _,
      { questionId, answerInput },
      { token, dataSources: { answerAPI } }
    ) => {
      try {
        const answer = await answerAPI.createAnswer({
          questionId,
          ...answerInput,
        });
        const payload = await answerAPI.populateAnswer(answer);
        return {
          code: "200",
          success: true,
          message: "Answer created successfully.",
          token,
          payload,
        };
      } catch (error) {
        console.log(error);
        throw new GraphQLError(error.message);
      }
    },
    editAnswer: async (
      _,
      { answerId, answerInput },
      { token, dataSources: { answerAPI } }
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
          token,
          payload,
        };
      } catch (error) {
        throw new GraphQLError(error.message);
      }
    },
    verifyAnswer: async (
      _,
      { answerId, answerInput },
      { token, dataSources: { answerAPI }, user: { role } }
    ) => {
      try {
        if (role !== "ADMIN") {
          throw new GraphQLError("You are not authorized.");
        }
        const payload = await answerAPI.verifyAnswer({
          answerId,
          ...answerInput,
        });
        return {
          code: "200",
          success: true,
          message: "Answer verified successfully.",
          token,
          payload,
        };
      } catch (error) {
        throw new GraphQLError(error.message);
      }
    },
    deleteAnswer: async (
      _,
      { answerId },
      { token, dataSources: { answerAPI } }
    ) => {
      try {
        const payload = await answerAPI.deleteAnswer({ answerId });
        return {
          code: "200",
          success: true,
          message: "Answer deleted successfully.",
          token,
          payload,
        };
      } catch (error) {
        throw new GraphQLError(error.message);
      }
    },
  },
};

module.exports = AnswerResolver;
