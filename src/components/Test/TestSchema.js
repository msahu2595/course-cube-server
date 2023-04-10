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
  }

  input TestQuestionInput {
    question: String!
    image: URL
    passage: String
    options: [String!]!
    answerIndex: NonNegativeInt!
    mark: PositiveFloat!
    negativeMark: NonPositiveFloat
  }

  input TestQuestionEditInput {
    question: String
    image: URL
    passage: String
    options: [String!]
    answerIndex: NonNegativeInt
    mark: PositiveFloat
    negativeMark: NonPositiveFloat
  }

  type Test {
    _id: ID!
    title: String!
    thumbnail: URL
    #
    instructions: String!
    duration: Duration!
    questions: [TestQuestion!]
    totalMarks: NonNegativeFloat!
    #
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
    answerIndex: NonNegativeInt!
    mark: PositiveFloat!
    negativeMark: NonPositiveFloat!
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
