const { Schema, model } = require("mongoose");

const VideoSchema = new Schema(
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
    time: {
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
