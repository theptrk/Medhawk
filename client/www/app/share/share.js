angular.module('share', [])

.controller('ShareCtrl', ['$rootScope', '$scope', function($rootScope, $scope){
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
}]);