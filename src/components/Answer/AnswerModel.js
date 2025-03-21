const { Schema, model } = require("mongoose");

const AnswerSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    question: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Question",
    },
    answer: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      minlength: 1,
      maxlength: 1000,
    },
    image: {
      type: String,
      trim: true,
    },
    link: {
      type: String,
      trim: true,
    },
    route: { type: String, trim: true, maxlength: 80 },
    params: { type: Schema.Types.Mixed },
    message: {
      type: String,
      trim: true,
      minlength: 1,
      maxlength: 500,
    },
    verified: { type: Boolean, required: true, default: true },
    edited: { type: Boolean, required: true, default: false },
    enable: { type: Boolean, required: true, default: true },
  },
  { timestamps: true, runValidators: true, runSettersOnQuery: true }
);

AnswerSchema.virtual("likes", {
  ref: "Like", // The model to use
  localField: "_id", // Find people where `localField`
  foreignField: "refId", // is equal to `foreignField`
  count: true, // And only get the number of docs
});

const AnswerModel = model("Answer", AnswerSchema);

module.exports = AnswerModel;
