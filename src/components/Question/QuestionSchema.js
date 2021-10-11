const { gql } = require("apollo-server");

const QuestionSchema = gql`
  extend type Query {
    questions(offset: Int, limit: Int, search: String): QuestionListResponse
    userQuestions(offset: Int, limit: Int, userId: ID): QuestionListResponse
    question(questionId: ID!): QuestionResponse
  }

  extend type Mutation {
    createQuestion(questionInput: QuestionInput): QuestionResponse
    editQuestion(
      questionId: ID!
      questionInput: QuestionInput
    ): QuestionResponse
    verifyQuestion(
      questionId: ID!
      questionInput: VerifyQuestionInput
    ): QuestionResponse
    deleteQuestion(questionId: ID!): QuestionResponse
  }

  input QuestionInput {
    title: String!
    description: String!
    image: URL
    options: [String!]
    answerIndex: PositiveInt
    tags: [String!]
    link: URL
    route: String
    params: JSONObject
  }

  input VerifyQuestionInput {
    tags: [String!]
    message: String
    verified: Boolean!
  }

  type Question {
    _id: ID!
    user: User
    title: String!
    description: String!
    image: URL
    options: [String!]
    answerIndex: PositiveInt
    tags: [String!]
    link: URL
    route: String
    params: JSONObject
    votes: Int
    answers: Int
    attempts: Int
    message: String
    verified: Boolean!
    edited: Boolean!
    enable: Boolean!
    createdAt: String!
    updatedAt: String!
  }

  type QuestionListResponse implements ListResponse {
    code: String!
    success: Boolean!
    message: String!
    limit: Int!
    offset: Int!
    search: String
    payload: [Question!]
  }

  type QuestionResponse implements Response {
    code: String!
    success: Boolean!
    message: String!
    payload: Question
  }
`;

module.exports = QuestionSchema;
