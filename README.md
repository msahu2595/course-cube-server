# course-cube-server
Course Cube Server Repository

# Mutations

mutation accountCreate(
  $firstName: String!
  $lastName: String!
  $email: String!
  $password: String!
  $acceptTnC: Boolean!
) {
  accountCreate(
    firstName: $firstName
    lastName: $lastName
    email: $email
    password: $password
    acceptTnC: $acceptTnC
  ) {
    code
    success
    message
    account {
      _id
      firstName
      lastName
      email
      password
      acceptTnC
      createdAt
      updatedAt
    }
  }
}
