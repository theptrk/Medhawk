angular.module('drugServices', ['config', 'httpUtility'])

.factory('_makeRequesters', ['httpPromise', 'configuration', function(httpPromise, configuration) {
  var makeGetter = function (path) {
    return function () {
      return httpPromise({
        url: configuration.SERVERPATH + path,
        params: { appKey: configuration.APPKEY }
      });
    };
  };

  var makeSetter = function (path) {
    return function (data) {
      return httpPromise({
        url: configuration.SERVERPATH + path,
        method: 'POST',
        data: _.extend({
          appKey: configuration.APPKEY,
        }, data),
        headers: {
          ContentType: 'application/json'
        }
      });
    };
  };

  return {
    makeGetter: makeGetter,
    makeSetter: makeSetter
  };
}])

.factory('drugEffects', ['_makeRequesters', function(_makeRequesters) {
  return {
    getEffects: _makeRequesters.makeGetter('/effects'),
    postEffect: _makeRequesters.makeSetter('/effects/post'),
  };
}])

.factory('drugNames', ['_makeRequesters', function(_makeRequesters) {
  return {
    getDrugs: _makeRequesters.makeGetter('/drugs'),
    postDrugs: _makeRequesters.makeSetter('/drugs/post')
  };
}]);

