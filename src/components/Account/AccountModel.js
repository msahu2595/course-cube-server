const { Schema, model } = require("mongoose");

const AccountSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      minlength: 2,
      maxlength: 40,
    },
    lastName: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      minlength: 2,
      maxlength: 40,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      minlength: 6,
      maxlength: 40,
    },
    password: { type: String, required: true },
    acceptTnC: { type: Boolean, required: true },
  },
  { timestamps: true, runValidators: true, runSettersOnQuery: true }
);

AccountSchema.virtual("followers", {
  ref: "follows", // The model to use
  localField: "_id", // Find people where `localField`
  foreignField: "following", // is equal to `foreignField`
  count: true, // And only get the number of docs
});

AccountSchema.virtual("followings", {
  ref: "follows", // The model to use
  localField: "_id", // Find people where `localField`
  foreignField: "follower", // is equal to `foreignField`
  count: true, // And only get the number of docs
});

const AccountModel = model("accounts", AccountSchema);

module.exports = AccountModel;
