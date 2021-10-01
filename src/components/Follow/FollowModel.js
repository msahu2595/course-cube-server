const { Schema, model } = require("mongoose");

const FollowSchema = new Schema(
  {
    follower: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    following: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    active: { type: Boolean, required: true },
  },
  { timestamps: true, runValidators: true, runSettersOnQuery: true }
);

const FollowModel = model("Follow", FollowSchema);

module.exports = FollowModel;
