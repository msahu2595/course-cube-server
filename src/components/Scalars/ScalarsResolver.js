const { RegularExpression } = require("graphql-scalars");

const ScalarsResolver = {
  Password: new RegularExpression(
    "Password",
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$/
  ),
};

module.exports = ScalarsResolver;
