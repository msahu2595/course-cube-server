const { Schema, model } = require("mongoose");

const AdvertSchema = new Schema(
  {
    image: {
      type: String,
      trim: true,
      required: true,
    },
    type: {
      type: String,
      required: true,
      enum: ["TINY", "SMALL", "MEDIUM", "LARGE"],
    },
    link: {
      type: String,
      trim: true,
    },
    route: { type: String, trim: true, maxlength: 80 },
    params: { type: Schema.Types.Mixed },
    enable: { type: Boolean, required: true, default: true },
  },
  { timestamps: true, runValidators: true, runSettersOnQuery: true }
);

const AdvertModel = model("Advert", AdvertSchema);

module.exports = AdvertModel;
