var _ = require('lodash');

module.exports.validateRequest = function (fields) {
  return function (req, res, next) {
    if(_.all(fields, function (field) { return field in body; })) {
      next();
    } else {
      res.send(400, "Bad Request.");
    }
  };
};