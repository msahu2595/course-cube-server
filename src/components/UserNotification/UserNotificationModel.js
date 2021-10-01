const { Schema, model } = require("mongoose");

const UserNotificationSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    image: {
      type: String,
      trim: true,
    },
    title: {
      type: String,
      trim: true,
      lowercase: true,
      maxlength: 80,
    },
    message: {
      type: String,
      trim: true,
      lowercase: true,
      maxlength: 160,
    },
    route: { type: String, trim: true, maxlength: 80 },
    params: { type: Schema.Types.Mixed },
    alert: { type: String, trim: true, lowercase: true, maxlength: 80 },
    read: { type: Boolean, required: true, default: false },
  },
  { timestamps: true, runValidators: true, runSettersOnQuery: true }
);

const UserNotificationModel = model("UserNotification", UserNotificationSchema);

module.exports = UserNotificationModel;
