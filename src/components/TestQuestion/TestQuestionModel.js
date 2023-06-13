const { Schema, model } = require("mongoose");

const TestQuestionSchema = new Schema(
  {
    test: {
      required: true,
      type: Schema.Types.ObjectId,
      ref: "Test",
    },
    question: {
      required: true,
      type: String,
      trim: true,
    },
    image: {
      type: String,
      trim: true,
    },
    passage: {
      type: String,
      trim: true,
    },
    options: {
      required: true,
      type: [{ required: true, type: String, trim: true }],
    },
    answerIndex: {
      required: true,
      type: Number,
    },
    mark: {
      required: true,
      type: Number,
    },
    negativeMark: {
      required: true,
      type: Number,
      default: 0,
    },
    position: {
      required: true,
      type: Number,
      default: 1,
    },
    invalid: {
      required: true,
      type: Boolean,
      default: false,
    },
    enable: {
      required: true,
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true, runValidators: true, runSettersOnQuery: true }
);

const TestQuestionModel = model("TestQuestion", TestQuestionSchema);

module.exports = TestQuestionModel;
