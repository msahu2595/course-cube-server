const { Schema, model } = require("mongoose");

const TestSchema = new Schema(
  {
    image: {
      required: true,
      type: String,
      trim: true,
    },
    subject: {
      required: true,
      type: String,
      trim: true,
      lowercase: true,
      minlength: 2,
      maxlength: 40,
    },
    tags: [
      {
        type: String,
        trim: true,
        lowercase: true,
        minlength: 2,
        maxlength: 40,
      },
    ],
    title: {
      required: true,
      type: String,
      trim: true,
      lowercase: true,
      minlength: 2,
      maxlength: 80,
    },
    paid: {
      required: true,
      type: Boolean,
      default: false,
    },
    price: {
      type: Number,
      min: 1,
      max: 100000,
    },
    offer: {
      type: Number,
      min: 1,
      max: 100000,
    },
    offerType: {
      type: String,
      enum: ["PERCENT", "AMOUNT"],
    },
    highlight: {
      type: String,
      trim: true,
      lowercase: true,
      minlength: 2,
      maxlength: 40,
    },
    instructors: [
      {
        type: String,
        trim: true,
        lowercase: true,
        minlength: 2,
        maxlength: 40,
      },
    ],
    language: {
      required: true,
      type: String,
      enum: ["HI", "EN"],
      default: "HI",
    },
    index: {
      type: String,
      trim: true,
      lowercase: true,
      minlength: 2,
      maxlength: 1000,
    },
    description: {
      type: String,
      trim: true,
      lowercase: true,
      minlength: 2,
      maxlength: 1000,
    },
    visible: { type: Boolean, required: true, default: true },
    questions: [
      {
        question: { type: String, required: true },
        image: String,
        passage: String,
        options: [{ type: String, required: true }],
        mark: { type: Number, required: true },
        answerIndex: { type: Number, required: true },
        enable: { type: Boolean, required: true, default: true },
      },
    ],
    duration: {
      type: Number,
      required: true,
    },
    marks: {
      type: Number,
      required: true,
    },
    enable: { type: Boolean, required: true, default: true },
  },
  { timestamps: true, runValidators: true, runSettersOnQuery: true }
);

TestSchema.virtual("likes", {
  ref: "Like", // The model to use
  localField: "_id", // Find people where `localField`
  foreignField: "refId", // is equal to `foreignField`
  count: true, // And only get the number of docs
});

TestSchema.virtual("attempts", {
  ref: "History", // The model to use
  localField: "_id", // Find people where `localField`
  foreignField: "refId", // is equal to `foreignField`
  count: true, // And only get the number of docs
});

const TestModel = model("Test", TestSchema);

module.exports = TestModel;
