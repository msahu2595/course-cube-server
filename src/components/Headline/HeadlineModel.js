const { Schema, model } = require("mongoose");

const HeadlineSchema = new Schema(
  {
    image: {
      type: String,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
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

const HeadlineModel = model("Headline", HeadlineSchema);

module.exports = HeadlineModel;
