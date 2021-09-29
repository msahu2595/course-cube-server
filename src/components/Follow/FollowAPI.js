const { MongoDataSource } = require("apollo-datasource-mongodb");

class FollowAPI extends MongoDataSource {
  // getAccount(_id) {
  //   return this.findOneById(_id);
  // }

  follow(followingId) {
    return this.model.create({
      followerId: this.context.account._id,
      followingId,
      active: true,
    });
  }
}

module.exports = FollowAPI;
