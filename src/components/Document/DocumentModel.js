const { Schema, model } = require("mongoose");

const DocumentSchema = new Schema(
  {
    title: {
      required: true,
      type: String,
      trim: true,
      lowercase: true,
    },
    thumbnail: {
      type: String,
      trim: true,
    },
    link: {
      required: true,
      type: String,
      trim: true,
    },
    pages: { type: Number, required: true },
    enable: { type: Boolean, required: true, default: true },
  },
  { timestamps: true, runValidators: true, runSettersOnQuery: true }
);

const DocumentModel = model("Document", DocumentSchema);

module.exports = DocumentModel;
