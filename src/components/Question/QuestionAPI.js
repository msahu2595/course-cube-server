const { MongoDataSource } = require("apollo-datasource-mongodb");

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
      .populate("user")
      .populate("likes")
      .populate("answers")
      .populate("views")
      .exec();
  }

  question({ questionId }) {
    return this.model
      .findById(questionId)
      .populate("user")
      .populate("likes")
      .populate("answers")
      .populate("views")
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
    return this.model.populate(question, { path: "user" });
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
      .populate("user")
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
      .populate("user")
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
      .populate("user")
      .exec();
  }
}

module.exports = QuestionAPI;
