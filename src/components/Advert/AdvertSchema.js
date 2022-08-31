const { gql } = require("apollo-server");

const AdvertSchema = gql`
  enum AdvertType {
    SMALL # 4/1 Ratio
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
    editAdvert(advertId: ID!, advertInput: AdvertInput!): AdvertResponse
    deleteAdvert(advertId: ID!): AdvertResponse
  }

  input AdvertInput {
    image: URL!
    type: AdvertType!
    link: URL
    route: String
    params: JSONObject
  }

  type Advert {
    _id: ID!
    image: URL!
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
