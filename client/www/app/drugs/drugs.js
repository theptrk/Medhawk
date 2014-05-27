angular.module('drugs', ['drugServices'])

.controller('DrugCtrl', ['$scope', '$rootScope', '$state', 'drugNames', 'drugEffects', function($scope, $rootScope, $state, drugNames, drugEffects){
  console.log('This is the DrugCtrl controller');

  $scope.drugs = drugNames;
  $scope.effects = drugEffects;

  $scope.navEffects = function(drugName) {
    $rootScope.drugName = drugName;
    $state.go('drugs.effects');
  };
}]);