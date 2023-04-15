const { Schema, model } = require("mongoose");

const LikeSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    refId: {
      type: Schema.Types.ObjectId,
      required: true,
    },
  },
  { timestamps: true, runValidators: true, runSettersOnQuery: true }
);

const LikeModel = model("Like", LikeSchema);

module.exports = LikeModel;
