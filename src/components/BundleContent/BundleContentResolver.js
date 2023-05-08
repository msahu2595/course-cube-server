const { GraphQLError } = require("graphql");

const BundleContentResolver = {
  Query: {
    bundleContents: async (
      _,
      { offset = 0, limit = 10, bundleId, filter },
      { token, dataSources: { bundleContentAPI } }
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
          token,
          limit,
          offset,
          bundleId,
          filter,
          payload,
        };
      } catch (error) {
        throw new GraphQLError(error.message);
      }
    },
    bundleContent: async (
      _,
      { bundleContentId },
      { token, dataSources: { bundleContentAPI, historyAPI } }
    ) => {
      try {
        const payload = await bundleContentAPI.bundleContent({
          bundleContentId,
        });
        historyAPI.addHistory({
          refId: bundleContentId,
          type: "BundleContent",
          subType: payload.type,
        });
        return {
          code: 200,
          success: true,
          message: "Successfully get bundle content.",
          token,
          payload,
        };
      } catch (error) {
        throw new GraphQLError(error.message);
      }
    },
  },
  Mutation: {
    addBundleContent: async (
      _,
      { bundleId, bundleContentInput },
      {
        token,
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
        if (!bundleExists) throw new GraphQLError("Bundle id does not exists.");
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
            token,
            payload,
          };
        } else {
          throw new GraphQLError(
            "Media file not exists, Please check & try again."
          );
        }
      } catch (error) {
        console.log(error);
        throw new GraphQLError(error.message);
      }
    },
    editBundleContent: async (
      _,
      { bundleContentId, bundleContentInput },
      {
        token,
        dataSources: { bundleContentAPI, videoAPI, testAPI, documentAPI },
      }
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
            token,
            payload,
          };
        } else {
          throw new GraphQLError(
            "Media file not exists, Please check & try again."
          );
        }
      } catch (error) {
        throw new GraphQLError(error.message);
      }
    },
    deleteBundleContent: async (
      _,
      { bundleContentId },
      { token, dataSources: { bundleContentAPI } }
    ) => {
      try {
        const payload = await bundleContentAPI.deleteBundleContent({
          bundleContentId,
        });
        return {
          code: "200",
          success: true,
          message: "Bundle content deleted successfully.",
          token,
          payload,
        };
      } catch (error) {
        throw new GraphQLError(error.message);
      }
    },
  },
};

module.exports = BundleContentResolver;
