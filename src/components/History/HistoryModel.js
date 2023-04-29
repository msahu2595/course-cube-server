const { Schema, model } = require("mongoose");

const HistorySchema = new Schema(
  {
    user: {
      required: true,
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    ref: {
      required: true,
      type: Schema.Types.ObjectId,
      refPath: "type",
    },
    type: {
      required: true,
      type: String,
      enum: ["BundleContent", "Content", "Article", "Question"],
    },
    subType: {
      type: String,
      enum: ["Video", "Test", "Document"],
    },
    visible: { type: Boolean, required: true, default: true },
  },
  { timestamps: true, runValidators: true, runSettersOnQuery: true }
);

const HistoryModel = model("History", HistorySchema);

module.exports = HistoryModel;
