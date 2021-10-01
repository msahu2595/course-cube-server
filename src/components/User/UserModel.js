const { Schema, model } = require("mongoose");

const UserSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      minlength: 6,
      maxlength: 40,
    },
    password: { type: String, required: true },
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
    acceptTnC: { type: Boolean, required: true },
  },
  { timestamps: true, runValidators: true, runSettersOnQuery: true }
);

UserSchema.virtual("followers", {
  ref: "Follow", // The model to use
  localField: "_id", // Find people where `localField`
  foreignField: "following", // is equal to `foreignField`
  count: true, // And only get the number of docs
});

UserSchema.virtual("followings", {
  ref: "Follow", // The model to use
  localField: "_id", // Find people where `localField`
  foreignField: "follower", // is equal to `foreignField`
  count: true, // And only get the number of docs
});

const UserModel = model("User", UserSchema);

module.exports = UserModel;
