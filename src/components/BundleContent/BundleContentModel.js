const { Schema, model } = require("mongoose");

const BundleContentSchema = new Schema(
  {
    bundle: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Bundle",
    },
    subjectId: {
      type: Schema.Types.ObjectId,
    },
    subject: {
      required: true,
      type: String,
      trim: true,
      minlength: 2,
      maxlength: 40,
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
      enum: ["Video", "Test", "Document"],
    },
    highlight: {
      type: String,
      trim: true,
      minlength: 2,
      maxlength: 200,
    },
    instructors: [
      {
        type: String,
        trim: true,
        minlength: 2,
        maxlength: 80,
      },
    ],
    language: {
      required: true,
      type: String,
      enum: ["HI", "EN"],
    },
    index: {
      type: String,
      trim: true,
      minlength: 2,
      maxlength: 2000,
    },
    description: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 2000,
    },
    visible: { type: Boolean, required: true, default: true },
    enable: { type: Boolean, required: true, default: true },
  },
  { timestamps: true, runValidators: true, runSettersOnQuery: true }
);

// Create a text index on the 'title' field
BundleContentSchema.index({ title: "text" }, { language_override: "none" });

BundleContentSchema.virtual("likes", {
  ref: "Like", // The model to use
  localField: "_id", // Find people where `localField`
  foreignField: "refId", // is equal to `foreignField`
  count: true, // And only get the number of docs
});

BundleContentSchema.virtual("liked", {
  ref: "Like", // The model to use
  localField: "_id", // Find people where `localField`
  foreignField: "refId", // is equal to `foreignField`
  count: true, // And only get the number of docs
});

BundleContentSchema.virtual("views", {
  ref: "View", // The model to use
  localField: "_id", // Find people where `localField`
  foreignField: "refId", // is equal to `foreignField`
  count: true, // And only get the number of docs
});

BundleContentSchema.virtual("purchased", {
  ref: "Purchase", // The model to use
  localField: "bundle", // Find people where `localField`
  foreignField: "item", // is equal to `foreignField`
  count: true, // And only get the number of docs
});

BundleContentSchema.virtual("bookmarked", {
  ref: "Bookmark", // The model to use
  localField: "_id", // Find people where `localField`
  foreignField: "ref", // is equal to `foreignField`
  count: true, // And only get the number of docs
});

const BundleContentModel = model("BundleContent", BundleContentSchema);

module.exports = BundleContentModel;
