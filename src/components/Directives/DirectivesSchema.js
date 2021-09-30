const { gql } = require("apollo-server");

const DirectivesSchema = gql`
  directive @upper on FIELD_DEFINITION
  directive @capitalize on FIELD_DEFINITION
`;

module.exports = DirectivesSchema;
