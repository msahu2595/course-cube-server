const { Schema, model } = require("mongoose");

const QuestionSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    title: {
      type: String,
      required: true,
      trim: true,
      minlength: 1,
      maxlength: 150,
    },
    description: {
      type: String,
      trim: true,
      minlength: 1,
      maxlength: 1000,
    },
    image: {
      type: String,
      trim: true,
    },
    options: [
      {
        type: String,
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
      trim: true,
      minlength: 1,
      maxlength: 500,
    },
    verified: { type: Boolean, required: true, default: false },
    edited: { type: Boolean, required: true, default: false },
    enable: { type: Boolean, required: true, default: true },
  },
  { timestamps: true, runValidators: true, runSettersOnQuery: true }
);

// Create a text index on the 'title' & 'description' field
QuestionSchema.index(
  { title: "text", description: "text" },
  { language_override: "none" }
);

QuestionSchema.virtual("liked", {
  ref: "Like", // The model to use
  localField: "_id", // Find people where `localField`
  foreignField: "refId", // is equal to `foreignField`
  count: true, // And only get the number of docs
});

QuestionSchema.virtual("likes", {
  ref: "Like", // The model to use
  localField: "_id", // Find people where `localField`
  foreignField: "refId", // is equal to `foreignField`
  match: { active: true },
  count: true, // And only get the number of docs
});

QuestionSchema.virtual("bookmarked", {
  ref: "Bookmark", // The model to use
  localField: "_id", // Find people where `localField`
  foreignField: "refId", // is equal to `foreignField`
  count: true, // And only get the number of docs
});

QuestionSchema.virtual("bookmarks", {
  ref: "Bookmark", // The model to use
  localField: "_id", // Find people where `localField`
  foreignField: "refId", // is equal to `foreignField`
  match: { active: true },
  count: true, // And only get the number of docs
});

QuestionSchema.virtual("answered", {
  ref: "Answer", // The model to use
  localField: "_id", // Find people where `localField`
  foreignField: "question", // is equal to `foreignField`
  count: true, // And only get the number of docs
});

QuestionSchema.virtual("answers", {
  ref: "Answer", // The model to use
  localField: "_id", // Find people where `localField`
  foreignField: "question", // is equal to `foreignField`
  match: { verified: true, enable: true },
  count: true, // And only get the number of docs
});

QuestionSchema.virtual("views", {
  ref: "History", // The model to use
  localField: "_id", // Find people where `localField`
  foreignField: "refId", // is equal to `foreignField`
  count: true, // And only get the number of docs
});

const QuestionModel = model("Question", QuestionSchema);

module.exports = QuestionModel;
