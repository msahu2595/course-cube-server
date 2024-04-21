const moment = require("moment");
const { v4: uuidv4 } = require("uuid");
const { MongoDataSource } = require("apollo-datasource-mongodb");

class PurchaseAPI extends MongoDataSource {
  constructor(options) {
    super(options); // this sends our server's `cache` through
    this.model = options.PurchaseModel;
    this.context = options.context;
  }

  purchases({ offset, limit, userId, type, status }) {
    const query = { user: userId || this.context.user._id };
    if (type) {
      query["type"] = type;
    }
    if (status) {
      query["status"] = status;
    }
    return this.model
      .find(query)
      .sort({ createdAt: -1 })
      .skip(offset)
      .limit(limit)
      .populate("item")
      .exec();
  }

  purchasedUsers({ offset, limit, itemId }) {
    const query = { item: itemId, status: "PAID" };
    return this.model
      .find(query)
      .sort({ createdAt: -1 })
      .skip(offset)
      .limit(limit)
      .populate("user")
      .exec();
  }

  purchase({ purchaseId }) {
    return this.model.findById(purchaseId).populate(["user", "item"]).exec();
  }

  purchaseStatus({ orderId }) {
    return this.model.findOne({ orderId }).exec();
  }

  getExpiryDate(duration) {
    const durationObj = moment.duration(duration);
    const expiryDate = moment().add(durationObj);
    return expiryDate.toISOString();
  }

  async initiateTransaction({ item, txnAmount, type }) {
    console.log("item", item);
    console.log("type", type);
    console.log("txnAmount", txnAmount);
    const amounts = [item?.price];
    if (item?.offer) {
      if (item?.offerType === "PERCENT") {
        amounts.push(-((item?.price * item?.offer) / 100));
      } else {
        amounts.push(-item?.offer);
      }
    }
    const payableAmount = amounts.reduce((acc, curr) => acc + curr, 0);
    console.log("payableAmount", payableAmount);
    if (txnAmount !== payableAmount)
      throw new Error("Transaction amount is wrong.");
    const validTill = this.getExpiryDate(item?.validity);
    const orderId = "ORDER_" + uuidv4();
    const transaction = await this.model.create({
      user: this.context.user?._id,
      item: item?._id,
      type,
      subject: item?.subject,
      title: item?.title,
      price: item?.price,
      offer: item?.offer,
      offerType: item?.offerType,
      validTill,
      orderId,
      txnAmount,
      txnNote: `${item?.title} [${item?.subject}] (${payableAmount})`,
    });
    console.log("transaction", transaction);
    return transaction.toObject();
  }

  updateTransaction({ orderId, paymentMode, paymentApp, paymentVPA }) {
    const update = { paymentMode, status: "ACTIVE" };
    if (paymentMode === "UPI" || paymentMode === "UPI_INTENT") {
      update["paymentApp"] = paymentApp;
      update["paymentVPA"] = paymentVPA;
    }
    return this.model
      .findOneAndUpdate({ orderId }, update, { new: true })
      .exec();
  }

  haltedTransaction({ orderId }) {
    return this.model
      .findOneAndUpdate({ orderId }, { status: "HALTED" }, { new: true })
      .exec();
  }

  cancelledTransaction({ orderId }) {
    return this.model
      .findOneAndUpdate({ orderId }, { status: "CANCELLED" }, { new: true })
      .exec();
  }

  processTransaction({ orderId, txnId, txnInfo }) {
    const update = { txnId, status: "PAID" };
    if (txnInfo) {
      update["txnInfo"] = txnInfo;
    }
    return this.model
      .findOneAndUpdate({ orderId }, update, { new: true })
      .exec();
  }
}

module.exports = PurchaseAPI;
