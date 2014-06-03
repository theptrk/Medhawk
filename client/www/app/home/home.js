angular.module('home', [])

.controller('HomeCtrl', ['$rootScope', '$scope', function($rootScope, $scope) {
  $scope.start = function() {
    $state.go('drugs.meds');
  };
}]);