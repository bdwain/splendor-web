'use strict';

describe('MainCtrl', function () {
  beforeEach(module('splendor.controllers'));
  beforeEach(module('splendor.test.mocks'));

  var $scope, AuthenticationService, $location, $rootScope;

  beforeEach(function () {
    module(function ($provide, MockAuthenticationServiceProvider) {
      $provide.provider('AuthenticationService', MockAuthenticationServiceProvider);
    });

    inject(function (_$rootScope_, $controller, _AuthenticationService_, _$location_) {
      $rootScope = _$rootScope_;
      $scope = $rootScope.$new();
      AuthenticationService = _AuthenticationService_;
      $location = _$location_;

      $controller('MainCtrl', {
        '$scope': $scope
      });
    });
  });

  function checkAuthenticationBehavior(methodUnderTest){
    it('should set $scope.isLoggedIn to the value from AuthenticationService.isLoggedIn', function () {
      AuthenticationService.loggedIn = false;
      methodUnderTest();
      expect($scope.isLoggedIn).toBe(false);
      AuthenticationService.loggedIn = true;
      methodUnderTest();
      expect($scope.isLoggedIn).toBe(true);
    });
  }

  describe('on init', function(){
    checkAuthenticationBehavior(function(){
      $scope.init();
    });

    it('should set $scope.page to have a title', function () {
      AuthenticationService.loggedIn = true;
      $scope.init();
      var expectedPage = {
        title: 'Splendor'
      };
      expect($scope.page).toEqual(expectedPage);
    });
  });

  describe('on $locationChangeSuccess', function(){
    checkAuthenticationBehavior(function(){
      $rootScope.$broadcast('$locationChangeSuccess');
    });
  });
});