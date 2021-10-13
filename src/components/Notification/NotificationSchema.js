const { gql } = require("apollo-server");

const NotificationSchema = gql`
  extend type Query {
    notifications(
      offset: Int
      limit: Int
      type: NotificationType
    ): NotificationListResponse
  }

  extend type Mutation {
    readNotification(notificationId: ID!): NotificationResponse
  }

  type Notification {
    _id: ID!
    userId: ID!
    image: URL
    title: String
    message: String
    type: NotificationType
    route: String
    params: JSONObject
    alert: String
    read: Boolean!
    createdAt: String!
    updatedAt: String!
  }

  enum NotificationType {
    USER
    ADMIN
    COMMUNITY
  }

  type NotificationListResponse implements ListResponse {
    code: String!
    success: Boolean!
    message: String!
    limit: Int!
    offset: Int!
    payload: [Notification]
  }

  type NotificationResponse implements Response {
    code: String!
    success: Boolean!
    message: String!
    payload: Notification
  }
`;

module.exports = NotificationSchema;
