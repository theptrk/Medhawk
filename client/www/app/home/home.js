angular.module('home', [])

.controller('HomeCtrl', ['$rootScope', '$scope', '$state', function($rootScope, $scope, $state) {
  $scope.start = function() {
    $state.go('drugs.meds');
  };
}]);