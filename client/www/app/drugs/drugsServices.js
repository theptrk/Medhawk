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
        type: 'POST',
        params: _.extend({
          appKey: configuration.APPKEY,
        }, data)
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
    postEffect: _makeRequesters.makeSetter('/effects') 
  };
}])

.factory('drugNames', ['_makeRequesters', function(_makeRequesters) {
  return {
    getDrugs: _makeRequesters.makeGetter('/drugs'),
    postDrugs: _makeRequesters.makeSetter('/drugs')
  };
}]);

