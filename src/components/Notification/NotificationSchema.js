const gql = require("graphql-tag");

const NotificationSchema = gql`
  extend type Query {
    notifications(
      offset: Int
      limit: Int
      filter: NotificationsFilterInput
    ): NotificationListResponse
  }

  input NotificationsFilterInput {
    type: NotificationType
    read: Boolean
  }

  type NotificationsFilterType {
    type: NotificationType
    read: Boolean
  }

  extend type Mutation {
    readNotification(notificationId: ID!): NotificationResponse
  }

  type Notification {
    _id: ID!
    userId: ID!
    title: String!
    body: String!
    icon: String
    type: NotificationType!
    alert: String
    route: String
    params: JSONObject
    read: Boolean!
    createdAt: String!
    updatedAt: String!
  }

  enum NotificationType {
    USER
    ADMIN
    CONTENT
    COMMUNITY
  }

  type NotificationListResponse implements ListResponse {
    code: String!
    success: Boolean!
    message: String!
    token: JWT
    offset: Int!
    limit: Int!
    filter: NotificationsFilterType
    payload: [Notification]
  }

  type NotificationResponse implements Response {
    code: String!
    success: Boolean!
    message: String!
    token: JWT
    payload: Notification
  }
`;

module.exports = NotificationSchema;
