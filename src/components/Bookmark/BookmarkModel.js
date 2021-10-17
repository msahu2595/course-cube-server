const { Schema, model } = require("mongoose");

const BookmarkSchema = new Schema(
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
      enum: ["VIDEO", "TEST", "PDF", "QUESTION", "ANSWER"],
    },
    active: { type: Boolean, required: true, default: true },
  },
  { timestamps: true, runValidators: true, runSettersOnQuery: true }
);

const BookmarkModel = model("Bookmark", BookmarkSchema);

module.exports = BookmarkModel;
