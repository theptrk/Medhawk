angular.module('config', [])

.factory('configuration', function (){
  return {
    SERVERPATH: 'http://localhost:4000',
    APPKEY: 'TestKey'
  };
});