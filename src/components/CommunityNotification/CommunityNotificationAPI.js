const { MongoDataSource } = require("apollo-datasource-mongodb");

class CommunityNotificationAPI extends MongoDataSource {
  communityNotifications({ offset, limit }) {
    return this.model
      .find({ userId: this.context.user._id })
      .skip(offset)
      .limit(limit)
      .exec();
  }

  createCommunityNotification({
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

  readCommunityNotification({ communityNotificationId }) {
    return this.model.findOneAndUpdate(
      {
        _id: communityNotificationId,
      },
      { read: true },
      { new: true }
    );
  }
}

module.exports = CommunityNotificationAPI;
