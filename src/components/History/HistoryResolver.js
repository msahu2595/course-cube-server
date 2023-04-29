const { GraphQLError } = require("graphql");

const HistoryResolver = {
  Query: {
    history: async (
      _,
      { offset = 0, limit = 10, filter },
      { token, dataSources: { historyAPI } }
    ) => {
      try {
        const payload = await historyAPI.history({
          offset,
          limit,
          ...filter,
        });
        return {
          code: 200,
          success: true,
          message: "Successfully get history.",
          token,
          limit,
          offset,
          filter,
          payload,
        };
      } catch (error) {
        throw new GraphQLError(error.message);
      }
    },
    historyUsers: async (
      _,
      { offset = 0, limit = 10, refId },
      { token, dataSources: { historyAPI } }
    ) => {
      try {
        const payload = await historyAPI.historyUsers({
          offset,
          limit,
          refId,
        });
        return {
          code: 200,
          success: true,
          message: "Successfully get history users.",
          token,
          limit,
          offset,
          refId,
          payload,
        };
      } catch (error) {
        throw new GraphQLError(error.message);
      }
    },
  },
  Mutation: {
    addHistory: async (
      _,
      { refId, type, subType = null },
      {
        token,
        dataSources: {
          historyAPI,
          bundleContentAPI,
          contentAPI,
          articleAPI,
          questionAPI,
        },
      }
    ) => {
      try {
        let exists = false;
        switch (type) {
          case "BundleContent":
            exists = await bundleContentAPI.bundleContentExists({
              bundleContentId: refId,
              type: subType,
            });
            break;
          case "Content":
            exists = await contentAPI.contentExists({
              contentId: refId,
              type: subType,
            });
            break;
          case "Article":
            exists = await articleAPI.testExists({
              articleId: refId,
            });
            break;
          case "Question":
            exists = await questionAPI.questionExists({
              questionId: refId,
            });
            break;
          default:
            break;
        }
        console.log("exists ==> ", exists);
        if (exists) {
          const payload = await historyAPI.addHistory({ refId, type, subType });
          return {
            code: "200",
            success: payload?._id ? true : false,
            message: `${
              payload?._id ? "Added" : "Not added"
            } into your history.`,
            token,
          };
        } else {
          throw new GraphQLError(
            `${type} not exists, Please check & try again.`
          );
        }
      } catch (error) {
        throw new Error(error.message, error.extensions.code);
      }
    },
    removeHistory: async (
      _,
      { refId },
      { token, dataSources: { historyAPI } }
    ) => {
      try {
        const payload = await historyAPI.removeHistory({ refId });
        return {
          code: "200",
          success: payload?._id ? true : false,
          message: `${
            payload?._id ? "Removed" : "Not removed"
          } from your history.`,
          token,
        };
      } catch (error) {
        throw new Error(error.message, error.extensions.code);
      }
    },
  },
};

module.exports = HistoryResolver;
