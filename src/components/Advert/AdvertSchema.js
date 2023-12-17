const gql = require("graphql-tag");

const AdvertSchema = gql`
  enum AdvertType {
    TINY # 4/1 Ratio
    SMALL # 2.5/1 Ratio
    MEDIUM # 16/9 Ratio
    LARGE #1/1 Ratio
  }

  extend type Query {
    adverts(
      offset: Int
      limit: Int
      filter: AdvertsFilterInput
    ): AdvertListResponse
  }

  input AdvertsFilterInput {
    type: AdvertType
    enable: Boolean
  }

  type AdvertsFilterType {
    type: AdvertType
    enable: Boolean
  }

  extend type Mutation {
    createAdvert(advertInput: AdvertInput!): AdvertResponse
    editAdvert(advertId: ID!, advertInput: AdvertEditInput!): AdvertResponse
    deleteAdvert(advertId: ID!): AdvertResponse
  }

  input AdvertInput {
    image: String!
    type: AdvertType!
    link: URL
    route: String
    params: JSONObject
  }

  input AdvertEditInput {
    image: String
    link: URL
    route: String
    params: JSONObject
  }

  type Advert {
    _id: ID!
    image: String!
    type: AdvertType!
    link: URL
    route: String
    params: JSONObject
    enable: Boolean!
    createdAt: String!
    updatedAt: String!
  }

  type AdvertListResponse implements ListResponse {
    code: String!
    success: Boolean!
    message: String!
    token: JWT
    offset: Int!
    limit: Int!
    filter: AdvertsFilterType
    payload: [Advert]
  }

  type AdvertResponse implements Response {
    code: String!
    success: Boolean!
    message: String!
    token: JWT
    payload: Advert
  }
`;

module.exports = AdvertSchema;
