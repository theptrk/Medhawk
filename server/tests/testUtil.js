var q = require('q');
var http = require('http');

module.exports.postData = function (res) {
  var defer = q.defer();
  var data = '';

  res.on('data', function (chunk) {
    data += chunk;
  });

  res.on('end', function () {
    defer.resolve(data);
  });

  return defer.promise;
};
