var express = require('express');
var path = require('path');

module.exports = function (app) {
  app.use(function (req, res, next) {
    console.log("Received request:");
    require('morgan')({format: 'short', immediate: true})(req, res, next);
  });
  app.use(require('morgan')({format: 'short'}));
  app.use(require('body-parser')());
  app.use(function (req, res, next) {
    console.log("Request Body:", req.body);
    next();
  });
};
