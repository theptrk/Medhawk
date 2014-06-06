angular.module('share', ['config', 'twitterLib'])

.controller('ShareCtrl', ['$rootScope', '$scope', '$http', 'TwitterLib', 'configuration', '$state', function($rootScope, $scope, $http, TwitterLib, configuration, $state){
  var effects = _.pluck($rootScope.drugEffects, "name");
  var effectString = "";
  $scope.loading = false;
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

  $scope.tags = {
    '@US_FDA': false,
    '#ThisDrugSucks': false
  };

  $scope.tags['@' + $rootScope.drugHandle] = false;

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

  $scope.tweetMessage = {
    message: "I'm taking " + $rootScope.drugName + " and I'm experiencing " + effectString + " via @Medhawk"
  };

  $scope.doLogin = function () {
    TwitterLib.init();
    $scope.prepareTweet();
  };

  $scope.doLogout = function () {
      TwitterLib.logOut();
  };
  
  $scope.prepareTweet = function(){
    if ( $rootScope.emoji === undefined ) {
      $scope.doTweet();
    } else {
      $http({
        method:"GET",
        url: configuration.SERVERPATH + "/emojis/" + $scope.emoji,
        responseType: "blob"
      }).success(function(data){
        var reader = new FileReader();
        reader.onloadend = function() { $scope.doTweet(reader.result.split(",")[1]); };
        reader.readAsDataURL(data);
      });
    }
  };

  $scope.doTweet = function (picture) {
    $scope.loading = true;
    TwitterLib.tweet($scope.tweetMessage.message, picture).then(function (/* success */) {
      function alertDismissed() {
        console.log('tweet successful');
        $state.go('home.start');
      }
      $scope.loading = false;
      navigator.notification.alert(
          'Thanks for sharing',  // message
          alertDismissed,         // callback
          'Tweet Successful!',     // title
          'Done'                  // buttonName
      );
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