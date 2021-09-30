const { MongoDataSource } = require("apollo-datasource-mongodb");

class FollowAPI extends MongoDataSource {
  follow(followingId) {
    return this.model.findOneAndUpdate(
      {
        followerId: this.context.account._id,
        followingId,
      },
      { active: true },
      { upsert: true, new: true }
    );
  }

  unFollow(followingId) {
    return this.model.findOneAndUpdate(
      {
        followerId: this.context.account._id,
        followingId,
      },
      { active: false },
      { upsert: true, new: true }
    );
  }
}

module.exports = FollowAPI;
