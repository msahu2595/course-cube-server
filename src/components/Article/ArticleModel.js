const { Schema, model } = require("mongoose");

const ArticleSchema = new Schema(
  {
    image: {
      type: String,
      trim: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    tags: [
      {
        type: String,
        trim: true,
        lowercase: true,
      },
    ],
    sources: [
      {
        type: String,
        trim: true,
      },
    ],
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

const ArticleModel = model("Article", ArticleSchema);

module.exports = ArticleModel;
