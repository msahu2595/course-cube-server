const moment = require("moment");
const { MongoDataSource } = require("apollo-datasource-mongodb");

class HistoryAPI extends MongoDataSource {
  constructor(options) {
    super(options); // this sends our server's `cache` through
    this.model = options.HistoryModel;
    this.context = options.context;
  }

  history({ offset, limit, userId, type, subType }) {
    const filter = { user: userId || this.context.user._id, visible: true };
    if (type) {
      filter["type"] = type;
    }
    if (subType) {
      filter["subType"] = subType;
    }
    return this.model
      .find(filter)
      .sort({ updatedAt: -1 })
      .skip(offset)
      .limit(limit)
      .populate("ref")
      .exec();
  }

  historyUsers({ offset, limit, refId }) {
    return this.model
      .find({ ref: refId })
      .skip(offset)
      .limit(limit)
      .populate("user")
      .exec();
  }

  weeklyLeaderboardUserIds({ offset, limit }) {
    return this.model.aggregate([
      {
        $match: {
          updatedAt: {
            $gte: new Date(
              `${moment()
                .subtract(1, "weeks")
                .startOf("week")
                .format("YYYY-MM-DD")}`
            ),
            $lte: new Date(
              `${moment()
                .subtract(1, "weeks")
                .endOf("week")
                .format("YYYY-MM-DD")}`
            ),
          },
        },
      },
      {
        $sortByCount: "$user",
      },
      { $skip: offset },
      { $limit: limit },
    ]);
  }

  monthlyLeaderboardUserIds({ offset, limit }) {
    return this.model.aggregate([
      {
        $match: {
          updatedAt: {
            $gte: new Date(
              `${moment()
                .subtract(1, "months")
                .startOf("month")
                .format("YYYY-MM-DD")}`
            ),
            $lte: new Date(
              `${moment()
                .subtract(1, "months")
                .endOf("month")
                .format("YYYY-MM-DD")}`
            ),
          },
        },
      },
      {
        $sortByCount: "$user",
      },
      { $skip: offset },
      { $limit: limit },
    ]);
  }

  addHistory({ refId, type, subType }) {
    const historyInput = { type };
    if (subType) {
      historyInput.subType = subType;
    }
    this.model
      .findOneAndUpdate(
        {
          user: this.context.user._id,
          ref: refId,
        },
        historyInput,
        { upsert: true, new: true }
      )
      .then(() => {})
      .catch(() => {});
  }

  removeHistory({ refId }) {
    return this.model.findOneAndUpdate(
      {
        user: this.context.user._id,
        ref: refId,
      },
      { visible: false },
      { upsert: true, new: true }
    );
  }
}

module.exports = HistoryAPI;
