const { Schema, model } = require("mongoose");

const FollowSchema = new Schema(
  {
    followerId: { type: Schema.Types.ObjectId, required: true },
    followingId: { type: Schema.Types.ObjectId, required: true },
    active: { type: Boolean, required: true },
  },
  { timestamps: true, runValidators: true, runSettersOnQuery: true }
);

const FollowModel = model("follows", FollowSchema);

module.exports = FollowModel;
