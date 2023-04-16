const { Schema, model } = require("mongoose");

const BookmarkSchema = new Schema(
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
      enum: [
        "Bundle",
        "BundleContent",
        "Content",
        "Article",
        "Question",
        "Answer",
      ],
    },
  },
  { timestamps: true, runValidators: true, runSettersOnQuery: true }
);

const BookmarkModel = model("Bookmark", BookmarkSchema);

module.exports = BookmarkModel;
