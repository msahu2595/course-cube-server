const { Schema, model } = require("mongoose");

const DocumentSchema = new Schema(
  {
    title: {
      required: true,
      type: String,
      trim: true,
    },
    thumbnail: {
      type: String,
      trim: true,
    },
    url: {
      required: true,
      type: String,
      trim: true,
    },
    pages: { type: Number, required: true },
    enable: { type: Boolean, required: true, default: true },
  },
  { timestamps: true, runValidators: true, runSettersOnQuery: true }
);

// Create a text index on the 'title' field
DocumentSchema.index({ title: "text" }, { language_override: "none" });

const DocumentModel = model("Document", DocumentSchema);

module.exports = DocumentModel;
