const { MongoDataSource } = require("apollo-datasource-mongodb");

class UserNotificationAPI extends MongoDataSource {
  notifications({ offset, limit }) {
    return this.model
      .find({ userId: this.context.user._id })
      .skip(offset)
      .limit(limit)
      .exec();
  }

  createUserNotification({
    userId,
    image,
    title,
    message,
    route,
    params,
    alert,
  }) {
    return this.model.create({
      userId,
      image,
      title,
      message,
      route,
      params,
      alert,
    });
  }

  readUserNotification({ userNotificationId }) {
    return this.model.findOneAndUpdate(
      {
        _id: userNotificationId,
      },
      { read: true },
      { new: true }
    );
  }
}

module.exports = UserNotificationAPI;
