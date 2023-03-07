const { GraphQLError } = require("graphql");

const PurchaseResolver = {
  Item: {
    __resolveType(obj) {
      // Only Bundle has a syllabus field
      if (obj.syllabus) {
        return "Bundle";
      } else {
        return "Content";
      }
    },
  },
  Query: {
    purchases: async (
      _,
      { offset = 0, limit = 10, filter },
      { token, dataSources: { purchaseAPI } }
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
    purchasedUsers: async (
      _,
      { offset = 0, limit = 10, item },
      { token, dataSources: { purchaseAPI } }
    ) => {
      try {
        const payload = await purchaseAPI.purchasedUsers({
          offset,
          limit,
          item,
        });
        return {
          code: 200,
          success: true,
          message: "Successfully get purchased users.",
          token,
          limit,
          offset,
          item,
          payload,
        };
      } catch (error) {
        throw new GraphQLError(error.message);
      }
    },
  },
  Mutation: {
    createPurchase: async (
      _,
      { purchaseInput },
      { token, dataSources: { purchaseAPI } }
    ) => {
      try {
        const payload = await purchaseAPI.createPurchase(purchaseInput);
        return {
          code: "200",
          success: true,
          message: "Purchase added successfully.",
          token,
          payload,
        };
      } catch (error) {
        console.log(error);
        throw new GraphQLError(error.message);
      }
    },
  },
};

module.exports = PurchaseResolver;
