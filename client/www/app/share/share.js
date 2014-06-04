angular.module('share', ['config', 'twitterLib'])

.controller('ShareCtrl', ['$rootScope', '$scope', '$http', 'TwitterLib', 'configuration', '$state', function($rootScope, $scope, $http, TwitterLib, configuration, $state){
  var effects = _.pluck($rootScope.drugEffects, "name");
  var effectString = "";
  $scope.hideEmojis = true;
  $scope.emojiFilenames = [
    'agitated.png',
    'angry.png',
    'annoyed.png',
    'batty.png',
    'cold.png',
    'distracted.png',
    'fever.png',
    'gloomy.png',
    'goofy.png',
    'green.png',
    'hopeless.png',
    'hungry.png',
    'manic.png',
    'pessimistic.png',
    'sick.png',
    'sleepy.png',
    'surprised.png',
    'tearful.png',
    'tired.png',
    'worried.png'
  ];

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


  $scope.doLogin = function () {
      TwitterLib.init().then(function (data) {
        $scope.prepareTweet();
          alert(JSON.stringify(data));
      }, function error(error) {
          alert(JSON.stringify(error));
      });
  };

  $scope.doLogout = function () {
      TwitterLib.logOut();
  };
  
  $scope.prepareTweet = function(){

    alert('first');
    var reader = new window.FileReader();
    $http({ method:"GET", url: "http://localhost:3000/emojis/" + $scope.emoji, responseType: "blob"})
      .success(function(data){
        reader.readAsDataURL(data);
        reader.onloadend = function() {

          alert('onloadend');
          var base64data = reader.result;
          base64data = base64data.split(",");
          base64data = base64data[1];                  
          $scope.doTweet( base64data );
        };

      });
  };
  $scope.doTweet = function (picture) {
    TwitterLib.tweet("$scope.tweetMessage", picture).then(function (data) {
        alert("tweet success");
        console.log(data);
        alert(data);
    }, function (error) {
        console.log("tweet error" + JSON.stringify(error));
    });
  };


  $scope.attachEmoji = function(filename) {
    $rootScope.emoji = filename;
    $scope.hideEmojis = true;
    $state.go('share.tweet');
  };

  $scope.toggleEmoji = function() {
    $scope.hideEmojis = !$scope.hideEmojis;
  };
}]);