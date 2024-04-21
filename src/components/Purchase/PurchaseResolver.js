const { GraphQLError } = require("graphql");

const PurchaseResolver = {
  PurchaseItem: {
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
      { offset = 0, limit = 10, itemId },
      { token, dataSources: { purchaseAPI } }
    ) => {
      try {
        const payload = await purchaseAPI.purchasedUsers({
          offset,
          limit,
          itemId,
        });
        return {
          code: 200,
          success: true,
          message: "Successfully get purchased users.",
          token,
          limit,
          offset,
          itemId,
          payload,
        };
      } catch (error) {
        throw new GraphQLError(error.message);
      }
    },
    purchase: async (
      _,
      { purchaseId },
      { token, dataSources: { purchaseAPI } }
    ) => {
      try {
        const payload = await purchaseAPI.purchase({
          purchaseId,
        });
        return {
          code: 200,
          success: true,
          message: "Successfully get purchase.",
          token,
          payload,
        };
      } catch (error) {
        throw new GraphQLError(error.message);
      }
    },
    purchaseStatus: async (
      _,
      { orderId },
      { token, dataSources: { purchaseAPI } }
    ) => {
      try {
        const payload = await purchaseAPI.purchaseStatus({
          orderId,
        });
        return {
          code: 200,
          success: true,
          message: "Successfully get purchase status.",
          token,
          payload: payload?.status,
        };
      } catch (error) {
        throw new GraphQLError(error.message);
      }
    },
  },
  Mutation: {
    initiateTransaction: async (
      _,
      { transactionInput },
      { token, dataSources: { contentAPI, bundleAPI, purchaseAPI } }
    ) => {
      try {
        let item = null;
        switch (transactionInput?.type) {
          case "Bundle":
            item = await bundleAPI.bundleById(transactionInput?.itemId);
            break;
          case "Content":
            item = await contentAPI.contentById(transactionInput?.itemId);
            break;
          default:
            break;
        }
        if (!item) throw new GraphQLError("Item does not exist.");
        // TODO: Add payment account details collection for admin
        const payee = {
          payeeVPA: "9009630808@pz",
          payeeName: "MANISH KUMAR SAHU",
        };
        if (!payee) throw new GraphQLError("Payee does not exist.");
        const transaction = await purchaseAPI.initiateTransaction({
          item,
          ...transactionInput,
        });
        const payload = {
          ...transaction,
          ...payee,
        };
        console.log("payload", payload);
        return {
          code: "200",
          success: true,
          message: "Transaction initiated successfully.",
          token,
          // TODO: replace txnToken with some token & token in redis, schedule 15 min job for HALT transaction.
          txnToken: "1234567890",
          payload,
        };
      } catch (error) {
        console.log(error);
        throw new GraphQLError(error.message);
      }
    },
    updateTransaction: async (
      _,
      { orderId, transactionInput },
      { token, dataSources: { purchaseAPI } }
    ) => {
      try {
        // TODO: check txnToken and PurchaseStatus before update
        const { paymentMode, paymentApp, paymentVPA } = transactionInput;
        if (
          (paymentMode === "UPI" || paymentMode === "UPI_INTENT") &&
          (!paymentApp || !paymentVPA)
        )
          throw new GraphQLError("Payment app or vpa is missing.");
        await purchaseAPI.updateTransaction({ orderId, ...transactionInput });
        return {
          code: "200",
          success: true,
          message: "Transaction updated successfully.",
          token,
        };
      } catch (error) {
        console.log(error);
        throw new GraphQLError(error.message);
      }
    },
    cancelledTransaction: async (
      _,
      { orderId },
      { token, dataSources: { purchaseAPI } }
    ) => {
      try {
        // TODO: check txnToken before cancel & remove token from redis
        await purchaseAPI.cancelledTransaction({ orderId });
        return {
          code: "200",
          success: true,
          message: "Transaction cancelled successfully.",
          token,
        };
      } catch (error) {
        console.log(error);
        throw new GraphQLError(error.message);
      }
    },
    processTransaction: async (
      _,
      { orderId, transactionInput },
      { token, dataSources: { purchaseAPI } }
    ) => {
      try {
        // TODO: check txnToken before process & remove token from redis & remove halt job.
        const payload = await purchaseAPI.processTransaction({
          orderId,
          ...transactionInput,
        });
        return {
          code: "200",
          success: true,
          message: "Transaction processed successfully.",
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
