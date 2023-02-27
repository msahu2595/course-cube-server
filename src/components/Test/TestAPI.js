const { MongoDataSource } = require("apollo-datasource-mongodb");

class TestAPI extends MongoDataSource {
  constructor(options) {
    super(options); // this sends our server's `cache` through
    this.model = options.TestModel;
    this.context = options.context;
  }

  tests({ offset, limit, search, enable = true }) {
    const compound = {
      filter: [
        {
          equals: {
            path: "enable",
            value: enable,
          },
        },
      ],
    };
    if (search) {
      compound.must = [
        {
          text: {
            query: `${search}`,
            path: {
              wildcard: "*",
            },
          },
        },
      ];
    }
    const agg = [
      {
        $search: {
          index: "search",
          compound,
        },
      },
      { $sort: { createdAt: -1 } },
      { $skip: offset * limit },
      {
        $limit: limit,
      },
    ];
    return this.model.aggregate(agg).exec();
  }

  test({ testId, questionEnable }) {
    const filter = { _id: testId };
    if (typeof questionEnable === Boolean) {
      filter["questions"] = { $elemMatch: { enable: questionEnable } };
    }
    return this.model.findOne(filter).exec();
  }

  testExists({ testId }) {
    return this.model.exists({ _id: testId });
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
        { $set: { "questions.$.enable": false } },
        { new: true }
      )
      .exec();
  }
}

module.exports = TestAPI;
