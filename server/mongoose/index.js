var mongoose = require('mongoose');
var env = require('../env.js');

mongoose.connect(env.MONGOPATH || 'mongodb://localhost/medhawk');
