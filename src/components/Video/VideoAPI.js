const { MongoDataSource } = require("apollo-datasource-mongodb");

class VideoAPI extends MongoDataSource {
  videos({ offset, limit, search, type, visible = true, enable = true }) {
    const filter = { visible, enable };
    if (type) {
      filter["paid"] = type === "PAID" ? true : false;
    }
    if (search) {
      filter["$text"] = { $search: search };
    }
    return (
      this.model
        .find(filter)
        .skip(offset)
        .limit(limit)
        .populate("likes")
        // .populate("watches")
        .exec()
    );
  }

  video({ videoId }) {
    return (
      this.model
        .findById(videoId)
        .populate("likes")
        // .populate("watches")
        .exec()
    );
  }

  addVideo({ videoInput, urls }) {
    const question = new this.model({ ...videoInput, urls });
    return question.save();
  }

  editVideo({ videoId, videoInput, urls }) {
    return this.model
      .findOneAndUpdate(
        {
          _id: videoId,
        },
        { ...videoInput, urls },
        { new: true }
      )
      .exec();
  }

  refreshVideo({ videoId, urls }) {
    return this.model
      .findOneAndUpdate(
        {
          _id: videoId,
        },
        { urls },
        { new: true }
      )
      .exec();
  }

  deleteVideo({ videoId }) {
    return this.model
      .findOneAndUpdate(
        {
          _id: videoId,
        },
        { enable: false },
        { new: true }
      )
      .exec();
  }
}

module.exports = VideoAPI;
