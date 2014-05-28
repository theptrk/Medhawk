angular.module('drugs', ['drugServices'])

.controller('DrugCtrl', ['$scope', '$rootScope', '$state', 'drugNames', 'drugEffects', function($scope, $rootScope, $state, drugNames, drugEffects){
  drugNames.getDrugs().then(function (drugs) {
    $scope.drugs = drugs;
  });

  drugEffects.getEffects().then(function (effects) {
    $scope.effects = _.extend(effects, { selected: false });
  });

  // Save drug attributes to root scope and navigate to effects page
  $scope.navEffects = function(drug) {
    $rootScope.drugName = drug.name;
    $rootScope.drugCompany = drug.company;
    $rootScope.drugHandle = drug.handle;
    $state.go('drugs.effects');
  };

  // Add custom effect 
  // Save selected effects to root scope and navigate to share page
  $scope.navShare = function() {
    $rootScope.drugEffects = _.filter($scope.effects, function(effect) {
      return effect.selected;
    });
    $state.go('share.tweet');
  };
}]);
