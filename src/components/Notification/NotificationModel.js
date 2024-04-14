const admin = require("firebase-admin");
const { Schema, model } = require("mongoose");
const { UserAPI, UserModel } = require("../User");
const serviceAccount = require("../../../firebase-service-account-key.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

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

NotificationSchema.post("save", async (doc) => {
  try {
    const notificationType = doc?.type ?? "";
    switch (notificationType) {
      case "ADMIN": {
        const message = {
          notification: { title: doc.title, body: doc.body },
          data: { doc: JSON.stringify(doc) },
          topic: "admin",
        };
        console.log("Push notification message", message);
        const response = await admin.messaging().send(message);
        console.log("Push notification has been sent", response);
        break;
      }
      case "USER": {
        const context = { user: { _id: doc?.userId } };
        const userAPI = new UserAPI({ UserModel, context });
        const user = await userAPI.user();
        const message = {
          notification: { title: doc.title, body: doc.body },
          data: { doc: JSON.stringify(doc) },
          token: user.FCMToken,
        };
        console.log("Push notification message", message);
        const response = await admin.messaging().send(message);
        console.log("Push notification has been sent", response);
        break;
      }
      case "CONTENT": {
        const message = {
          notification: { title: doc.title, body: doc.body },
          data: { doc: JSON.stringify(doc) },
          topic: "content",
        };
        console.log("Push notification message", message);
        const response = await admin.messaging().send(message);
        console.log("Push notification has been sent", response);
        break;
      }
      case "COMMUNITY": {
        const message = {
          notification: { title: doc.title, body: doc.body },
          data: { doc: JSON.stringify(doc) },
          topic: "community",
        };
        console.log("Push notification message", message);
        const response = await admin.messaging().send(message);
        console.log("Push notification has been sent", response);
        break;
      }
      default: {
        break;
      }
    }
  } catch (error) {
    console.log("Error sending message:", error);
  }
});

const NotificationModel = model("Notification", NotificationSchema);

module.exports = NotificationModel;
