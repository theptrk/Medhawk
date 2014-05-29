var _      = require('lodash');
var secret = require('../secret.js');

module.exports.validateRequest = function (fields) {
  return function (req, res, next) {
    if(_.all(fields, function (field) { return req.body[field] || req.query[field]; })) {
      next();
    } else {
      res.send(400, "Bad Request.");
    }
  };
};

var isRecognized = function (appKey) {
  return secret.RECOGNIZED.indexOf(appKey) !== -1;
};

module.exports.isApp = function (req, res, next) {
  if (isRecognized(req.body.appKey) || isRecognized(req.query.appKey)) {
    next();
  } else {
    res.send(401, "Unauthorized.");
  }
};
