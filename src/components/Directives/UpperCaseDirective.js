const { SchemaDirectiveVisitor } = require("apollo-server");
const { defaultFieldResolver } = require("graphql");
const capitalize = require("lodash/capitalize");

// Subclass definition for @upper directive logic
class UpperCaseDirective extends SchemaDirectiveVisitor {
  visitFieldDefinition(field) {
    const { resolve = defaultFieldResolver } = field;
    field.resolve = async function (...args) {
      const result = await resolve.apply(this, args);
      if (typeof result === "string") {
        // return result.toUpperCase();
        return capitalize(result);
      }
      return result;
    };
  }
}

module.exports = UpperCaseDirective;
