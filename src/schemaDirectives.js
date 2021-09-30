const UpperCaseDirective = require("./components/Directives/UpperCaseDirective");
const CapitalizeDirective = require("./components/Directives/CapitalizeDirective");

const schemaDirectives = {
  upper: UpperCaseDirective,
  capitalize: CapitalizeDirective,
};

module.exports = schemaDirectives;
