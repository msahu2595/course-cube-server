const { gql } = require("apollo-server");

const CommunityNotificationSchema = gql`
  extend type Query {
    communityNotifications(
      offset: Int
      limit: Int
    ): CommunityNotificationListResponse
  }

  extend type Mutation {
    readCommunityNotification(
      communityNotificationId: ID!
    ): CommunityNotificationResponse
  }

  type CommunityNotification {
    _id: ID!
    userId: ID!
    image: URL
    title: String
    message: String
    route: String
    params: JSONObject
    alert: String
    read: Boolean!
    createdAt: String!
    updatedAt: String!
  }

  type CommunityNotificationListResponse implements ListResponse {
    code: String!
    success: Boolean!
    message: String!
    limit: Int!
    offset: Int!
    payload: [CommunityNotification]
  }

  type CommunityNotificationResponse implements Response {
    code: String!
    success: Boolean!
    message: String!
    payload: CommunityNotification
  }
`;

module.exports = CommunityNotificationSchema;
