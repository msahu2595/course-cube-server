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
  }

  input TestInput {
    title: String!
    thumbnail: URL
    instructions: String!
    duration: Duration!
  }

  type Test {
    _id: ID!
    title: String!
    thumbnail: URL
    #
    instructions: String!
    duration: Duration!
    questions: NonNegativeInt!
    totalMarks: NonNegativeFloat!
    #
    enable: Boolean!
    createdAt: String!
    updatedAt: String!
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
