angular.module('home', ['twitterLib'])

.controller('HomeCtrl', ['$rootScope', '$scope', '$state', 'TwitterLib', function($rootScope, $scope, $state, TwitterLib) {
  $scope.login = function() {
    TwitterLib.init().then(function() {
      $state.go('home.start'); 
    });
  };

  $scope.logout = function() {
    TwitterLib.logOut()
    $state.go('home.login');
  };

  $scope.start = function() {
    $state.go('drugs.meds');
  };
}]);