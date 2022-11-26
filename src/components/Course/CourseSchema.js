const gql = require("graphql-tag");

const CourseSchema = gql`
  enum PurchaseType {
    FREE
    PAID
  }

  enum OfferType {
    PERCENT
    AMOUNT
  }

  enum LanguageType {
    HI
    EN
  }

  enum Period {
    DAY
    WEEK
    MONTH
    YEAR
  }

  extend type Query {
    courses(
      offset: Int
      limit: Int
      search: String
      filter: CoursesFilterInput
    ): CourseListResponse
    course(courseId: ID!): CourseResponse
  }

  input CoursesFilterInput {
    type: PurchaseType
    visible: Boolean
    enable: Boolean
  }

  type CoursesFilterType {
    type: PurchaseType
    visible: Boolean
    enable: Boolean
  }

  extend type Mutation {
    addCourse(courseInput: CourseInput): CourseResponse
    editCourse(courseId: ID!, courseInput: CourseInput): CourseResponse
    deleteCourse(courseId: ID!): CourseResponse
  }

  input CourseInput {
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
    syllabus: JSON!
  }

  type Course {
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
    period: Period
    visible: Boolean!
    syllabus: JSON!
    purchased: NonNegativeInt
    likes: NonNegativeInt
    sales: NonNegativeInt
    enable: Boolean!
    createdAt: String!
    updatedAt: String!
  }

  type CourseListResponse implements ListResponse {
    code: String!
    success: Boolean!
    message: String!
    token: JWT
    offset: Int!
    limit: Int!
    search: String
    filter: CoursesFilterType
    payload: [Course]
  }

  type CourseResponse implements Response {
    code: String!
    success: Boolean!
    message: String!
    token: JWT
    payload: Course
  }
`;

module.exports = CourseSchema;
