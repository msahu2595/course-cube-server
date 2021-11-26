const { UserInputError } = require("apollo-server");

const PurchaseResolver = {
  Query: {
    purchases: async (
      _,
      { offset = 0, limit = 10, filter },
      { dataSources: { purchaseAPI } }
    ) => {
      try {
        const payload = await purchaseAPI.purchases({
          offset,
          limit,
          ...filter,
        });
        return {
          code: 200,
          success: true,
          message: "Successfully get purchases.",
          limit,
          offset,
          filter,
          payload,
        };
      } catch (error) {
        throw new UserInputError(error.message);
      }
    },
    purchasedUsers: async (
      _,
      { offset = 0, limit = 10, refId },
      { dataSources: { purchaseAPI } }
    ) => {
      try {
        const payload = await purchaseAPI.purchasedUsers({
          offset,
          limit,
          refId,
        });
        return {
          code: 200,
          success: true,
          message: "Successfully get purchased users.",
          limit,
          offset,
          refId,
          payload,
        };
      } catch (error) {
        throw new UserInputError(error.message);
      }
    },
  },
  Mutation: {
    createPurchase: async (
      _,
      { purchaseInput },
      { dataSources: { purchaseAPI } }
    ) => {
      try {
        const payload = await purchaseAPI.createPurchase(purchaseInput);
        return {
          code: "200",
          success: true,
          message: "Purchase added successfully.",
          payload,
        };
      } catch (error) {
        console.log(error);
        throw new UserInputError(error.message);
      }
    },
  },
};

module.exports = PurchaseResolver;
