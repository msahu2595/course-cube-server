const { Schema, model } = require("mongoose");

const AccountSchema = new Schema(
  {
    email: {
      type: String,
      required: false,
      lowercase: true,
      trim: true,
      minlength: 6,
      maxlength: 40,
    },
    password: { type: String, required: false },
  },
  { timestamps: true, runValidators: true, runSettersOnQuery: true }
);

const AccountModel = model("accounts", AccountSchema);

module.exports = AccountModel;
