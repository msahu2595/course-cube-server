const { Schema, model } = require("mongoose");

const PurchaseSchema = new Schema(
  {
    user: {
      required: true,
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    item: {
      type: Schema.Types.ObjectId,
      required: true,
      refPath: "type",
    },
    type: {
      required: true,
      type: String,
      enum: ["Bundle", "Content"],
    },
    subject: {
      required: true,
      type: String,
      trim: true,
      minlength: 2,
      maxlength: 40,
    },
    title: {
      required: true,
      type: String,
      trim: true,
      minlength: 2,
      maxlength: 200,
    },
    price: {
      required: true,
      type: Number,
      min: 1,
      max: 100000,
    },
    offer: {
      type: Number,
      min: 1,
      max: 100000,
    },
    offerType: {
      type: String,
      enum: ["PERCENT", "AMOUNT"],
    },
    validTill: { type: Date, required: true },
    orderId: { type: String, required: true },
    status: {
      type: String,
      enum: [
        "CREATED",
        // "AUTHENTICATED",
        "ACTIVE",
        // "PENDING",
        "HALTED",
        "CANCELLED",
        "PAID",
      ],
      required: true,
      default: "CREATED",
    },
    txnAmount: { required: true, type: Number, min: 0, max: 100000 },
    txnNote: { type: String, required: true },
    txnId: { type: String },
    txnInfo: { type: Schema.Types.Mixed },
    paymentMode: {
      type: String,
      enum: [
        "UPI",
        "UPI_INTENT",
        "CREDIT_CARD",
        "DEBIT_CARD",
        "NET_BANKING",
        "EMI",
      ],
    },
    paymentApp: { type: String },
    paymentVPA: { type: String },
  },
  { timestamps: true, runValidators: true, runSettersOnQuery: true }
);

// Create a descending index on the 'validTill' field
PurchaseSchema.index({ validTill: -1 });

const PurchaseModel = model("Purchase", PurchaseSchema);

module.exports = PurchaseModel;
