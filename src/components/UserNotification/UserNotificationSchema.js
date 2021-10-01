const { gql } = require("apollo-server");

const UserNotificationSchema = gql`
  extend type Query {
    userNotifications(offset: Int, limit: Int): UserNotificationListResponse
  }

  extend type Mutation {
    readUserNotification(userNotificationId: ID!): UserNotificationResponse
  }

  type UserNotification {
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

  type UserNotificationListResponse implements ListResponse {
    code: String!
    success: Boolean!
    message: String!
    limit: Int!
    offset: Int!
    payload: [UserNotification]
  }

  type UserNotificationResponse implements Response {
    code: String!
    success: Boolean!
    message: String!
    payload: UserNotification
  }
`;

module.exports = UserNotificationSchema;
