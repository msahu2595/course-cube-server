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

const WebsiteModel = model("Website", WebsiteSchema);

module.exports = WebsiteModel;
