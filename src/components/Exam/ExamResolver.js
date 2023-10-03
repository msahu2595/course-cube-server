const { GraphQLError } = require("graphql");
const schedule = require("node-schedule");
const moment = require("moment");

const ExamResolver = {
  ExamList: {
    questions: (parent) => parent?.questions?.length,
    totalMarks: (parent) =>
      parent?.questions?.reduce(
        (accumulator, question) => accumulator + question.mark,
        0
      ),
  },
  Exam: {
    totalMarks: (parent) =>
      parent?.questions?.reduce(
        (accumulator, question) => accumulator + question.mark,
        0
      ),
    gotMarks: (parent) =>
      parent?.submitted
        ? parent?.questions?.reduce((accumulator, question) => {
            if (question.answeredIndex > -1) {
              if (question.testQuestion.invalid) {
                return accumulator + question.mark;
              } else {
                if (
                  question.answeredIndex === question.testQuestion.answerIndex
                ) {
                  return accumulator + question.mark;
                } else {
                  if (question.negativeMark) {
                    return accumulator - question.negativeMark;
                  } else {
                    return accumulator;
                  }
                }
              }
            }
            return accumulator;
          }, 0)
        : 0,
  },
  Query: {
    exams: async (
      _,
      { offset = 0, limit = 10, search, filter },
      { token, dataSources: { examAPI } }
    ) => {
      try {
        const payload = await examAPI.exams({
          offset,
          limit,
          search,
          ...filter,
        });
        return {
          code: 200,
          success: true,
          message: "Successfully get exams.",
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
    userExams: async (
      _,
      { offset = 0, limit = 10, search },
      { token, dataSources: { examAPI } }
    ) => {
      try {
        const payload = await examAPI.userExams({
          offset,
          limit,
          search,
        });
        return {
          code: 200,
          success: true,
          message: "Successfully get user exams.",
          token,
          limit,
          offset,
          search,
          payload,
        };
      } catch (error) {
        throw new GraphQLError(error.message);
      }
    },
    examAttempted: async (
      _,
      { contentId, testId },
      { token, dataSources: { examAPI } }
    ) => {
      const examAttempted = await examAPI.examAttempted({
        contentId,
        testId,
      });
      return {
        code: "200",
        success: true,
        message: `Exam ${examAttempted ? "attempted." : "not attempted."}`,
        token,
        payload: examAttempted ? true : false,
      };
    },
    result: async (
      _,
      { contentId, testId },
      { token, dataSources: { examAPI, testAPI } }
    ) => {
      try {
        const payload = await examAPI.result({ contentId, testId });
        if (!payload) throw new GraphQLError("Exam does not exist.");
        const test = await testAPI.test({ testId: payload?.test });
        if (!test) throw new GraphQLError("Test does not exist.");
        const testQuestions = new Map(
          test?.questions?.map((q) => [String(q?._id), q])
        );
        const populatedQuestions = payload.questions.map((q) => ({
          ...q.toObject(),
          testQuestion: testQuestions.get(String(q.testQuestion)),
        }));
        return {
          code: 200,
          success: true,
          message: "Successfully get result.",
          token,
          payload: { ...payload.toObject(), questions: populatedQuestions },
        };
      } catch (error) {
        throw new GraphQLError(
          `Either exam is in progress or ${error.message}`
        );
      }
    },
  },
  Mutation: {
    attemptExam: async (
      _,
      { contentId },
      { token, dataSources: { contentAPI, testAPI, examAPI } }
    ) => {
      try {
        const content = await contentAPI.contentById(contentId);
        if (!content) throw new GraphQLError("Content is not valid!");
        const { title, image: thumbnail, media: testId, type } = content;
        if (type !== "Test")
          throw new GraphQLError("Content type is not Test.");
        const examAttempted = await examAPI.examAttempted({
          contentId,
          testId,
        });
        if (examAttempted) throw new GraphQLError("Exam already attempted!");
        const test = await testAPI.test({ testId });
        if (!test) throw new GraphQLError("Test is not valid!");
        const { instructions, duration, questions: testQuestions } = test;
        const questions = testQuestions
          ?.filter((ques) => ques.enable)
          ?.map((ques) => {
            const examQuestion = {
              testQuestion: ques?._id,
              question: ques?.question,
              options: ques?.options,
              mark: ques?.mark,
              negativeMark: ques?.negativeMark,
            };
            if (ques?.image) {
              examQuestion.image = ques?.image;
            }
            if (ques?.passage) {
              examQuestion.passage = ques?.passage;
            }
            return examQuestion;
          });
        const examInput = {
          test: testId,
          content: contentId,
          title,
          thumbnail,
          instructions,
          duration,
          questions,
        };
        const payload = await examAPI.addExam({ examInput });
        if (!payload) throw new GraphQLError("Some issue on attempt exam!");
        const date = moment().add(moment.duration(payload?.duration)).toDate();
        schedule.scheduleJob(date, () => {
          examAPI.submitExam({ examId: payload?._id });
          console.log("Exam successfully over.");
        });
        return {
          code: "200",
          success: true,
          message: "Exam successfully started.",
          token,
          payload,
        };
      } catch (error) {
        throw new GraphQLError(error.message);
      }
    },
    addAnswer: async (
      _,
      { examId, questionId, answeredIndex },
      { token, dataSources: { examAPI } }
    ) => {
      try {
        const isExamSubmitted = await examAPI.examExists({
          examId,
          submitted: true,
        });
        if (isExamSubmitted) throw new GraphQLError("Exam has ended.");
        const payload = await examAPI.addAnswer({
          questionId,
          answeredIndex,
        });
        if (!payload) throw new GraphQLError("Question does not exist.");
        return {
          code: "200",
          success: true,
          message: "Answer successfully added.",
          token,
          payload: answeredIndex,
        };
      } catch (error) {
        throw new GraphQLError(error.message);
      }
    },
    removeAnswer: async (
      _,
      { examId, questionId },
      { token, dataSources: { examAPI } }
    ) => {
      try {
        const isExamSubmitted = await examAPI.examExists({
          examId,
          submitted: true,
        });
        if (isExamSubmitted) throw new GraphQLError("Exam has ended.");
        const payload = await examAPI.removeAnswer({
          questionId,
        });
        if (!payload) throw new GraphQLError("Question does not exist.");
        return {
          code: "200",
          success: true,
          message: "Answer successfully removed.",
          token,
          payload: -1,
        };
      } catch (error) {
        throw new GraphQLError(error.message);
      }
    },
    submitExam: async (
      _,
      { examId },
      { token, dataSources: { examAPI, testAPI } }
    ) => {
      try {
        const payload = await examAPI.submitExam({ examId });
        if (!payload) throw new GraphQLError("Exam does not exist.");
        const test = await testAPI.test({ testId: payload?.test });
        if (!test) throw new GraphQLError("Test does not exist.");
        const testQuestions = new Map(
          test?.questions?.map((q) => [String(q?._id), q])
        );
        const populatedQuestions = payload.questions.map((q) => ({
          ...q.toObject(),
          testQuestion: testQuestions.get(String(q.testQuestion)),
        }));
        return {
          code: "200",
          success: true,
          message: "Exam successfully over.",
          token,
          payload: { ...payload.toObject(), questions: populatedQuestions },
        };
      } catch (error) {
        throw new GraphQLError(error.message);
      }
    },
  },
};

module.exports = ExamResolver;
