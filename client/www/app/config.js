angular.module('config', [])

.factory('configuration', function (){
  return {
    SERVERPATH: 'http://10.4.28.247:3000',
    APPKEY: 'TestKey',
    oauthSettings: {
      consumerKey: 'hG5JkrDkarl5cPmjc94Lwsu7a',
      consumerSecret: '3s0oxghx1yQ21ag8r7R5KnOVWRJXuXHsjJvjCmdJRxj20FKUIv',
      requestTokenUrl: 'https://api.twitter.com/oauth/request_token',
      authorizationUrl: "https://api.twitter.com/oauth/authorize",
      accessTokenUrl: "https://api.twitter.com/oauth/access_token",
      callbackUrl: "callbackUrl"
    }
  };
});