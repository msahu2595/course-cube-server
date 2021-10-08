const { MongoDataSource } = require("apollo-datasource-mongodb");

class NotificationAPI extends MongoDataSource {
  notifications({ offset, limit }) {
    return this.model
      .find({ userId: this.context.user._id })
      .skip(offset)
      .limit(limit)
      .exec();
  }

  createNotification({ userId, image, title, message, type, route, params, alert }) {
    return this.model.create({
      userId,
      image,
      title,
      message,
      type,
      route,
      params,
      alert,
    });
  }

  readNotification({ notificationId }) {
    return this.model.findOneAndUpdate(
      {
        _id: notificationId,
      },
      { read: true },
      { new: true }
    );
  }
}

module.exports = NotificationAPI;
