const { Schema, model } = require("mongoose");

const ContentSchema = new Schema(
  {
    categories: [
      {
        type: String,
        trim: true,
        lowercase: true,
        minlength: 2,
        maxlength: 40,
      },
    ],
    exams: [
      {
        type: String,
        trim: true,
        lowercase: true,
        minlength: 2,
        maxlength: 40,
      },
    ],
    tags: [
      {
        type: String,
        trim: true,
        lowercase: true,
        minlength: 2,
        maxlength: 40,
      },
    ],
    subject: {
      required: true,
      type: String,
      trim: true,
      lowercase: true,
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
    paid: {
      required: true,
      type: Boolean,
      default: false,
    },
    price: {
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
        lowercase: true,
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
    validity: { type: String, required: true, default: "P10Y" },
    visible: { type: Boolean, required: true, default: true },
    enable: { type: Boolean, required: true, default: true },
  },
  { timestamps: true, runValidators: true, runSettersOnQuery: true }
);

ContentSchema.virtual("likes", {
  ref: "Like", // The model to use
  localField: "_id", // Find people where `localField`
  foreignField: "refId", // is equal to `foreignField`
  count: true, // And only get the number of docs
});

ContentSchema.virtual("liked", {
  ref: "Like", // The model to use
  localField: "_id", // Find people where `localField`
  foreignField: "refId", // is equal to `foreignField`
  count: true, // And only get the number of docs
});

ContentSchema.virtual("views", {
  ref: "View", // The model to use
  localField: "_id", // Find people where `localField`
  foreignField: "refId", // is equal to `foreignField`
  count: true, // And only get the number of docs
});

ContentSchema.virtual("purchased", {
  ref: "Purchase", // The model to use
  localField: "_id", // Find people where `localField`
  foreignField: "item", // is equal to `foreignField`
  count: true, // And only get the number of docs
});

ContentSchema.virtual("bookmarked", {
  ref: "Bookmark", // The model to use
  localField: "_id", // Find people where `localField`
  foreignField: "ref", // is equal to `foreignField`
  count: true, // And only get the number of docs
});

const ContentModel = model("Content", ContentSchema);

module.exports = ContentModel;
