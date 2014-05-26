var env = require('./env.js');
require('./mongoose');

require('./server.js').listen(env.PORT || 3000);
console.log("The magic happens on", env.PORT || 3000);