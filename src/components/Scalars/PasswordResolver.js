const { RegularExpression } = require("graphql-scalars");

const PasswordResolver = new RegularExpression(
  "Password",
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$/
);

module.exports = { Password: PasswordResolver };
