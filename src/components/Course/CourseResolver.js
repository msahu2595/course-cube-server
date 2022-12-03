const { GraphQLError } = require("graphql");

const CourseResolver = {
  Query: {
    courses: async (
      _,
      { offset = 0, limit = 10, search, filter },
      { token, dataSources: { courseAPI } }
    ) => {
      try {
        const payload = await courseAPI.courses({
          offset,
          limit,
          search,
          ...filter,
        });
        return {
          code: 200,
          success: true,
          message: "Successfully get courses.",
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
    course: async (_, { courseId }, { token, dataSources: { courseAPI } }) => {
      try {
        const payload = await courseAPI.course({
          courseId,
        });
        return {
          code: 200,
          success: true,
          message: "Successfully get course.",
          token,
          payload,
        };
      } catch (error) {
        throw new GraphQLError(error.message);
      }
    },
  },
  Mutation: {
    addCourse: async (_, { courseInput }, { token, dataSources: { courseAPI } }) => {
      try {
        const payload = await courseAPI.addCourse({ courseInput });
        return {
          code: "200",
          success: true,
          message: "Course added successfully.",
          token,
          payload,
        };
      } catch (error) {
        console.log(error);
        throw new GraphQLError(error.message);
      }
    },
    editCourse: async (
      _,
      { courseId, courseInput },
      { token, dataSources: { courseAPI } }
    ) => {
      try {
        const payload = await courseAPI.editCourse({
          courseId,
          courseInput,
        });
        return {
          code: "200",
          success: true,
          message: "Course edited successfully.",
          token,
          payload,
        };
      } catch (error) {
        throw new GraphQLError(error.message);
      }
    },
    deleteCourse: async (_, { courseId }, { token, dataSources: { courseAPI } }) => {
      try {
        const payload = await courseAPI.deleteCourse({ courseId });
        return {
          code: "200",
          success: true,
          message: "Course deleted successfully.",
          token,
          payload,
        };
      } catch (error) {
        throw new GraphQLError(error.message);
      }
    },
  },
};

module.exports = CourseResolver;
