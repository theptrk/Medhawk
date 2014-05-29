angular.module('drugs', ['drugServices'])

.controller('DrugCtrl', ['$scope', '$rootScope', '$state', 'drugNames', 'drugEffects', '$q', function($scope, $rootScope, $state, drugNames, drugEffects, $q){
  $scope.newEffects = [];

  drugNames.getDrugs().then(function (drugs) {
    $scope.drugs = drugs;
  });

  drugEffects.getEffects().then(function (effects) {
    $scope.effects = effects;
  });

  // Save drug attributes to root scope and navigate to effects page
  $scope.navEffects = function(drug) {
    $rootScope.drugName = drug.name;
    $rootScope.drugCompany = drug.company;
    $rootScope.drugHandle = drug.handle;
    $state.go('drugs.effects');
  };

  // Add custom effect 
  $scope.customEffect = function(effectName) {
    if (_.pluck($scope.effects, 'name').indexOf(effectName) === -1) {
      // add to current list as selected:true
      $scope.effects.push({name: effectName, selected: true});
      // post new effect to effect collection
      $scope.newEffects.push(drugEffects.postEffect({name: effectName}));
    }
  };

  // Save selected effects to root scope and navigate to share page
  $scope.navShare = function() {
    $rootScope.drugEffects = _.filter($scope.effects, function(effect) {
      return effect.selected;
    });

    $q.all($scope.newEffects).then(function () {
      return drugEffects.getEffectsFromDrug($rootScope.drugName);
    }).then(function(effectsFromDrug) {
      return $q.all(_.chain($rootScope.drugEffects)
        .pluck('name')
        .difference(effectsFromDrug)
        .map(function(effectName) {
          return drugEffects.postEffectToDrug({drugName: $rootScope.drugName, effectName: effectName});
        }).value());
    }).then(function() {
      $state.go('share.tweet');
    });
  };

  // Save drug name to root scope and navigate to new drug entry page
  $scope.navNew = function(query) {
    $rootScope.drugName = query || '';
    $state.go('drugs.new');
  };

  // Send new drug information to server and navigate to effects page
  $scope.addDrug = function(name, company, twitter) {
    var drug = {
      name: name,
      company: company,
      handle: twitter
    };

    console.log(drug);
    drugNames.postDrugs(drug).then(function() {
      $scope.navEffects(drug);
    });
  };
}]);
