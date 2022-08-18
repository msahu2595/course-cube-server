const { Schema, model } = require("mongoose");

const NotificationSchema = new Schema(
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
    type: {
      type: String,
      required: true,
      enum: ["USER", "ADMIN", "CONTENT", "COMMUNITY"],
      default: "USER",
    },
    route: { type: String, trim: true, maxlength: 80 },
    params: { type: Schema.Types.Mixed },
    alert: { type: String, trim: true, lowercase: true, maxlength: 80 },
    read: { type: Boolean, required: true, default: false },
  },
  { timestamps: true, runValidators: true, runSettersOnQuery: true }
);

const NotificationModel = model("Notification", NotificationSchema);

module.exports = NotificationModel;
