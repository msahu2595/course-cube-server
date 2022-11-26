const { GraphQLError } = require("graphql");

const DocumentResolver = {
  Query: {
    documents: async (
      _,
      { offset = 0, limit = 10, search, filter },
      { dataSources: { documentAPI } }
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
    document: async (_, { documentId }, { dataSources: { documentAPI } }) => {
      try {
        const payload = await documentAPI.document({
          documentId,
        });
        return {
          code: 200,
          success: true,
          message: "Successfully get document.",
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
      { dataSources: { documentAPI } }
    ) => {
      try {
        const payload = await documentAPI.addDocument({ documentInput });
        return {
          code: "200",
          success: true,
          message: "Document added successfully.",
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
      { dataSources: { documentAPI } }
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
          payload,
        };
      } catch (error) {
        throw new GraphQLError(error.message);
      }
    },
    deleteDocument: async (
      _,
      { documentId },
      { dataSources: { documentAPI } }
    ) => {
      try {
        const payload = await documentAPI.deleteDocument({ documentId });
        return {
          code: "200",
          success: true,
          message: "Document deleted successfully.",
          payload,
        };
      } catch (error) {
        throw new GraphQLError(error.message);
      }
    },
  },
};

module.exports = DocumentResolver;
