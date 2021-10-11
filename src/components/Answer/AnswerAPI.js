const { MongoDataSource } = require("apollo-datasource-mongodb");

class AnswerAPI extends MongoDataSource {
  questions({ offset, limit, search }) {
    const filter = { verified: true, enable: true };
    if (search) {
      filter["$text"] = { $search: search };
    }
    return (
      this.model
        .find(filter)
        .skip(offset)
        .limit(limit)
        .populate("user")
        .populate("votes")
        // .populate("answers")
        // .populate("attempts")
        .exec()
    );
  }

  userQuestions({ offset, limit, userId }) {
    return (
      this.model
        .find({
          verified: true,
          enable: true,
          user: userId || this.context.user._id,
        })
        .skip(offset)
        .limit(limit)
        .populate("user")
        .populate("votes")
        // .populate("answers")
        // .populate("attempts")
        .exec()
    );
  }

  question({ questionId }) {
    return (
      this.model
        .findById(questionId)
        .populate("user")
        .populate("votes")
        // .populate("answers")
        // .populate("attempts")
        .exec()
    );
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
    return question.save().then((res) => res.populate("user").execPopulate());
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

module.exports = AnswerAPI;
