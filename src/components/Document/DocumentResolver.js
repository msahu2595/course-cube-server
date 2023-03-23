const { GraphQLError } = require("graphql");

const DocumentResolver = {
  Query: {
    documents: async (
      _,
      { offset = 0, limit = 10, search, filter },
      { token, dataSources: { documentAPI } }
    ) => {
      try {
        const payload = await documentAPI.documents({
          offset,
          limit,
          search,
          ...filter,
        });
        return {
          code: 200,
          success: true,
          message: "Successfully get documents.",
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
    document: async (
      _,
      { documentId },
      { token, dataSources: { documentAPI } }
    ) => {
      try {
        const payload = await documentAPI.document({
          documentId,
        });
        return {
          code: 200,
          success: true,
          message: "Successfully get document.",
          token,
          payload,
        };
      } catch (error) {
        throw new GraphQLError(error.message);
      }
    },
  },
  Mutation: {
    addDocument: async (
      _,
      { documentInput },
      { token, dataSources: { documentAPI } }
    ) => {
      try {
        const documentExists = await documentAPI.documentURLExists({
          url: documentInput.url,
        });
        if (documentExists) throw new GraphQLError("Document already added.");
        const payload = await documentAPI.addDocument({ documentInput });
        return {
          code: "200",
          success: true,
          message: "Document added successfully.",
          token,
          payload,
        };
      } catch (error) {
        console.log(error);
        throw new GraphQLError(error.message);
      }
    },
    editDocument: async (
      _,
      { documentId, documentInput },
      { token, dataSources: { documentAPI } }
    ) => {
      try {
        const payload = await documentAPI.editDocument({
          documentId,
          documentInput,
        });
        return {
          code: "200",
          success: true,
          message: "Document edited successfully.",
          token,
          payload,
        };
      } catch (error) {
        throw new GraphQLError(error.message);
      }
    },
    deleteDocument: async (
      _,
      { documentId },
      { token, dataSources: { documentAPI, contentAPI, bundleContentAPI } }
    ) => {
      try {
        const contentExists = await contentAPI.mediaContentExists({
          media: documentId,
        });
        const bundleContentExists =
          await bundleContentAPI.mediaBundleContentExists({
            media: documentId,
          });
        if (contentExists || bundleContentExists)
          throw new GraphQLError(
            `${
              contentExists ? "Content" : "Course content"
            } is using this document, Please remove from that before deleting this.`
          );
        const payload = await documentAPI.deleteDocument({ documentId });
        return {
          code: "200",
          success: true,
          message: "Document deleted successfully.",
          token,
          payload,
        };
      } catch (error) {
        throw new GraphQLError(error.message);
      }
    },
  },
};

module.exports = DocumentResolver;
