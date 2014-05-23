var express = require('express');
var env = require('./env.js');

var app = express();
require('./config.js')(app);
require('./routes.js')(app);

app.listen(env.PORT || 3000);
console.log("The magic happens on", env.PORT || 3000);
