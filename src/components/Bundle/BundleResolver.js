const { GraphQLError } = require("graphql");
const fileHandler = require("../../libs/fileHandler");

const BundleResolver = {
  Query: {
    bundles: async (
      _,
      { offset = 0, limit = 10, search, filter },
      { token, dataSources: { bundleAPI } }
    ) => {
      try {
        const payload = await bundleAPI.bundles({
          offset,
          limit,
          search,
          ...filter,
        });
        return {
          code: 200,
          success: true,
          message: "Successfully get bundles.",
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
    bundle: async (_, { bundleId }, { token, dataSources: { bundleAPI } }) => {
      try {
        const payload = await bundleAPI.bundle({
          bundleId,
        });
        return {
          code: 200,
          success: true,
          message: "Successfully get bundle.",
          token,
          payload,
        };
      } catch (error) {
        throw new GraphQLError(error.message);
      }
    },
    bundleSyllabus: async (
      _,
      { bundleId },
      { token, dataSources: { bundleAPI } }
    ) => {
      try {
        const payload = await bundleAPI.bundleSyllabus({
          bundleId,
        });
        return {
          code: 200,
          success: true,
          message: "Successfully get bundle syllabus.",
          token,
          payload,
        };
      } catch (error) {
        throw new GraphQLError(error.message);
      }
    },
  },
  Mutation: {
    addBundle: async (
      _,
      { bundleInput },
      { token, dataSources: { bundleAPI, notificationAPI } }
    ) => {
      try {
        if (bundleInput.image) {
          bundleInput.image = await fileHandler.moveFromTmp({
            filePath: bundleInput.image,
            folderName: "bundle",
          });
        }
        const payload = await bundleAPI.addBundle({ bundleInput });
        if (payload?.visible) {
          notificationAPI.createNotification({
            title: `New ${bundleInput?.type} Added.`,
            body: `${bundleInput?.title} is available for you.`,
            type: "CONTENT",
            route: "CourseDetailTopTabNavigator",
            params: { bundleId: payload?._id },
          });
        }
        return {
          code: "200",
          success: true,
          message: "Bundle added successfully.",
          token,
          payload,
        };
      } catch (error) {
        console.log(error);
        throw new GraphQLError(error.message);
      }
    },
    editBundle: async (
      _,
      { bundleId, bundleInput },
      { token, dataSources: { bundleAPI } }
    ) => {
      try {
        if (bundleInput.image) {
          const bundle = await bundleAPI.bundleById(bundleId);
          bundleInput.image = await fileHandler.moveFromTmp({
            filePath: bundleInput.image,
            folderName: "bundle",
          });
          if (/^assets\/bundle\/.*$/gm.test(bundle.image)) {
            fileHandler.remove({ filePath: bundle.image });
          }
        }
        const payload = await bundleAPI.editBundle({
          bundleId,
          bundleInput,
        });
        return {
          code: "200",
          success: true,
          message: "Bundle edited successfully.",
          token,
          payload,
        };
      } catch (error) {
        throw new GraphQLError(error.message);
      }
    },
    deleteBundle: async (
      _,
      { bundleId },
      { token, dataSources: { bundleAPI } }
    ) => {
      try {
        const bundle = await bundleAPI.bundleById(bundleId);
        if (/^assets\/bundle\/.*$/gm.test(bundle.image)) {
          fileHandler.remove({ filePath: bundle.image });
        }
        const payload = await bundleAPI.deleteBundle({ bundleId });
        return {
          code: "200",
          success: true,
          message: "Bundle deleted successfully.",
          token,
          payload,
        };
      } catch (error) {
        throw new GraphQLError(error.message);
      }
    },
    addBundleSyllabus: async (
      _,
      { bundleId, syllabusInput },
      { token, dataSources: { bundleAPI } }
    ) => {
      try {
        if (syllabusInput?.subjectIds?.length) {
          const subject = await bundleAPI.bundleSyllabusSubjectById({
            bundleId,
            subjectId: syllabusInput.subjectIds.at(-1),
          });
          console.log({ subject });
          if (!subject) {
            throw new GraphQLError("Invalid subject id.");
          }
          if (!subject?.isSection) {
            throw new GraphQLError(
              "Please make parent a section, before adding subject."
            );
          }
        }
        const payload = await bundleAPI.addBundleSyllabus({
          bundleId,
          syllabusInput,
        });
        return {
          code: "200",
          success: true,
          message: "Bundle syllabus added successfully.",
          token,
          payload,
        };
      } catch (error) {
        console.log(error);
        throw new GraphQLError(error.message);
      }
    },
    editBundleSyllabus: async (
      _,
      { bundleId, syllabusInput },
      { token, dataSources: { bundleAPI, bundleContentAPI } }
    ) => {
      try {
        const subject = await bundleAPI.bundleSyllabusSubjectById({
          bundleId,
          subjectId: syllabusInput.subjectId,
        });
        console.log({ subject });
        if (!subject) {
          throw new GraphQLError("Invalid subject id.");
        }
        if (typeof syllabusInput?.isSection === "boolean") {
          if (
            subject?.isSection &&
            !syllabusInput?.isSection &&
            subject?.syllabus?.length > 0
          ) {
            throw new GraphQLError(
              "Please first delete all sub-subject, before converting this section into subject."
            );
          } else if (!subject?.isSection && syllabusInput?.isSection) {
            await bundleContentAPI.deleteAllBundleContentWithSubjectId({
              subjectId: syllabusInput.subjectId,
            });
          }
        }
        const payload = await bundleAPI.editBundleSyllabus({
          bundleId,
          syllabusInput,
        });
        return {
          code: "200",
          success: true,
          message: "Bundle syllabus edited successfully.",
          token,
          payload,
        };
      } catch (error) {
        throw new GraphQLError(error.message);
      }
    },
    deleteBundleSyllabus: async (
      _,
      { bundleId, syllabusInput },
      { token, dataSources: { bundleAPI, bundleContentAPI } }
    ) => {
      try {
        const subject = await bundleAPI.bundleSyllabusSubjectById({
          bundleId,
          subjectId: syllabusInput.subjectId,
        });
        console.log({ subject });
        if (!subject) {
          throw new GraphQLError("Invalid subject id.");
        }
        if (subject?.isSection) {
          if (subject?.syllabus?.length > 0) {
            throw new GraphQLError(
              "Please first delete all sub-subject, before deleting this section."
            );
          }
        } else {
          await bundleContentAPI.deleteAllBundleContentWithSubjectId({
            subjectId: syllabusInput.subjectId,
          });
        }
        const payload = await bundleAPI.deleteBundleSyllabus({
          bundleId,
          syllabusInput,
        });
        return {
          code: "200",
          success: true,
          message: "Bundle syllabus deleted successfully.",
          token,
          payload,
        };
      } catch (error) {
        throw new GraphQLError(error.message);
      }
    },
  },
};

module.exports = BundleResolver;
