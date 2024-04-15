const { Schema, model } = require("mongoose");

const UserSchema = new Schema(
  {
    email: {
      type: String,
      lowercase: true,
      trim: true,
      minlength: 6,
      maxlength: 80,
    },
    emailVerified: { type: Boolean, default: false },
    mobile: { type: String, trim: true, minlength: 4, maxlength: 15 },
    mobileVerified: { type: Boolean, default: false },
    fullName: {
      type: String,
      trim: true,
      minlength: 2,
      maxlength: 80,
    },
    gender: { type: String, enum: ["MALE", "FEMALE", "UNKNOWN"] },
    picture: { type: String, trim: true },
    about: { type: String, trim: true, minlength: 7, maxlength: 320 },
    userVerified: { type: Boolean, default: false },
    education: { type: String, maxlength: 80 },
    workAt: { type: String, maxlength: 80 },
    workAs: { type: String, maxlength: 80 },
    facebook: { type: String, maxlength: 80 },
    instagram: { type: String, maxlength: 80 },
    twitter: { type: String, maxlength: 80 },
    linkedin: { type: String, maxlength: 80 },
    pincode: { type: String, maxlength: 6 },
    country: { type: String, maxlength: 80 },
    state: { type: String, maxlength: 80 },
    district: { type: String, maxlength: 80 },
    cityVillage: { type: String, maxlength: 80 },
    area: { type: String, maxlength: 80 },
    street: { type: String, maxlength: 80 },
    landmark: { type: String, maxlength: 80 },
    role: {
      type: String,
      enum: ["USER", "ADMIN"],
      default: "USER",
    },
    FCMToken: { type: String, maxlength: 320 },
    platform: { type: String, enum: ["android", "ios", "web"], required: true },
    acceptTnC: { type: Boolean, required: true },
  },
  { timestamps: true, runValidators: true, runSettersOnQuery: true }
);

// Create a text index on the 'fullName' field
UserSchema.index({ fullName: "text" }, { language_override: "none" });

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

UserSchema.virtual("activities", {
  ref: "History", // The model to use
  localField: "_id", // Find people where `localField`
  foreignField: "user", // is equal to `foreignField`
  count: true, // And only get the number of docs
});

UserSchema.virtual("videos", {
  ref: "History", // The model to use
  localField: "_id", // Find people where `localField`
  foreignField: "user", // is equal to `foreignField`
  count: true, // And only get the number of docs
});

UserSchema.virtual("tests", {
  ref: "History", // The model to use
  localField: "_id", // Find people where `localField`
  foreignField: "user", // is equal to `foreignField`
  count: true, // And only get the number of docs
});

UserSchema.virtual("documents", {
  ref: "History", // The model to use
  localField: "_id", // Find people where `localField`
  foreignField: "user", // is equal to `foreignField`
  count: true, // And only get the number of docs
});

UserSchema.virtual("articles", {
  ref: "History", // The model to use
  localField: "_id", // Find people where `localField`
  foreignField: "user", // is equal to `foreignField`
  count: true, // And only get the number of docs
});

const UserModel = model("User", UserSchema);

module.exports = UserModel;
