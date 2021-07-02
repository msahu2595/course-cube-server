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

const AccountModel = model("accounts", AccountSchema);

module.exports = AccountModel;
