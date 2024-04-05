const { Schema, model } = require("mongoose");

const NotificationSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 80,
    },
    body: {
      type: String,
      required: true,
      trim: true,
      maxlength: 160,
    },
    icon: {
      type: String,
      trim: true,
    },
    type: {
      type: String,
      required: true,
      enum: ["USER", "ADMIN", "CONTENT", "COMMUNITY"],
      default: "USER",
    },
    alert: {
      type: String,
      trim: true,
      lowercase: true,
      maxlength: 80,
    },
    route: { type: String, trim: true, maxlength: 80 },
    params: { type: Schema.Types.Mixed },
    read: { type: Boolean, required: true, default: false },
  },
  { timestamps: true, runValidators: true, runSettersOnQuery: true }
);

const NotificationModel = model("Notification", NotificationSchema);

module.exports = NotificationModel;
