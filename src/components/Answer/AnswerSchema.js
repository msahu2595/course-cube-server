const gql = require("graphql-tag");

const AnswerSchema = gql`
  extend type Query {
    answers(offset: Int, limit: Int, questionId: ID!): AnswerListResponse
    userAnswers(
      offset: Int
      limit: Int
      filter: UserAnswersFilter
    ): AnswerListResponse
    answer(answerId: ID!): AnswerResponse
  }

  extend type Mutation {
    createAnswer(questionId: ID!, answerInput: AnswerInput): AnswerResponse
    editAnswer(answerId: ID!, answerInput: AnswerInput): AnswerResponse
    verifyAnswer(answerId: ID!, answerInput: VerifyAnswerInput): AnswerResponse
    deleteAnswer(answerId: ID!): AnswerResponse
  }

  input UserAnswersFilter {
    userId: ID
    verified: Boolean
    enable: Boolean
  }

  input AnswerInput {
    answer: String!
    image: URL
    link: URL
    route: String
    params: JSONObject
  }

  input VerifyAnswerInput {
    message: String
    verified: Boolean!
  }

  type Answer {
    _id: ID!
    user: User
    question: Question
    answer: String!
    image: URL
    link: URL
    route: String
    params: JSONObject
    likes: Int
    message: String
    verified: Boolean!
    edited: Boolean!
    enable: Boolean!
    createdAt: String!
    updatedAt: String!
  }

  type AnswerListResponse implements ListResponse {
    code: String!
    success: Boolean!
    message: String!
    token: JWT
    limit: Int!
    offset: Int!
    payload: [Answer!]
  }

  type AnswerResponse implements Response {
    code: String!
    success: Boolean!
    message: String!
    token: JWT
    payload: Answer
  }
`;

module.exports = AnswerSchema;
