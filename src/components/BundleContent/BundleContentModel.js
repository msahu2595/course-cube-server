const { Schema, model } = require("mongoose");

const BundleContentSchema = new Schema(
  {
    subjectId: {
      type: Schema.Types.ObjectId,
    },
    subject: {
      required: true,
      type: String,
      trim: true,
      lowercase: true,
      minlength: 2,
      maxlength: 40,
    },
    bundle: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Bundle",
    },
    image: {
      required: true,
      type: String,
      trim: true,
    },
    title: {
      required: true,
      type: String,
      trim: true,
      lowercase: true,
      minlength: 2,
      maxlength: 200,
    },
    media: {
      type: Schema.Types.ObjectId,
      required: true,
      refPath: "type",
    },
    type: {
      type: String,
      required: true,
      enum: ["Video", "Test", "Document", "Book"],
    },
    language: {
      required: true,
      type: String,
      enum: ["HI", "EN"],
    },
    description: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      minlength: 2,
      maxlength: 2000,
    },
    visible: { type: Boolean, required: true, default: true },
    enable: { type: Boolean, required: true, default: true },
  },
  { timestamps: true, runValidators: true, runSettersOnQuery: true }
);

BundleContentSchema.virtual("purchased", {
  ref: "Purchase", // The model to use
  localField: "bundle", // Find people where `localField`
  foreignField: "refId", // is equal to `foreignField`
  count: true, // And only get the number of docs
});

const BundleContentModel = model("BundleContent", BundleContentSchema);

module.exports = BundleContentModel;
