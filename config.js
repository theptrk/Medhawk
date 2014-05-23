var express = require('express');
var path = require('path');

module.exports = function (app) {
  app.use(require('morgan')({format: 'short'}));
  app.use(require('body-parser')());
  app.use(express.static(path.join(__dirname + '/public')));
};
