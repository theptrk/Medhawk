var _      = require('lodash');
var secret = require('./secret.js');

module.exports.validateRequest = function (fields) {
  return function (req, res, next) {
    if(_.all(fields, function (field) { return field in req.body; })) {
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
  if (isRecognized(req.body.appKey)) {
    next();
  } else {
    res.send(401, "Unauthorized.");
  }
};