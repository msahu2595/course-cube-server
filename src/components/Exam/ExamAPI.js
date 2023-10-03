const { MongoDataSource } = require("apollo-datasource-mongodb");

class ExamAPI extends MongoDataSource {
  constructor(options) {
    super(options); // this sends our server's `cache` through
    this.model = options.ExamModel;
    this.context = options.context;
  }

  exams({ offset, limit, search, userId, testId, submitted = true }) {
    const filter = { submitted };
    if (userId) {
      filter["user"] = userId;
    }
    if (testId) {
      filter["test"] = testId;
    }
    if (search) {
      filter["$text"] = { $search: search };
    }
    const populateArray = ["user"];
    return this.model
      .find(filter)
      .sort({ createdAt: -1 })
      .skip(offset)
      .limit(limit)
      .populate(populateArray)
      .exec();
  }

  userExams({ offset, limit, search }) {
    const filter = { user: this.context.user._id, submitted: true };
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

  result({ contentId, testId }) {
    return this.model
      .findOne({ content: contentId, test: testId, submitted: true })
      .exec();
  }

  examExists({ examId, ...rest }) {
    return this.model.exists({ _id: examId, ...rest });
  }

  examAttempted({ contentId, testId }) {
    return this.model.exists({
      user: this.context.user._id,
      content: contentId,
      test: testId,
    });
  }

  addExam({ examInput }) {
    const exam = new this.model({ ...examInput, user: this.context.user._id });
    return exam.save();
  }

  addAnswer({ questionId, answeredIndex }) {
    return this.model
      .findOneAndUpdate(
        { "questions._id": questionId },
        {
          $set: { "questions.$.answeredIndex": answeredIndex },
        },
        { new: true }
      )
      .exec();
  }

  removeAnswer({ questionId }) {
    return this.model
      .findOneAndUpdate(
        { "questions._id": questionId },
        {
          $set: { "questions.$.answeredIndex": -1 },
        },
        { new: true }
      )
      .exec();
  }

  submitExam({ examId }) {
    return this.model
      .findByIdAndUpdate(examId, { submitted: true }, { new: true })
      .exec();
  }
}

module.exports = ExamAPI;
