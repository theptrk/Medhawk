var express = require('express');
var env = require('./env.js');
var db = require('./mongoose');

var app = express();
require('./config.js')(app);
require('./routes')(app);

module.exports = app;

if (!module.parent) {
  // If this script is being run directly, i.e. node server.js then start
  // the server. If we are being required this will not run.
  app.listen(env.PORT || 3000);
  console.log("The magic happens on", env.PORT || 3000);
}

