/**
* Credit to the OpenFB Library for code base
*    https://github.com/ccoenraets/sociogram-angular-ionic
*    
* Credit to Aaron Saunders @aaronksaunders for adapting to twitter
*/
angular.module('twitterLib', ['config'])

  .factory('TwitterLib', function ($rootScope, $q, $window, $http, configuration) {
                        // configuration is currently a "constant" set in a public file "share.js"
    // GLOBAL VARS
    var runningInCordova = false;
    var loginWindow;


    // Construct the callback URL for when running in browser
    var index = document.location.href.indexOf('index.html');
    var callbackURL = document.location.href.substring(0, index) + 'oauthcallback.html';

    var oauth;

    // data: Twitter CONSUMER_KEY, Twitter CONSUMER_SECRET
    var options;

    //TODO: Properly import the oauthSettings from a "secrets.js" file
    options = angular.extend({}, configuration.oauthSettings);
    options = angular.extend(options, {
        callbackUrl: callbackURL
    });

    // You have to replace it on one more place // TODO set a better key
    var twitterKey = "TWITTER_SECRET_KEY"; // This key is used for storing Information related

    
    // Check if we are running in phonegap/cordova
    $window.document.addEventListener("deviceready", function () {
        runningInCordova = true;

        callbackURL = configuration.oauthSettings.callbackUrl;
        options.callbackUrl = callbackURL;
    }, false);

    function byteArrayToString(byteArray) {
      var string = '', l = byteArray.length, i;
      for (i = 0; i < l; i++) {
          string += String.fromCharCode(byteArray[i]);
      }
      return string;
    }

    
    var Twitter = {

      init: function () {

        var deferredLogin = $q.defer();

        /**
         *  the event handler for processing load events for the oauth process
         */
        var doLoadstart = function (event) {
          console.log("in doLoadstart " + event.url);
          var url = event.url;
          Twitter.inAppBrowserLoadHandler(url, deferredLogin);
        };
        
        /**
         *  the event handler for processing exit events for the oauth process
         */
        var doExit = function (event) {
          // Handle the situation where the user closes the login window manually
          // before completing the login process
          console.log(JSON.stringify(event));
          deferredLogin.reject({error: 'user_cancelled',
              error_description: 'User cancelled login process',
              error_reason: "user_cancelled"
          });
        };

        var openAuthoriseWindow = function (_url) {

          loginWindow = $window.open(_url, '_blank', 'location=no');

          if (runningInCordova) {
            loginWindow.addEventListener('loadstart', doLoadstart);
          } else {
            // this saves the promise value in the window when running in the browser
            window.deferredLogin = deferredLogin; // mostly out of scope for project
          }
        };

        var failureHandler = function () {
          console.log("ERROR: " + JSON.stringify(error));
          deferredLogin.reject({error: 'user_cancelled', error_description: error });
        };

        // Apps storedAccessData , Apps Data in Raw format
        var storedAccessData, rawData = localStorage.getItem(twitterKey);
        
        // here we are going to check whether the data about user is already with us.
        if (localStorage.getItem(twitterKey) !== null) {

          Twitter.verify(deferredLogin);

        } else {
          // we have no data of saved user
          oauth = OAuth(options);
          oauth.fetchRequestToken(openAuthoriseWindow, failureHandler);
        }
        
        return deferredLogin.promise;
      }, // <=== init ===>

      /**
       *  When inAppBrowser's URL changes we will track it here.
       *  We will also be acknowledged was the request is a successful or unsuccessful
       *
       @param _url - url received from the event
       @param _deferred - promise associated with login process
       */
      inAppBrowserLoadHandler: function (_url, _deferred) {

        /**
         * Sucessfully receive the access tokens
         */
        var successHandler = function (_args) {
          console.log(_args);
          // Saving token of access in Local_Storage

          var accessData = {};
          accessData.accessTokenKey = oauth.getAccessToken()[0];
          accessData.accessTokenSecret = oauth.getAccessToken()[1];

          // Configuring Apps LOCAL_STORAGE
          console.log("TWITTER: Storing token key/secret in localStorage");
          
          // ????? Where is $window.localStorage? ==============================

          $window.localStorage.setItem(twitterKey, JSON.stringify(accessData));
          // ====================== FIXED ==============================
          Twitter.verify(_deferred);

        };

        var failureHandler = function (_args) {
            console.log("ERROR - oauth_verifier: " + JSON.stringify(_args));
            _deferred.reject({error: 'user_cancelled', error_description: _args });
        };

        console.log("callbackURL " + callbackURL);
        // ====================== FIXED ==============================
        if (_url.indexOf('oauth_verifier') >= 0) {

          loginWindow.close();

          // Parse the returned URL
          var params, verifier = '';
          params = _url.substr(_url.indexOf('?') + 1);

          params = params.split('&');
          for (var i = 0; i < params.length; i++) {
            var paramKey = params[i].split('=');

            if (paramKey[0] === 'oauth_verifier') {
                verifier = paramKey[1];
            }
          }
          oauth.setVerifier(verifier);
          oauth.fetchAccessToken(successHandler, failureHandler);
        }
      }, // <=== inAppBrowserLoadHandler ===>

      
      /**
       * Verify the user and store the credentials if needed
       */
      verify: function (_deferred) {
        var deferred = _deferred || $q.defer();
        var storedAccessData, rawData = $window.localStorage.getItem(twitterKey);
        storedAccessData = JSON.parse(rawData);

        // jsOAuth will take care of else for app; we need to send only the options
        oauth = oauth || OAuth(options);

        oauth.setAccessToken([storedAccessData.accessTokenKey, storedAccessData.accessTokenSecret]);

        oauth.get('https://api.twitter.com/1.1/account/verify_credentials.json?skip_status=true',
          function (data) {
            // Set $rootScope data to the text version of all data sent back from server
            $rootScope.data = JSON.parse(data.text);
            deferred.resolve($rootScope.data);
          }, function (error) {
            deferred.reject(error);
          }
        );

        return deferred.promise;
      },

      /**
       * Send to twitter window
       * @param  {[string]} message
       * @param  {[base 64 encoded image]} media
       */
      tweet: function (message, media) {
        return Twitter.verify().then(function () {
          var cb = new Codebird();
          cb.setConsumerKey("hG5JkrDkarl5cPmjc94Lwsu7a", "3s0oxghx1yQ21ag8r7R5KnOVWRJXuXHsjJvjCmdJRxj20FKUIv");
          cb.setToken(oauth.getAccessToken()[0], oauth.getAccessToken()[1]);

          if (media !== undefined) {
            var deferred = $q.defer();
            cb.__call(
              "statuses_updateWithMedia", {
                'status': message,
                'trim_user': 'true',
                'media[]': media
              }, function (reply) { // cb from cb
                console.log(reply);
                deferred.resolve(reply);
              });
            return deferred.promise;
          } else {
            return Twitter.apiPostCall({
              url: 'https://api.twitter.com/1.1/statuses/update.json',
              params: {
                'status': message,
                'trim_user': 'true',
              }
            });
          }

        }, function (error) {
          deferred.reject(JSON.parse(error.text));
        });
      },

      /**
       * uses oAuth library to make a GET call
       *
       * @param _options.url
       * @param _options.params
       */
      apiGetCall: function (_options) {
        var deferred = $q.defer();

        // Javascript OAuth will use built in functionality, we need to send only the options
        oauth = oauth || OAuth(options);

        var _reqOptions = angular.extend({}, _options);

        _reqOptions = angular.extend(_reqOptions, {
          success: function (data) {
            deferred.resolve(JSON.parse(data.text));
          },
          failure: function (error) {
            deferred.reject(JSON.parse(error.text));
          }
        });

        oauth.request(_reqOptions);
        return deferred.promise;
      },

      /**
       * tweet uses oAuth library to make a POST call
       *
       * @param _options.url
       * @param _options.params
       */
      apiPostCall: function (_options) {
        var deferred = $q.defer();
        oauth = oauth || OAuth(options);
        oauth.post(_options.url, _options.params,
          function (data) {
            deferred.resolve(JSON.parse(data.text));
          }, function (error) {
            deferred.reject(JSON.parse(error.text));
          }
        );
        return deferred.promise;
      },

      /**
       * clear out the tokens stored in local storage
       */
      logOut: function () {
          $window.localStorage.removeItem(twitterKey);
          options.accessTokenKey = null;
          options.accessTokenSecret = null;
          console.log("Please authenticate to use this app");
      }

    };

    return Twitter;
  });

/**
* @see oauthcallback.html for additional information
*
* @param url
*/
function oauthCallback(url) {
  var injector = angular.element(document.getElementById('main')).injector();
  injector.invoke(function (TwitterLib) {
      TwitterLib.inAppBrowserLoadHandler(url, false);
  });
}