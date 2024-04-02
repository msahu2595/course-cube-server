const { GraphQLError } = require("graphql");
const fileHandler = require("../../libs/fileHandler");

const BundleContentResolver = {
  BundleContent: {
    // (parent, args, context, info)
    bundle: async (parent, __, { dataSources: { bundleAPI } }) => {
      const bundle = await bundleAPI.bundle({
        bundleId: parent?.bundle,
      });
      return bundle;
    },
  },
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
        const mediaExists = await bundleContentAPI.mediaBundleContentExists({
          bundleId,
          media: bundleContentInput.media,
          subjectId: bundleContentInput?.subjectId || null,
        });
        if (mediaExists)
          throw new GraphQLError(
            "Bundle content already created using this media."
          );
        let exists = false;
        switch (bundleContentInput?.type) {
          case "Video":
            exists = await videoAPI.videoExists({
              videoId: bundleContentInput?.media,
            });
            break;
          case "Test":
            exists = await testAPI.testExists({
              testId: bundleContentInput?.media,
            });
            if (exists.questions < 5) {
              throw new GraphQLError(
                "Minimum 5 questions required in given test for add content."
              );
            }
            break;
          case "Document":
            exists = await documentAPI.documentExists({
              documentId: bundleContentInput?.media,
            });
            break;
          default:
            break;
        }
        console.log("exists ==> ", exists);
        if (exists) {
          if (bundleContentInput.image) {
            bundleContentInput.image = await fileHandler.moveFromTmp({
              filePath: bundleContentInput.image,
              folderName: "bundleContent",
            });
          }
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
      { bundleId, bundleContentId, bundleContentInput },
      {
        token,
        dataSources: { bundleContentAPI, videoAPI, testAPI, documentAPI },
      }
    ) => {
      try {
        const mediaExists = await bundleContentAPI.mediaBundleContentExists({
          bundleId,
          media: bundleContentInput.media,
          subjectId: bundleContentInput?.subjectId || null,
        });
        if (mediaExists && mediaExists._id.toString() !== bundleContentId)
          throw new GraphQLError(
            "Another bundle content already using this media."
          );
        let exists = false;
        switch (bundleContentInput?.type) {
          case "Video":
            exists = await videoAPI.videoExists({
              videoId: bundleContentInput?.media,
            });
            break;
          case "Test":
            exists = await testAPI.testExists({
              testId: bundleContentInput?.media,
            });
            break;
          case "Document":
            exists = await documentAPI.documentExists({
              documentId: bundleContentInput?.media,
            });
            break;
          default:
            break;
        }
        console.log("exists ==> ", exists);
        if (exists) {
          if (bundleContentInput.image) {
            const bundleContent = await bundleContentAPI.bundleContentById(
              bundleContentId
            );
            bundleContentInput.image = await fileHandler.moveFromTmp({
              filePath: bundleContentInput.image,
              folderName: "bundleContent",
            });
            if (/^assets\/bundleContent\/.*$/gm.test(bundleContent.image)) {
              fileHandler.remove({ filePath: bundleContent.image });
            }
          }
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
        const bundleContent = await bundleContentAPI.bundleContentById(
          bundleContentId
        );
        if (/^assets\/bundleContent\/.*$/gm.test(bundleContent.image)) {
          fileHandler.remove({ filePath: bundleContent.image });
        }
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
