angular.module('drugs', ['drugServices'])

.controller('DrugCtrl', ['$scope', '$rootScope', '$state', 'drugNames', 'drugEffects', function($scope, $rootScope, $state, drugNames, drugEffects){
  drugNames.getDrugs().then(function (drugs) {
    $scope.drugs = drugs;
  });

  drugEffects.getEffects().then(function (effects) {
    $scope.effects = effects;
  });

  $scope.navEffects = function(drugName) {
    $rootScope.drugName = drugName;
    $state.go('drugs.effects');
  };
}]);
