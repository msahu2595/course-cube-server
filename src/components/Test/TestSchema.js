const { gql } = require("apollo-server");

const TestSchema = gql`
  extend type Query {
    tests(
      offset: Int
      limit: Int
      search: String
      filter: TestsFilterInput
    ): TestListResponse
    test(testId: ID!, questionEnable: Boolean): TestResponse
  }

  input TestsFilterInput {
    enable: Boolean
    questionEnable: Boolean
  }

  type TestsFilterType {
    enable: Boolean
    questionEnable: Boolean
  }

  extend type Mutation {
    addTest(testInput: TestInput!): TestResponse
    editTest(testId: ID!, testInput: TestInput!): TestResponse
    deleteTest(testId: ID!): TestResponse
    addTestQuestion(
      testId: ID!
      questionInput: TestQuestionInput!
    ): TestResponse
    editTestQuestion(
      questionId: ID!
      questionInput: TestQuestionEditInput!
    ): TestResponse
    deleteTestQuestion(questionId: ID!): TestResponse
  }

  input TestInput {
    title: String!
    thumbnail: URL
    instructions: String!
    duration: Duration!
    totalMarks: NonNegativeFloat!
    negativeMark: NonPositiveFloat!
  }

  input TestQuestionInput {
    question: String!
    image: URL
    passage: String
    options: [String!]!
    mark: NonNegativeFloat!
    answerIndex: NonNegativeInt!
  }

  input TestQuestionEditInput {
    question: String
    image: URL
    passage: String
    options: [String!]
    mark: NonNegativeFloat
    answerIndex: NonNegativeInt
  }

  type Test {
    _id: ID!
    title: String!
    thumbnail: URL
    instructions: String!
    questions: [TestQuestion!]
    duration: Duration!
    totalMarks: NonNegativeFloat!
    negativeMark: NonPositiveFloat!
    enable: Boolean!
    createdAt: String!
    updatedAt: String!
  }

  type TestQuestion {
    _id: ID!
    question: String!
    image: URL
    passage: String
    options: [String!]!
    mark: NonNegativeFloat!
    answerIndex: NonNegativeInt!
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
`;

module.exports = TestSchema;
