const { GraphQLError } = require("graphql");

const ContentResolver = {
  Media: {
    __resolveType(obj) {
      // Only Video has a time field
      if (obj.time) {
        return "Video";
      }
      // Only Test has a duration field
      if (obj.duration) {
        return "Test";
      }
      // Only Document has a pages field
      if (obj.pages) {
        return "Document";
      }
      return null; // GraphQLError is thrown
    },
  },
  Query: {
    contents: async (
      _,
      { offset = 0, limit = 10, search, filter },
      { token, dataSources: { contentAPI } }
    ) => {
      try {
        const payload = await contentAPI.contents({
          offset,
          limit,
          search,
          ...filter,
        });
        return {
          code: 200,
          success: true,
          message: "Successfully get contents.",
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
    content: async (
      _,
      { contentId },
      { token, dataSources: { contentAPI } }
    ) => {
      try {
        const payload = await contentAPI.content({
          contentId,
        });
        return {
          code: 200,
          success: true,
          message: "Successfully get content.",
          token,
          payload,
        };
      } catch (error) {
        throw new GraphQLError(error.message);
      }
    },
  },
  Mutation: {
    addContent: async (
      _,
      { contentInput },
      { token, dataSources: { contentAPI, videoAPI, testAPI, documentAPI } }
    ) => {
      try {
        const mediaExists = await contentAPI.mediaContentExists({
          media: contentInput.media,
        });
        if (mediaExists)
          throw new GraphQLError("Content already created using this media.");
        let exists = false;
        switch (contentInput?.type) {
          case "Video":
            exists = await videoAPI.videoExists({
              videoId: contentInput?.media,
            });
            break;
          case "Test":
            exists = await testAPI.testExists({
              testId: contentInput?.media,
            });
            if (exists.questions.length < 5) {
              throw new GraphQLError(
                "Minimum 5 questions required in given test for add content."
              );
            }
            break;
          case "Document":
            exists = await documentAPI.documentExists({
              documentId: contentInput?.media,
            });
            break;
          default:
            break;
        }
        console.log("exists ==> ", exists);
        if (exists) {
          const payload = await contentAPI.addContent({ contentInput });
          return {
            code: "200",
            success: true,
            message: "Content added successfully.",
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
    editContent: async (
      _,
      { contentId, contentInput },
      { token, dataSources: { contentAPI, videoAPI, testAPI, documentAPI } }
    ) => {
      try {
        const mediaExists = await contentAPI.mediaContentExists({
          media: contentInput.media,
        });
        if (mediaExists && mediaExists._id.toString() !== contentId)
          throw new GraphQLError("Another content already using this media.");
        let exists = false;
        switch (contentInput?.type) {
          case "Video":
            exists = await videoAPI.videoExists({
              videoId: contentInput?.media,
            });
            break;
          case "Test":
            exists = await testAPI.testExists({
              testId: contentInput?.media,
            });
            break;
          case "Document":
            exists = await documentAPI.documentExists({
              documentId: contentInput?.media,
            });
            break;
          default:
            break;
        }
        console.log("exists ==> ", exists);
        if (exists) {
          const payload = await contentAPI.editContent({
            contentId,
            contentInput,
          });
          return {
            code: "200",
            success: true,
            message: "Content edited successfully.",
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
    deleteContent: async (
      _,
      { contentId },
      { token, dataSources: { contentAPI } }
    ) => {
      try {
        const payload = await contentAPI.deleteContent({ contentId });
        return {
          code: "200",
          success: true,
          message: "Content deleted successfully.",
          token,
          payload,
        };
      } catch (error) {
        throw new GraphQLError(error.message);
      }
    },
  },
};

module.exports = ContentResolver;
