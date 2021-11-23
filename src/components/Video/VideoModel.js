const { Schema, model } = require("mongoose");

const VideoSchema = new Schema(
  {
    link: {
      required: true,
      type: String,
      trim: true,
    },
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
    duration: {
      required: true,
      type: String,
      trim: true,
    },
    urls: { type: Schema.Types.Mixed },
    enable: { type: Boolean, required: true, default: true },
  },
  { timestamps: true, runValidators: true, runSettersOnQuery: true }
);

const VideoModel = model("Video", VideoSchema);

module.exports = VideoModel;
