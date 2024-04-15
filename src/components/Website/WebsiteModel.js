const { Schema, model } = require("mongoose");

const WebsiteSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    link: {
      type: String,
      required: true,
      trim: true,
    },
    enable: { type: Boolean, required: true, default: true },
  },
  { timestamps: true, runValidators: true, runSettersOnQuery: true }
);

// Create a text index on the 'name' field
WebsiteSchema.index({ name: "text" }, { language_override: "none" });

const WebsiteModel = model("Website", WebsiteSchema);

module.exports = WebsiteModel;
