const { MongoDataSource } = require("apollo-datasource-mongodb");

class NotificationAPI extends MongoDataSource {
  constructor(options) {
    super(options); // this sends our server's `cache` through
    this.model = options.NotificationModel;
    this.context = options.context;
  }

  notifications({ offset, limit, type, read }) {
    const filter = {};
    if (type === "ADMIN") {
      if (this.context.user?.role !== "USER") {
        filter["type"] = "ADMIN";
      } else {
        filter["userId"] = this.context.user?._id;
        filter["type"] = "USER";
      }
    } else {
      filter["userId"] = this.context.user?._id;
      filter["type"] = type || "USER";
    }
    if (typeof read == "boolean") {
      filter["read"] = read;
    }
    return this.model
      .find(filter)
      .sort({ createdAt: -1 })
      .skip(offset)
      .limit(limit)
      .exec();
  }

  createNotification({
    userId,
    title,
    body,
    icon,
    type,
    alert,
    route,
    params,
  }) {
    return this.model.create({
      userId: userId || this.context.user?._id,
      title,
      body,
      icon,
      type,
      alert,
      route,
      params,
    });
  }

  readNotification({ notificationId }) {
    return this.model
      .findByIdAndUpdate(notificationId, { read: true }, { new: true })
      .exec();
  }
}

module.exports = NotificationAPI;
