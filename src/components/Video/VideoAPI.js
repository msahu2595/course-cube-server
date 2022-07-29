const { MongoDataSource } = require("apollo-datasource-mongodb");

class VideoAPI extends MongoDataSource {
  videos({ offset, limit, search, enable = true }) {
    const filter = { enable };
    if (search) {
      filter["$text"] = { $search: search };
    }
    return this.model
      .find(filter)
      .sort({ createdAt: -1 })
      .skip(offset)
      .limit(limit)
      .exec();
  }

  video({ videoId }) {
    return this.model.findById(videoId).exec();
  }

  videoExists({ videoId }) {
    return this.model.exists({ _id: videoId });
  }

  addVideo({ videoInput }) {
    console.log(videoInput);
    const video = new this.model(videoInput);
    return video.save();
  }

  editVideo({ videoId, videoInput }) {
    return this.model
      .findByIdAndUpdate(videoId, videoInput, { new: true })
      .exec();
  }

  refreshVideo({ videoId, urls }) {
    return this.model
      .findByIdAndUpdate(videoId, { urls }, { new: true })
      .exec();
  }

  deleteVideo({ videoId }) {
    return this.model
      .findByIdAndUpdate(videoId, { enable: false }, { new: true })
      .exec();
  }
}

module.exports = VideoAPI;
