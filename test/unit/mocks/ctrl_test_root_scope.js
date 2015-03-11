//this returns a scope that represents a child scope of MainCtrl, which all other controllers inherit from. It should be used when testing 
//all controllers other than MainCtrl
'use strict';

angular.module('splendor.test.controller.mocks').factory('CtrlTestRootScope', function($rootScope){
  var scope = $rootScope.$new();
  scope.page = {
    title: 'title'
  };
  
  return scope;
});