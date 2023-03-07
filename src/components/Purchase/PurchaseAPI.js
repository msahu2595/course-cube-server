const { MongoDataSource } = require("apollo-datasource-mongodb");

class PurchaseAPI extends MongoDataSource {
  constructor(options) {
    super(options); // this sends our server's `cache` through
    this.model = options.PurchaseModel;
    this.context = options.context;
  }

  purchases({ offset, limit, userId, type }) {
    const query = { user: userId || this.context.user._id };
    if (type) {
      query["type"] = type;
    }
    return this.model
      .find(query)
      .sort({ createdAt: -1 })
      .skip(offset)
      .limit(limit)
      .populate("item")
      .exec();
  }

  purchasedUsers({ offset, limit, item }) {
    return this.model
      .find({ item })
      .sort({ createdAt: -1 })
      .skip(offset)
      .limit(limit)
      .populate("user")
      .exec();
  }

  createPurchase({
    item,
    type,
    image,
    subject,
    title,
    price,
    offer,
    offerType,
    validity,
    orderId,
  }) {
    return this.model.findOneAndUpdate(
      {
        user: this.context.user._id,
        item,
        type,
      },
      {
        image,
        subject,
        title,
        price,
        offer,
        offerType,
        validity,
        orderIds: [orderId],
      },
      { upsert: true, new: true }
    );
  }

  paymentPurchase({ purchaseId, paymentId, subscriptionId, response }) {
    return this.model.findOneAndUpdate(
      {
        _id: purchaseId,
      },
      {
        status: subscriptionId ? "AUTHENTICATED" : "PAID",
        paymentIds: [paymentId],
        subscriptionId,
        response,
      },
      { upsert: true, new: true }
    );
  }

  updatePurchase({ purchaseId, status, orderId, paymentId, response }) {
    return this.model.findOneAndUpdate(
      {
        _id: purchaseId,
      },
      {
        status,
        $push: { orderIds: orderId, paymentIds: paymentId },
        response,
      },
      { upsert: true, new: true }
    );
  }

  statusPurchase({ purchaseId, status }) {
    return this.model.findOneAndUpdate(
      {
        _id: purchaseId,
      },
      {
        status,
      },
      { upsert: true, new: true }
    );
  }
}

module.exports = PurchaseAPI;
