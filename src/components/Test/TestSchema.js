const gql = require("graphql-tag");

const TestSchema = gql`
  extend type Query {
    tests(
      offset: Int
      limit: Int
      search: String
      filter: TestsFilterInput
    ): TestListResponse
    test(testId: ID!): TestResponse
    testQuestions(
      offset: Int
      limit: Int
      testId: ID!
    ): TestQuestionListResponse
  }

  input TestsFilterInput {
    enable: Boolean
  }

  type TestsFilterType {
    enable: Boolean
  }

  extend type Mutation {
    addTest(testInput: TestInput!): TestResponse
    editTest(testId: ID!, testInput: TestInput!): TestResponse
    deleteTest(testId: ID!): TestResponse
    addTestQuestion(
      testId: ID!
      position: NonNegativeInt
      questionInput: TestQuestionInput!
    ): TestQuestionResponse
    editTestQuestion(
      questionId: ID!
      questionInput: TestQuestionEditInput!
    ): TestQuestionResponse
    deleteTestQuestion(questionId: ID!, invalid: Boolean!): TestQuestionResponse
  }

  input TestInput {
    title: String!
    thumbnail: String
    instructions: String!
    duration: Duration!
  }

  input TestQuestionInput {
    question: String!
    image: String
    passage: String
    options: [String!]!
    answerIndex: NonNegativeInt!
    mark: PositiveFloat!
    negativeMark: NonNegativeFloat
  }

  input TestQuestionEditInput {
    image: String
    passage: String
    answerIndex: NonNegativeInt!
    mark: PositiveFloat!
    negativeMark: NonNegativeFloat
  }

  type Test {
    _id: ID!
    title: String!
    thumbnail: String
    #
    instructions: String!
    duration: Duration!
    #
    questions: NonNegativeInt!
    totalMarks: NonNegativeFloat!
    #
    enable: Boolean!
    createdAt: String!
    updatedAt: String!
  }

  type TestQuestion {
    _id: ID!
    #
    question: String!
    image: String
    passage: String
    options: [String!]!
    #
    answerIndex: NonNegativeInt!
    mark: PositiveFloat!
    negativeMark: NonNegativeFloat!
    #
    invalid: Boolean!
    enable: Boolean!
  }

  type TestListResponse implements ListResponse {
    code: String!
    success: Boolean!
    message: String!
    token: JWT
    offset: Int!
    limit: Int!
    search: String
    filter: TestsFilterType
    payload: [Test]
  }

  type TestResponse implements Response {
    code: String!
    success: Boolean!
    message: String!
    token: JWT
    payload: Test
  }

  type TestQuestionListResponse implements ListResponse {
    code: String!
    success: Boolean!
    message: String!
    token: JWT
    offset: Int!
    limit: Int!
    testId: ID!
    payload: [TestQuestion]
  }

  type TestQuestionResponse implements Response {
    code: String!
    success: Boolean!
    message: String!
    token: JWT
    payload: TestQuestion
  }
`;

module.exports = TestSchema;
