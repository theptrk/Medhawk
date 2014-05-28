// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', [
  'ionic',
  'drugs',
  'share',
  'user'
  ])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider

    .state('main', {
      url: '/',
      abstract: true,
      templateUrl: 'app/main.html'
    })

    .state('drugs', {
      url: '/drugs',
      abstract: true,
      templateUrl: 'app/main.html'
    })

    .state('drugs.meds', {
      url: '/meds',
      views: {
        'drugs':{
          templateUrl: 'app/drugs/drugs_meds.html',
          controller: 'DrugCtrl'
        }
      }
    })

    .state('drugs.effects', {
      url: '/effects',
      views: {
        'drugs':{
          templateUrl: 'app/drugs/drugs_effects.html',
          controller: 'DrugCtrl'
        }
      }
    })

    .state('drugs.new', {
      url: '/new',
      views: {
        'drugs':{
          templateUrl: 'app/drugs/drugNew.html',
          controller: 'DrugCtrl'
        }
      }
    })

    .state('share', {
      url: '/share',
      abstract: true,
      templateUrl: 'app/main.html'
    })

    .state('share.visual', {
      url: '/visual',
      views: {
        'share':{
          templateUrl: 'app/share/share_visual.html',
          controller: 'ShareCtrl'
        }
      }
    })

    .state('share.tweet', {
      url: '/tweet',
      views: {
        'share': {
          templateUrl: 'app/share/share_tweet.html',
          controller: 'ShareCtrl'
        }
      }
    })

    .state('user', {
      url: '/user',
      abstract: true,
      templateUrl: 'app/main.html'
    })

    .state('user.login', {
      url: '/login',
      views: {
        'user':{
          templateUrl: 'app/user/user_login.html',
          controller: 'UserCtrl'
        }
      }
    })

    .state('user.profile', {
      url: '/profile',
      views: {
        'user': {
          templateUrl: 'app/user/user_profile.html',
          controller: 'UserCtrl'
        }
      }
    })


  $urlRouterProvider.otherwise('/drugs/meds');
})