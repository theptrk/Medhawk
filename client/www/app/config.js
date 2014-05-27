angular.module('config', [])

.factory('configuration', function (){
  return {
    SERVERPATH: 'http://localhost:3000',
    APPKEY: 'TestKey'
  };
});