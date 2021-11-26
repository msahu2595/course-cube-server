const { UserInputError } = require("apollo-server");

const BundleContentResolver = {
  Query: {
    bundleContents: async (
      _,
      { offset = 0, limit = 10, bundleId, filter },
      { dataSources: { bundleContentAPI } }
    ) => {
      try {
        const payload = await bundleContentAPI.bundleContents({
          offset,
          limit,
          bundleId,
          ...filter,
        });
        return {
          code: 200,
          success: true,
          message: "Successfully get bundle contents.",
          limit,
          offset,
          bundleId,
          filter,
          payload,
        };
      } catch (error) {
        throw new UserInputError(error.message);
      }
    },
    bundleContent: async (
      _,
      { bundleContentId },
      { dataSources: { bundleContentAPI } }
    ) => {
      try {
        const payload = await bundleContentAPI.bundleContent({
          bundleContentId,
        });
        return {
          code: 200,
          success: true,
          message: "Successfully get bundle content.",
          payload,
        };
      } catch (error) {
        throw new UserInputError(error.message);
      }
    },
  },
  Mutation: {
    addBundleContent: async (
      _,
      { bundleId, bundleContentInput },
      {
        dataSources: {
          bundleContentAPI,
          bundleAPI,
          videoAPI,
          testAPI,
          documentAPI,
        },
      }
    ) => {
      try {
        const bundleExists = await bundleAPI.bundleExists({ bundleId });
        if (!bundleExists)
          throw new UserInputError("Bundle id does not exists.");
        let exists = false;
        if (bundleContentInput?.type === "Video") {
          exists = await videoAPI.videoExists({
            videoId: bundleContentInput?.media,
          });
        }
        if (bundleContentInput?.type === "Test") {
          exists = await testAPI.testExists({
            testId: bundleContentInput?.media,
          });
        }
        if (bundleContentInput?.type === "Document") {
          exists = await documentAPI.documentExists({
            documentId: bundleContentInput?.media,
          });
        }
        // console.log("exists ==> ", exists);
        if (exists) {
          const payload = await bundleContentAPI.addBundleContent({
            bundleId,
            bundleContentInput,
          });
          return {
            code: "200",
            success: true,
            message: "Bundle content added successfully.",
            payload,
          };
        } else {
          throw new UserInputError(
            "Media file not exists, Please check & try again."
          );
        }
      } catch (error) {
        console.log(error);
        throw new UserInputError(error.message);
      }
    },
    editBundleContent: async (
      _,
      { bundleContentId, bundleContentInput },
      { dataSources: { bundleContentAPI, videoAPI, testAPI, documentAPI } }
    ) => {
      try {
        let exists = false;
        if (bundleContentInput?.type === "Video") {
          exists = await videoAPI.videoExists({
            videoId: bundleContentInput?.media,
          });
        }
        if (bundleContentInput?.type === "Test") {
          exists = await testAPI.testExists({
            testId: bundleContentInput?.media,
          });
        }
        if (bundleContentInput?.type === "Document") {
          exists = await documentAPI.documentExists({
            documentId: bundleContentInput?.media,
          });
        }
        // console.log("exists ==> ", exists);
        if (exists) {
          const payload = await bundleContentAPI.editBundleContent({
            bundleContentId,
            bundleContentInput,
          });
          return {
            code: "200",
            success: true,
            message: "Bundle content edited successfully.",
            payload,
          };
        } else {
          throw new UserInputError(
            "Media file not exists, Please check & try again."
          );
        }
      } catch (error) {
        throw new UserInputError(error.message);
      }
    },
    deleteBundleContent: async (
      _,
      { bundleContentId },
      { dataSources: { bundleContentAPI } }
    ) => {
      try {
        const payload = await bundleContentAPI.deleteBundleContent({
          bundleContentId,
        });
        return {
          code: "200",
          success: true,
          message: "Bundle content deleted successfully.",
          payload,
        };
      } catch (error) {
        throw new UserInputError(error.message);
      }
    },
  },
};

module.exports = BundleContentResolver;
