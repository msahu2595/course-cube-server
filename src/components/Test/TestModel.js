const { Schema, model } = require("mongoose");

const TestSchema = new Schema(
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
    instructions: {
      required: true,
      type: String,
      trim: true,
    },
    duration: {
      required: true,
      type: String,
      trim: true,
    },
    questions: [
      {
        question: { type: String, required: true },
        image: String,
        passage: String,
        options: [{ type: String, required: true }],
        answerIndex: { type: Number, required: true },
        mark: { type: Number, required: true },
        negativeMark: { type: Number, required: true, default: 0 },
      },
    ],
    totalMarks: {
      type: Number,
      required: true,
      default: 0,
    },
    enable: { type: Boolean, required: true, default: true },
  },
  { timestamps: true, runValidators: true, runSettersOnQuery: true }
);

const TestModel = model("Test", TestSchema);

module.exports = TestModel;
