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
    examAttempted(contentId: ID!, testId: ID!): ExamBooleanResponse
    result(contentId: ID!, testId: ID!): ExamResponse
  }

  input ExamsFilterInput {
    userId: ID
    testId: ID
    contentId: ID
    submitted: Boolean
  }

  type ExamsFilterType {
    userId: ID
    testId: ID
    contentId: ID
    submitted: Boolean
  }

  extend type Mutation {
    attemptExam(contentId: ID!): ExamResponse
    addAnswer(
      examId: ID!
      questionId: ID!
      answeredIndex: NonNegativeInt!
    ): ExamIntResponse
    removeAnswer(examId: ID!, questionId: ID!): ExamIntResponse
    submitExam(examId: ID!): ExamResponse
  }

  type ExamList {
    user: User
    test: Test
    content: Content
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
    content: Content
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

  type ExamBooleanResponse implements Response {
    code: String!
    success: Boolean!
    message: String!
    token: JWT
    payload: Boolean!
  }

  type ExamIntResponse implements Response {
    code: String!
    success: Boolean!
    message: String!
    token: JWT
    payload: Int!
  }
`;

module.exports = ExamSchema;
