var express = require('express');
var env = require('./env.js');

var app = express();
require('./config.js')(app);
require('./routes.js')(app);

module.exports = app;