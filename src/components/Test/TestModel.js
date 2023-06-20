const { Schema, model } = require("mongoose");

const TestSchema = new Schema(
  {
    title: {
      required: true,
      type: String,
      trim: true,
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
    ],
    enable: { required: true, type: Boolean, default: true },
  },
  { timestamps: true, runValidators: true, runSettersOnQuery: true }
);

const TestModel = model("Test", TestSchema);

module.exports = TestModel;
