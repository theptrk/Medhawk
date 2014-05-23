var express = require('express');
var path = require('path');

var env = require('./env.js');

var app = express();

app.use(require('morgan')({format: 'short'}));
app.use(require('body-parser')());
app.use(express.static(path.join(__dirname + '/public')));

require('./config.js')(app);
require('./routes.js')(app);

app.listen(env.PORT || 3000);
console.log("The magic happens on", env.PORT || 3000);
