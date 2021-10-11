const { Schema, model } = require("mongoose");

const AnswerSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    title: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      minlength: 16,
      maxlength: 150,
    },
    description: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      minlength: 40,
      maxlength: 1000,
    },
    image: {
      type: String,
      trim: true,
    },
    options: [
      {
        type: String,
        lowercase: true,
        trim: true,
        minlength: 1,
        maxlength: 80,
      },
    ],
    answerIndex: {
      type: Number,
      enum: [1, 2, 3, 4, 5],
    },
    tags: [
      {
        type: String,
        lowercase: true,
        trim: true,
        minlength: 2,
        maxlength: 40,
      },
    ],
    link: {
      type: String,
      trim: true,
    },
    route: { type: String, trim: true, maxlength: 80 },
    params: { type: Schema.Types.Mixed },
    message: {
      type: String,
      lowercase: true,
      trim: true,
      minlength: 2,
      maxlength: 80,
    },
    verified: { type: Boolean, required: true, default: false },
    edited: { type: Boolean, required: true, default: false },
    enable: { type: Boolean, required: true, default: true },
  },
  { timestamps: true, runValidators: true, runSettersOnQuery: true }
);

AnswerSchema.virtual("votes", {
  ref: "Vote", // The model to use
  localField: "_id", // Find people where `localField`
  foreignField: "refId", // is equal to `foreignField`
  count: true, // And only get the number of docs
});

const AnswerModel = model("Answer", AnswerSchema);

module.exports = AnswerModel;
