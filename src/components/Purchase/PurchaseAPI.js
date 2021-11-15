const { MongoDataSource } = require("apollo-datasource-mongodb");

class PurchaseAPI extends MongoDataSource {
  purchases({ offset, limit, userId, type }) {
    const query = { user: userId || this.context.user._id };
    if (type) {
      query["type"] = type;
    }
    return this.model
      .find(query)
      .skip(offset)
      .limit(limit)
      .populate("course")
      .populate("video")
      .populate("test")
      .populate("document")
      .exec();
  }

  purchasedUsers({ offset, limit, refId }) {
    return this.model
      .find({ refId, active: true })
      .skip(offset)
      .limit(limit)
      .populate("user")
      .exec();
  }

  createPurchase({
    refId,
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
        refId,
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
