angular.module('share', ['config', 'twitterLib'])

.controller('ShareCtrl', ['$rootScope', '$scope', '$http', 'TwitterLib', 'configuration', function($rootScope, $scope, $http, TwitterLib, configuration){
  var effects = _.pluck($rootScope.drugEffects, "name");
  var effectString = "";

  if (effects.length === 1) {
    effectString = effects[0];
  } else if (effects.length === 2) {
    effectString = effects[0] + " and " + effects[1];
  } else {
    _.each(effects, function (effect, index) {
      if (effects.length - 1 === index) {
        effectString += "and " + effect;
      } else {
        effectString += effect + ", ";
      }
    });
  }

  $scope.tweetMessage = "I'm taking " + $rootScope.drugName + " and I'm experiencing " + effectString + 
    ". @FDA " + $rootScope.drugHandle +
    " #ThisDrugSucks via @Medhawk";

  $scope.doLogin = function(){
    TwitterLib.init();
  };

  $scope.doTweet = function() {
    TwitterLib.tweet($scope.tweetMessage).then(function(_data) {
      alert("tweet success");
      console.log(_data);
      alert(_data);

    }, function(_error) {
      console.log("tweet error" + JSON.stringify(_error));
    });
  };
}]);