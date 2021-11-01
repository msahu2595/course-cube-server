const { MongoDataSource } = require("apollo-datasource-mongodb");

class TestAPI extends MongoDataSource {
  tests({ offset, limit, search, type, visible = true, enable = true }) {
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
        .populate("attempts")
        .exec()
    );
  }

  test({ testId }) {
    return (
      this.model
        .findById(testId)
        .populate("likes")
        .populate("attempts")
        .exec()
    );
  }

  addTest({ testInput }) {
    const test = new this.model(testInput);
    return test.save();
  }

  editTest({ testId, testInput }) {
    return this.model
      .findOneAndUpdate(
        {
          _id: testId,
        },
        testInput,
        { new: true }
      )
      .exec();
  }

  deleteTest({ testId }) {
    return this.model
      .findOneAndUpdate(
        {
          _id: testId,
        },
        { enable: false },
        { new: true }
      )
      .exec();
  }
}

module.exports = TestAPI;
