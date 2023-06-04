const { Schema, model } = require("mongoose");

const ArticleSchema = new Schema(
  {
    tags: [
      {
        type: String,
        trim: true,
        lowercase: true,
      },
    ],
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
      maxlength: 500,
    },
    description: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 10000,
    },
    author: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 80,
    },
    sources: [
      {
        type: String,
        trim: true,
      },
    ],
    visible: { type: Boolean, required: true, default: true },
    enable: { type: Boolean, required: true, default: true },
  },
  { timestamps: true, runValidators: true, runSettersOnQuery: true }
);

ArticleSchema.virtual("likes", {
  ref: "Like", // The model to use
  localField: "_id", // Find people where `localField`
  foreignField: "refId", // is equal to `foreignField`
  count: true, // And only get the number of docs
});

ArticleSchema.virtual("liked", {
  ref: "Like", // The model to use
  localField: "_id", // Find people where `localField`
  foreignField: "refId", // is equal to `foreignField`
  count: true, // And only get the number of docs
});

ArticleSchema.virtual("bookmarked", {
  ref: "Bookmark", // The model to use
  localField: "_id", // Find people where `localField`
  foreignField: "ref", // is equal to `foreignField`
  count: true, // And only get the number of docs
});

const ArticleModel = model("Article", ArticleSchema);

module.exports = ArticleModel;
