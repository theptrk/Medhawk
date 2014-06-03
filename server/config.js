var express = require('express');
var morgan = require('morgan');

module.exports = function (app) {
  app.use(function (req, res, next) {
    console.log("Received request:");
    morgan({format: 'short', immediate: true})(req, res, next);
  });
  app.use(require('cors')());
  app.use(morgan({format: 'short'}));
  app.use(require('body-parser')());
  app.use(function (req, res, next) {
    console.log("Request Body:", req.body);
    console.log("Request Params:", req.query);
    next();
  });
  app.use('/emojis', express.static(__dirname + '/emojis'));
};
