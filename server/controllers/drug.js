var Drug = require('../models').Drug;

module.exports.getDrugs = require('./controllerUtils.js').robustQuery(Drug, {
  matching: {},
  fields: "name company",
  options: {}
});