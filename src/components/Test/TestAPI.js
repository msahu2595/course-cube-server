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

  testQuestions({ offset, limit, testId }) {
    return this.model
      .findById(testId)
      .slice("questions", [offset, limit])
      .exec();
  }

  testQuestion({ questionId }) {
    return this.model
      .findOne({ "questions._id": questionId }, { "questions.$": 1 })
      .then((doc) => doc.questions[0]);
  }

  testExists({ testId, ...rest }) {
    return this.model
      .findOne({ _id: testId, enable: true, ...rest })
      .select("_id questions")
      .lean();
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

  addTestQuestion({ testId, position, questionInput }) {
    const questions = { $each: [questionInput] };
    if (typeof position === "number" && position > -1) {
      questions.$position = position;
    }
    return this.model
      .findByIdAndUpdate(testId, { $push: { questions } }, { new: true })
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
        { $set: updateData },
        { new: true }
      )
      .exec();
  }

  deleteTestQuestion({ questionId, invalid }) {
    const updateData = { "questions.$.enable": false };
    if (invalid) {
      updateData["questions.$.invalid"] = invalid;
    }
    return this.model
      .findOneAndUpdate(
        { "questions._id": questionId },
        { $set: updateData },
        { new: true }
      )
      .exec();
  }
}

module.exports = TestAPI;
