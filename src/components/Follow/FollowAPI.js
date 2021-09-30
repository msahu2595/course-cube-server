const { MongoDataSource } = require("apollo-datasource-mongodb");

class FollowAPI extends MongoDataSource {
  followerList(accountId) {
    return this.model
      .find({ following: accountId || this.context.account._id })
      .populate("follower")
      .exec();
  }

  followingList(accountId) {
    return this.model
      .find({ follower: accountId || this.context.account._id })
      .populate("following")
      .exec();
  }

  follow(followingId) {
    return this.model.findOneAndUpdate(
      {
        follower: this.context.account._id,
        following: followingId,
      },
      { active: true },
      { upsert: true, new: true }
    );
  }

  unFollow(followingId) {
    return this.model.findOneAndUpdate(
      {
        follower: this.context.account._id,
        following: followingId,
      },
      { active: false },
      { upsert: true, new: true }
    );
  }
}

module.exports = FollowAPI;
