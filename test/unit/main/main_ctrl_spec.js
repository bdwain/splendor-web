'use strict';

describe('MainCtrl', function () {
  beforeEach(module('splendor.main'));

  var $scope, $location, $rootScope;

  beforeEach(function () {
    inject(function (_$rootScope_, $controller, _$location_) {
      $rootScope = _$rootScope_;
      $scope = $rootScope.$new();
      $location = _$location_;

      $controller('MainCtrl', {
        '$scope': $scope
      });
    });
  });

  describe('on init', function(){
    it('should set $scope.page to have a title', function () {
      $scope.init();
      var expectedPage = {
        title: 'Splendor'
      };
      expect($scope.page).toEqual(expectedPage);
    });
  });
});