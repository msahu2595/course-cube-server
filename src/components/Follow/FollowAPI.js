const { MongoDataSource } = require("apollo-datasource-mongodb");

class FollowAPI extends MongoDataSource {
  followerList(userId) {
    return this.model
      .find({ following: userId || this.context.user._id })
      .populate("follower")
      .exec();
  }

  followingList(userId) {
    return this.model
      .find({ follower: userId || this.context.user._id })
      .populate("following")
      .exec();
  }

  follow(followingId) {
    return this.model.findOneAndUpdate(
      {
        follower: this.context.user._id,
        following: followingId,
      },
      { active: true },
      { upsert: true, new: true }
    );
  }

  unFollow(followingId) {
    return this.model.findOneAndUpdate(
      {
        follower: this.context.user._id,
        following: followingId,
      },
      { active: false },
      { upsert: true, new: true }
    );
  }
}

module.exports = FollowAPI;
