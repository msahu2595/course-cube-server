const { MongoDataSource } = require("apollo-datasource-mongodb");

class NotificationAPI extends MongoDataSource {
  notifications({ offset, limit, type }) {
    return this.model
      .find({ userId: this.context.user._id, type })
      .skip(offset)
      .limit(limit)
      .sort('createdAt')
      .exec();
  }

  createNotification({
    userId,
    image,
    title,
    message,
    type,
    route,
    params,
    alert,
  }) {
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
