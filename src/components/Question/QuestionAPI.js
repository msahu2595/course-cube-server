const { MongoDataSource } = require("apollo-datasource-mongodb");

const populateArray = (userId) => [
  "user",
  {
    path: "liked",
    match: { user: userId, active: true },
  },
  "likes",
  {
    path: "bookmarked",
    match: { user: userId, active: true },
  },
  "bookmarks",
  "answers",
  "views",
];

class QuestionAPI extends MongoDataSource {
  questions({ offset, limit, search, userId, verified = true, enable = true }) {
    const filter = { verified, enable };
    if (search) {
      filter["$text"] = { $search: search };
    }
    if (userId) {
      filter["user"] = userId;
    }
    return this.model
      .find(filter)
      .skip(offset)
      .limit(limit)
      .populate(populateArray(this.context.user._id))
      .exec();
  }

  question({ questionId }) {
    return this.model
      .findById(questionId)
      .populate(populateArray(this.context.user._id))
      .exec();
  }

  createQuestion({
    title,
    description,
    image,
    options,
    answerIndex,
    tags,
    link,
    route,
    params,
  }) {
    const question = new this.model({
      user: this.context.user._id,
      title,
      description,
      image,
      options,
      answerIndex,
      tags,
      link,
      route,
      params,
    });
    return question.save();
  }

  populateQuestion(question) {
    return this.model.populate(question, populateArray(this.context.user._id));
  }

  editQuestion({
    questionId,
    title,
    description,
    image,
    options,
    answerIndex,
    tags,
    link,
    route,
    params,
  }) {
    return this.model
      .findOneAndUpdate(
        {
          _id: questionId,
          user: this.context.user._id,
        },
        {
          title,
          description,
          image,
          options,
          answerIndex,
          tags,
          link,
          route,
          params,
          edited: true,
        },
        { new: true }
      )
      .populate(populateArray(this.context.user._id))
      .exec();
  }

  verifyQuestion({ questionId, tags, message, verified }) {
    return this.model
      .findOneAndUpdate(
        {
          _id: questionId,
        },
        { tags, message, verified },
        { new: true }
      )
      .populate(populateArray(this.context.user._id))
      .exec();
  }

  deleteQuestion({ questionId }) {
    return this.model
      .findOneAndUpdate(
        {
          _id: questionId,
          user: this.context.user._id,
        },
        { enable: false },
        { new: true }
      )
      .populate(populateArray(this.context.user._id))
      .exec();
  }
}

module.exports = QuestionAPI;
