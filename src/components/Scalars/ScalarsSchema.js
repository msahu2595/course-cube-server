const { gql } = require("apollo-server");

const ScalarsSchema = gql`
  scalar Password
`;

module.exports = ScalarsSchema;
