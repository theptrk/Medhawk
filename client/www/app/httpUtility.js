angular.module('httpUtility', [])

.factory('httpPromise', function ($http, $q) {
  return function (opts) {
    var defer = $q.defer();
    $http(_.extend({
      method: 'GET',
      success: defer.resolve.bind(defer),
      error: defer.reject.bind(defer)
    }, opts));
    return defer.promise;
  };
});
