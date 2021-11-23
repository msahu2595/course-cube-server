const { gql } = require("apollo-server");

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
    type: PurchaseType
    visible: Boolean
    enable: Boolean
  }

  type TestsFilterType {
    type: PurchaseType
    visible: Boolean
    enable: Boolean
  }

  extend type Mutation {
    addTest(testInput: TestInput): TestResponse
    editTest(testId: ID!, testInput: TestInput): TestResponse
    deleteTest(testId: ID!): TestResponse
  }

  input TestInput {
    image: URL!
    subject: String!
    tags: [String!]!
    title: String!
    paid: Boolean!
    price: NonNegativeInt
    offer: NonNegativeInt
    offerType: OfferType
    highlight: String
    instructors: [String]
    language: LanguageType!
    index: String
    description: String!
    validity: PositiveInt
    period: Period
    visible: Boolean
    questions: [TestQuestionInput!]!
    duration: NonNegativeInt!
    marks: NonNegativeInt!
  }

  input TestQuestionInput {
    question: String!
    image: URL
    passage: String
    options: [String!]!
    mark: NonNegativeInt!
    answerIndex: NonNegativeInt!
  }

  type Test {
    _id: ID!
    image: URL!
    subject: String!
    tags: [String!]!
    title: String!
    paid: Boolean!
    price: NonNegativeInt
    offer: NonNegativeInt
    offerType: OfferType
    highlight: String
    instructors: [String]
    language: LanguageType!
    index: String
    description: String!
    validity: PositiveInt
    visible: Boolean!
    questions: [TestQuestion!]!
    duration: NonNegativeInt!
    marks: NonNegativeInt!
    likes: NonNegativeInt
    attempts: NonNegativeInt
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
    mark: NonNegativeInt!
    answerIndex: NonNegativeInt!
    enable: Boolean!
  }

  type TestListResponse implements ListResponse {
    code: String!
    success: Boolean!
    message: String!
    token: String
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
    token: String
    payload: Test
  }
`;

module.exports = TestSchema;
