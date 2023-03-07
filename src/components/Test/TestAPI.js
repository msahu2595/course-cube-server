const { MongoDataSource } = require("apollo-datasource-mongodb");

class TestAPI extends MongoDataSource {
  constructor(options) {
    super(options); // this sends our server's `cache` through
    this.model = options.TestModel;
    this.context = options.context;
  }

  tests({ offset, limit, search, enable = true }) {
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

  test({ testId }) {
    return this.model.findById(testId).exec();
  }

  testExists({ testId }) {
    return this.model.findById(testId).select("_id questions").lean();
  }

  addTest({ testInput }) {
    const test = new this.model(testInput);
    return test.save();
  }

  editTest({ testId, testInput }) {
    return this.model
      .findByIdAndUpdate(testId, testInput, { new: true })
      .exec();
  }

  deleteTest({ testId }) {
    return this.model
      .findByIdAndUpdate(testId, { enable: false }, { new: true })
      .exec();
  }

  addTestQuestion({ testId, questionInput }) {
    return this.model
      .findByIdAndUpdate(
        testId,
        { $push: { questions: questionInput } },
        { new: true }
      )
      .exec();
  }

  editTestQuestion({ questionId, questionInput }) {
    const updateData = {};
    Object.keys(questionInput).map((key) => {
      updateData[`questions.$.${key}`] = questionInput[key];
    });
    return this.model
      .findOneAndUpdate(
        { "questions._id": questionId },
        {
          $set: updateData,
        },
        { new: true }
      )
      .exec();
  }

  deleteTestQuestion({ questionId }) {
    return this.model
      .findOneAndUpdate(
        { "questions._id": questionId },
        { $pull: { questions: { _id: questionId } } },
        { new: true }
      )
      .exec();
  }
}

module.exports = TestAPI;
