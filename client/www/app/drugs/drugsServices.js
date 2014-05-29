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

.factory('drugEffects', ['_makeRequesters', 'httpPromise', 'configuration', function(_makeRequesters, httpPromise, configuration) {
  var getEffectsFromDrug = function(drugName) {
    return httpPromise({
      url: configuration.SERVERPATH + '/effects/fromDrug',
      params: { appKey: configuration.APPKEY, drugName: drugName }
    });
  };

  return {
    getEffects: _makeRequesters.makeGetter('/effects'),
    postEffect: _makeRequesters.makeSetter('/effects/post'),
    getEffectsFromDrug: getEffectsFromDrug,
    postEffectToDrug: _makeRequesters.makeSetter('/effects/postToDrug')
  };
}])

.factory('drugNames', ['_makeRequesters', function(_makeRequesters) {
  return {
    getDrugs: _makeRequesters.makeGetter('/drugs'),
    postDrugs: _makeRequesters.makeSetter('/drugs/post')
  };
}])

.factory('sanitizer', function() {
  return {
    sanitizeName: function(name) {
      return name
        .trim()
        .replace(/\s+/g, ' ')
        .replace(/^\w|-\w| \w/g, function(match) { return match.toUpperCase(); });
    },
    sanitizeTwitter: function(handle) {
      handle = handle.replace(/\s/g, '');
      return handle[0] === '@' ? handle : '@' + handle;
    }
  }
});

