const { Schema, model } = require("mongoose");

const ExamQuestionSchema = new Schema({
  testQuestion: {
    required: true,
    type: Schema.Types.ObjectId,
    ref: "TestQuestion",
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
  answeredIndex: {
    required: true,
    type: Number,
    default: -1,
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
});

const ExamSchema = new Schema(
  {
    user: {
      required: true,
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    test: {
      required: true,
      type: Schema.Types.ObjectId,
      ref: "Test",
    },
    content: {
      required: true,
      type: Schema.Types.ObjectId,
      ref: "Content",
    },
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
    questions: [ExamQuestionSchema],
    submitted: { type: Boolean, required: true, default: false },
  },
  { timestamps: true, runValidators: true, runSettersOnQuery: true }
);

const ExamModel = model("Exam", ExamSchema);

module.exports = ExamModel;
