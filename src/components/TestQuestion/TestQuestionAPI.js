const { MongoDataSource } = require("apollo-datasource-mongodb");

class TestQuestionAPI extends MongoDataSource {
  constructor(options) {
    super(options); // this sends our server's `cache` through
    this.model = options.TestQuestionModel;
    this.context = options.context;
  }

  testQuestions({ offset, limit, search, testId, invalid, enable = true }) {
    const filter = { testId, enable };
    if (search) {
      filter["$text"] = { $search: search };
    }
    if (typeof invalid == "boolean") {
      filter["invalid"] = invalid;
    }
    return this.model
      .find(filter)
      .sort({ position: 1 })
      .skip(offset)
      .limit(limit)
      .exec();
  }

  testQuestion({ testQuestionId }) {
    return this.model.findById(testQuestionId).exec();
  }

  addTestQuestion({ testId, testQuestionInput }) {
    const testQuestion = new this.model({ test: testId, ...testQuestionInput });
    return testQuestion.save();
  }

  editTestQuestion({ testQuestionId, testQuestionInput }) {
    return this.model
      .findByIdAndUpdate(testQuestionId, testQuestionInput, { new: true })
      .exec();
  }

  // updatePositionsTestQuestion({ testQuestionInput }) {
  //   return this.model.bulkWrite();
  // }

  deleteTestQuestion({ testQuestionId, testQuestionInput }) {
    return this.model
      .findByIdAndUpdate(
        testQuestionId,
        { ...testQuestionInput, enable: false },
        { new: true }
      )
      .exec();
  }
}

module.exports = TestQuestionAPI;
