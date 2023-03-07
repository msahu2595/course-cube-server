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
    image: {
      required: true,
      type: String,
      trim: true,
    },
    subject: {
      required: true,
      type: String,
      trim: true,
      lowercase: true,
      minlength: 2,
      maxlength: 40,
    },
    title: {
      required: true,
      type: String,
      trim: true,
      lowercase: true,
      minlength: 2,
      maxlength: 80,
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
    validity: { type: String, required: true, default: "P10Y" },
    status: {
      type: String,
      enum: [
        "CREATED",
        "AUTHENTICATED",
        "ACTIVE",
        "PENDING",
        "HALTED",
        "CANCELLED",
        "PAID",
      ],
      required: true,
      default: "CREATED",
    },
    orderIds: [{ type: String, required: true }],
    paymentIds: [{ type: String }],
    subscriptionId: { type: String },
    response: { type: Schema.Types.Mixed },
  },
  { timestamps: true, runValidators: true, runSettersOnQuery: true }
);

const PurchaseModel = model("Purchase", PurchaseSchema);

module.exports = PurchaseModel;
