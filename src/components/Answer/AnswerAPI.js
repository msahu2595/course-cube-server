const { MongoDataSource } = require("apollo-datasource-mongodb");

class AnswerAPI extends MongoDataSource {
  answers({ offset, limit, questionId }) {
    return this.model
      .find({ verified: true, enable: true, question: questionId })
      .skip(offset)
      .limit(limit)
      .populate("user")
      .populate("votes")
      .exec();
  }

  userAnswers({ offset, limit, userId, verified, enable }) {
    return this.model
    .find({
        user: userId || this.context.user._id,
        verified: verified || true,
        enable: enable || true,
      })
      .skip(offset)
      .limit(limit)
      .populate("user")
      .populate("question")
      .populate("votes")
      .exec();
  }

  answer({ answerId }) {
    return this.model
      .findById(answerId)
      .populate("user")
      .populate("question")
      .populate("votes")
      .exec();
  }

  createAnswer({ questionId, answer, image, link, route, params }) {
    const question = new this.model({
      user: this.context.user._id,
      question: questionId,
      answer,
      image,
      link,
      route,
      params,
    });
    return question.save().then((res) => res.populate("user").execPopulate());
  }

  editAnswer({ answerId, answer, image, link, route, params }) {
    return this.model
      .findOneAndUpdate(
        {
          _id: answerId,
          user: this.context.user._id,
        },
        {
          answer,
          image,
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

  verifyAnswer({ answerId, message, verified }) {
    return this.model
      .findOneAndUpdate(
        {
          _id: answerId,
        },
        { message, verified },
        { new: true }
      )
      .populate("user")
      .exec();
  }

  deleteAnswer({ answerId }) {
    return this.model
      .findOneAndUpdate(
        {
          _id: answerId,
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
