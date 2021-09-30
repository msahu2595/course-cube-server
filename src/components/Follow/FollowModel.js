const { Schema, model } = require("mongoose");

const FollowSchema = new Schema(
  {
    follower: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "accounts",
    },
    following: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "accounts",
    },
    active: { type: Boolean, required: true },
  },
  { timestamps: true, runValidators: true, runSettersOnQuery: true }
);

const FollowModel = model("follows", FollowSchema);

module.exports = FollowModel;
