const { UserInputError } = require("apollo-server");

const CourseResolver = {
  Query: {
    courses: async (
      _,
      { offset = 0, limit = 10, search, filter },
      { dataSources: { courseAPI } }
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
          limit,
          offset,
          search,
          filter,
          payload,
        };
      } catch (error) {
        throw new UserInputError(error.message);
      }
    },
    course: async (_, { courseId }, { dataSources: { courseAPI } }) => {
      try {
        const payload = await courseAPI.course({
          courseId,
        });
        return {
          code: 200,
          success: true,
          message: "Successfully get course.",
          payload,
        };
      } catch (error) {
        throw new UserInputError(error.message);
      }
    },
  },
  Mutation: {
    addCourse: async (_, { courseInput }, { dataSources: { courseAPI } }) => {
      try {
        const payload = await courseAPI.addCourse({ courseInput });
        return {
          code: "200",
          success: true,
          message: "Course added successfully.",
          payload,
        };
      } catch (error) {
        console.log(error);
        throw new UserInputError(error.message);
      }
    },
    editCourse: async (
      _,
      { courseId, courseInput },
      { dataSources: { courseAPI } }
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
          payload,
        };
      } catch (error) {
        throw new UserInputError(error.message);
      }
    },
    deleteCourse: async (_, { courseId }, { dataSources: { courseAPI } }) => {
      try {
        const payload = await courseAPI.deleteCourse({ courseId });
        return {
          code: "200",
          success: true,
          message: "Course deleted successfully.",
          payload,
        };
      } catch (error) {
        throw new UserInputError(error.message);
      }
    },
  },
};

module.exports = CourseResolver;
