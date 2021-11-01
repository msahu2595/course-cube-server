const { Schema, model } = require("mongoose");

const HistorySchema = new Schema(
  {
    user: {
      required: true,
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    refId: {
      required: true,
      type: Schema.Types.ObjectId,
    },
    type: {
      required: true,
      type: String,
      enum: ["VIDEO", "TEST", "DOCUMENT", "QUESTION"],
    },
    visible: { type: Boolean, required: true, default: true },
  },
  { timestamps: true, runValidators: true, runSettersOnQuery: true }
);

const HistoryModel = model("History", HistorySchema);

module.exports = HistoryModel;
