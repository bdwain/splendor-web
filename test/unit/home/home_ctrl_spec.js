'use strict';

describe('HomeCtrl', function(){
  beforeEach(module('splendor.home'));
  beforeEach(module('splendor.test.mocks'));
  
  var $scope;

  beforeEach(function () {
    inject(function (CtrlTestRootScope, $controller) {
      $scope = CtrlTestRootScope.$new();

      var controller = $controller('HomeCtrl', {
        '$scope': $scope
      });
    });
  });

  describe('init', function () {
    it('should set the page title', function () {
      expect($scope.page.title).toBe('Home');
    });
  });
});