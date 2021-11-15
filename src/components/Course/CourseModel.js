const { Schema, model } = require("mongoose");

const CourseSchema = new Schema(
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
    validity: { type: Number },
    period: { type: String, enum: ["DAY", "WEEK", "MONTH", "YEAR"] },
    visible: { type: Boolean, required: true, default: true },
    syllabus: { type: Schema.Types.Mixed },
    enable: { type: Boolean, required: true, default: true },
  },
  { timestamps: true, runValidators: true, runSettersOnQuery: true }
);

CourseSchema.virtual("purchased", {
  ref: "Purchase", // The model to use
  localField: "_id", // Find people where `localField`
  foreignField: "refId", // is equal to `foreignField`
  count: true, // And only get the number of docs
});

CourseSchema.virtual("likes", {
  ref: "Like", // The model to use
  localField: "_id", // Find people where `localField`
  foreignField: "refId", // is equal to `foreignField`
  count: true, // And only get the number of docs
});

CourseSchema.virtual("sales", {
  ref: "Purchase", // The model to use
  localField: "_id", // Find people where `localField`
  foreignField: "refId", // is equal to `foreignField`
  count: true, // And only get the number of docs
});

const CourseModel = model("Course", CourseSchema);

module.exports = CourseModel;
