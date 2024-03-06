const { Schema, Types, model } = require("mongoose");

const SyllabusSchema = new Schema({}, { _id: false });

SyllabusSchema.add({
  subjectId: {
    required: true,
    type: Schema.Types.ObjectId,
    default: Types.ObjectId,
  },
  name: {
    required: true,
    type: String,
    trim: true,
    minlength: 1,
    maxlength: 80,
  },
  items: [SyllabusSchema],
});

const BundleSchema = new Schema(
  {
    categories: [
      {
        type: String,
        trim: true,
        lowercase: true,
        minlength: 2,
        maxlength: 40,
      },
    ],
    exams: [
      {
        type: String,
        trim: true,
        lowercase: true,
        minlength: 2,
        maxlength: 40,
      },
    ],
    tags: [
      {
        type: String,
        trim: true,
        lowercase: true,
        minlength: 2,
        maxlength: 40,
      },
    ],
    subject: {
      type: String,
      trim: true,
      lowercase: true,
      minlength: 2,
      maxlength: 40,
    },
    image: {
      required: true,
      type: String,
      trim: true,
    },
    title: {
      required: true,
      type: String,
      trim: true,
      minlength: 2,
      maxlength: 200,
    },
    syllabus: [SyllabusSchema],
    type: {
      type: String,
      required: true,
      enum: ["FULL_COURSE", "SUBJECT_COURSE", "PLAYLIST_COURSE"],
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
      minlength: 2,
      maxlength: 200,
    },
    instructors: [
      {
        type: String,
        trim: true,
        lowercase: true,
        minlength: 2,
        maxlength: 80,
      },
    ],
    language: {
      required: true,
      type: String,
      enum: ["HI", "EN"],
    },
    index: {
      type: String,
      trim: true,
      minlength: 2,
      maxlength: 2000,
    },
    description: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 2000,
    },
    validity: { type: String, required: true, default: "P10Y" },
    visible: { type: Boolean, required: true, default: true },
    enable: { type: Boolean, required: true, default: true },
  },
  { timestamps: true, runValidators: true, runSettersOnQuery: true }
);

BundleSchema.virtual("likes", {
  ref: "Like", // The model to use
  localField: "_id", // Find people where `localField`
  foreignField: "refId", // is equal to `foreignField`
  count: true, // And only get the number of docs
});

BundleSchema.virtual("liked", {
  ref: "Like", // The model to use
  localField: "_id", // Find people where `localField`
  foreignField: "refId", // is equal to `foreignField`
  count: true, // And only get the number of docs
});

BundleSchema.virtual("purchases", {
  ref: "Purchase", // The model to use
  localField: "_id", // Find people where `localField`
  foreignField: "refId", // is equal to `foreignField`
  count: true, // And only get the number of docs
});

BundleSchema.virtual("purchased", {
  ref: "Purchase", // The model to use
  localField: "_id", // Find people where `localField`
  foreignField: "refId", // is equal to `foreignField`
  count: true, // And only get the number of docs
});

BundleSchema.virtual("bookmarked", {
  ref: "Bookmark", // The model to use
  localField: "_id", // Find people where `localField`
  foreignField: "ref", // is equal to `foreignField`
  count: true, // And only get the number of docs
});

const BundleModel = model("Bundle", BundleSchema);

module.exports = BundleModel;
