const { MongoDataSource } = require("apollo-datasource-mongodb");

class FollowAPI extends MongoDataSource {
  constructor(options) {
    super(options); // this sends our server's `cache` through
    this.model = options.FollowModel;
    this.context = options.context;
  }

  followerList({ offset, limit, userId }) {
    return this.model
      .find({ following: userId || this.context.user._id })
      .skip(offset)
      .limit(limit)
      .populate("follower")
      .exec();
  }

  followingList({ offset, limit, userId }) {
    return this.model
      .find({ follower: userId || this.context.user._id })
      .skip(offset)
      .limit(limit)
      .populate("following")
      .exec();
  }

  follow({ followingId }) {
    return this.model.findOneAndUpdate(
      {
        follower: this.context.user._id,
        following: followingId,
      },
      {},
      { upsert: true, new: true }
    );
  }

  unFollow({ followingId }) {
    return this.model.deleteOne({
      follower: this.context.user._id,
      following: followingId,
    });
  }
}

module.exports = FollowAPI;
