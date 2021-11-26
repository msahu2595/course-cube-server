const { UserInputError } = require("apollo-server");

const BundleResolver = {
  Query: {
    bundles: async (
      _,
      { offset = 0, limit = 10, search, filter },
      { dataSources: { bundleAPI } }
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
    bundle: async (_, { bundleId }, { dataSources: { bundleAPI } }) => {
      try {
        const payload = await bundleAPI.bundle({
          bundleId,
        });
        return {
          code: 200,
          success: true,
          message: "Successfully get bundle.",
          payload,
        };
      } catch (error) {
        throw new UserInputError(error.message);
      }
    },
  },
  Mutation: {
    addBundle: async (_, { bundleInput }, { dataSources: { bundleAPI } }) => {
      try {
        const payload = await bundleAPI.addBundle({ bundleInput });
        return {
          code: "200",
          success: true,
          message: "Bundle added successfully.",
          payload,
        };
      } catch (error) {
        console.log(error);
        throw new UserInputError(error.message);
      }
    },
    editBundle: async (
      _,
      { bundleId, bundleInput },
      { dataSources: { bundleAPI } }
    ) => {
      try {
        const payload = await bundleAPI.editBundle({
          bundleId,
          bundleInput,
        });
        return {
          code: "200",
          success: true,
          message: "Bundle edited successfully.",
          payload,
        };
      } catch (error) {
        throw new UserInputError(error.message);
      }
    },
    deleteBundle: async (_, { bundleId }, { dataSources: { bundleAPI } }) => {
      try {
        const payload = await bundleAPI.deleteBundle({ bundleId });
        return {
          code: "200",
          success: true,
          message: "Bundle deleted successfully.",
          payload,
        };
      } catch (error) {
        throw new UserInputError(error.message);
      }
    },
  },
};

module.exports = BundleResolver;
