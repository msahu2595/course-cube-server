const { Schema, model } = require("mongoose");

const ViewSchema = new Schema(
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

const ViewModel = model("View", ViewSchema);

module.exports = ViewModel;
