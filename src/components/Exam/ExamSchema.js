const gql = require("graphql-tag");

const ExamSchema = gql`
  extend type Query {
    exams(
      offset: Int
      limit: Int
      search: String
      filter: ExamsFilterInput
    ): ExamListResponse
    userExams(offset: Int, limit: Int, search: String): ExamListResponse
    result(examId: ID!): ExamResponse
  }

  input ExamsFilterInput {
    userId: ID
    testId: ID
    submitted: Boolean
  }

  type ExamsFilterType {
    userId: ID
    testId: ID
    submitted: Boolean
  }

  extend type Mutation {
    attemptExam(testId: ID!): ExamResponse
    addAnswer(
      examId: ID!
      questionId: ID!
      answeredIndex: NonNegativeInt!
    ): ExamAnswerResponse
    removeAnswer(examId: ID!, questionId: ID!): ExamAnswerResponse
    submitExam(examId: ID!): ExamResponse
  }

  type ExamList {
    user: User
    test: Test
    #
    _id: ID!
    title: String!
    thumbnail: URL
    #
    instructions: String!
    duration: Duration!
    #
    questions: NonNegativeInt!
    totalMarks: NonNegativeFloat!
    #
    submitted: Boolean!
    createdAt: String!
    updatedAt: String!
  }

  type Exam {
    user: User
    test: Test
    #
    _id: ID!
    title: String!
    thumbnail: URL
    #
    instructions: String!
    duration: Duration!
    #
    questions: [ExamQuestion!]
    totalMarks: NonNegativeFloat!
    gotMarks: Float!
    #
    submitted: Boolean!
    createdAt: String!
    updatedAt: String!
  }

  type ExamQuestion {
    _id: ID!
    testQuestion: TestQuestion
    #
    question: String!
    image: URL
    passage: String
    options: [String!]!
    #
    answeredIndex: Int!
    mark: PositiveFloat!
    negativeMark: NonNegativeFloat!
  }

  type ExamListResponse implements ListResponse {
    code: String!
    success: Boolean!
    message: String!
    token: JWT
    offset: Int!
    limit: Int!
    search: String
    filter: ExamsFilterType
    payload: [ExamList]
  }

  type ExamResponse implements Response {
    code: String!
    success: Boolean!
    message: String!
    token: JWT
    payload: Exam
  }

  type ExamAnswerResponse implements Response {
    code: String!
    success: Boolean!
    message: String!
    token: JWT
    payload: Boolean!
  }
`;

module.exports = ExamSchema;
