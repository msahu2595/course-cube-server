const { Schema, model } = require("mongoose");

const PurchaseSchema = new Schema(
  {
    user: {
      required: true,
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    refId: {
      required: true,
      type: Schema.Types.ObjectId,
    },
    type: {
      required: true,
      type: String,
      enum: ["COURSE", "VIDEO", "TEST", "DOCUMENT"],
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
    validity: { type: Date },
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

PurchaseSchema.virtual("course", {
  ref: "Course", // The model to use
  localField: "refId", // Find people where `localField`
  foreignField: "_id", // is equal to `foreignField`
});

PurchaseSchema.virtual("video", {
  ref: "Video", // The model to use
  localField: "refId", // Find people where `localField`
  foreignField: "_id", // is equal to `foreignField`
});

PurchaseSchema.virtual("test", {
  ref: "Test", // The model to use
  localField: "refId", // Find people where `localField`
  foreignField: "_id", // is equal to `foreignField`
});

PurchaseSchema.virtual("document", {
  ref: "Document", // The model to use
  localField: "refId", // Find people where `localField`
  foreignField: "_id", // is equal to `foreignField`
});

const PurchaseModel = model("Purchase", PurchaseSchema);

module.exports = PurchaseModel;
