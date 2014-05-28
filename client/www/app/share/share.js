angular.module('share', [])

.controller('ShareCtrl', ['$rootScope', '$scope', function($rootScope, $scope){
  console.log('This is the ShareCtrl controller');

  var effects = _.pluck($rootScope.drugEffects, 'name').join(', ');

  $scope.tweetMessage = "I'm taking " + $rootScope.drugName + " and I am experiencing " + effects + " @FDA @" + $rootScope.drugHandle + " #ThisDrugSucks via @Medhawk";
}]);