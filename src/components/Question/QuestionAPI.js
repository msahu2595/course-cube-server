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
    const populateArray = [
      "user",
      {
        path: "liked",
        match: { user: this.context.user._id, active: true },
      },
      "likes",
      {
        path: "bookmarked",
        match: { user: this.context.user._id, active: true },
      },
      "bookmarks",
      "answers",
      "views",
    ];
    return this.model
      .find(filter)
      .skip(offset)
      .limit(limit)
      .populate(populateArray)
      .exec();
  }

  question({ questionId }) {
    const populateArray = [
      "user",
      {
        path: "liked",
        match: { user: this.context.user._id, active: true },
      },
      "likes",
      {
        path: "bookmarked",
        match: { user: this.context.user._id, active: true },
      },
      "bookmarks",
      "answers",
      "views",
    ];
    return this.model.findById(questionId).populate(populateArray).exec();
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
