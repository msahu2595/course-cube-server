const gql = require("graphql-tag");

const TestQuestionSchema = gql`
  extend type Query {
    testQuestions(
      offset: Int
      limit: Int
      search: String
      testId: ID!
      filter: TestQuestionsFilterInput
    ): TestQuestionListResponse
    testQuestion(testQuestionId: ID!): TestQuestionResponse
  }

  input TestQuestionsFilterInput {
    invalid: Boolean
    enable: Boolean
  }

  type TestQuestionsFilterType {
    invalid: Boolean
    enable: Boolean
  }

  extend type Mutation {
    addTestQuestion(
      testId: ID!
      testQuestionInput: TestQuestionInput!
    ): TestQuestionResponse
    editTestQuestion(
      testQuestionId: ID!
      testQuestionInput: TestQuestionEditInput!
    ): TestQuestionResponse
    # updatePositionsTestQuestion(
    #   testQuestionInput: [TestQuestionsPositionInput!]!
    # )
    deleteTestQuestion(
      testQuestionId: ID!
      testQuestionInput: TestQuestionDeleteInput
    ): TestQuestionResponse
  }

  input TestQuestionsPositionInput {
    testQuestionId: ID!
    position: PositiveInt!
  }

  input TestQuestionInput {
    question: String!
    image: URL
    passage: String
    options: [String!]!
    answerIndex: NonNegativeInt!
    mark: PositiveFloat!
    negativeMark: NonNegativeFloat
    position: PositiveInt!
  }

  input TestQuestionEditInput {
    answerIndex: NonNegativeInt!
  }

  input TestQuestionDeleteInput {
    invalid: Boolean!
  }

  type TestQuestion {
    _id: ID!
    test: Test
    #
    question: String!
    image: URL
    passage: String
    options: [String!]!
    #
    answerIndex: NonNegativeInt!
    mark: PositiveFloat!
    negativeMark: NonPositiveFloat!
    #
    position: PositiveInt!
    invalid: Boolean!
    enable: Boolean!
    #
    createdAt: String!
    updatedAt: String!
  }

  type TestQuestionListResponse implements ListResponse {
    code: String!
    success: Boolean!
    message: String!
    token: JWT
    offset: Int!
    limit: Int!
    search: String
    testId: ID!
    filter: TestQuestionsFilterType
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

module.exports = TestQuestionSchema;
