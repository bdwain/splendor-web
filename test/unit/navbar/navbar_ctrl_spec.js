'use strict';

describe('NavbarCtrl', function () {
  beforeEach(module('splendor.navbar'));
  beforeEach(module('splendor.test.mocks'));
  
  var $scope, $rootScope, AuthenticationService, $location, $q;

  beforeEach(function () {
    module(function ($provide, MockAuthenticationServiceProvider) {
      $provide.provider('AuthenticationService', MockAuthenticationServiceProvider);
    });

    inject(function (_$rootScope_, CtrlTestRootScope, $controller, _AuthenticationService_, _$location_) {
      $scope = CtrlTestRootScope.$new();
      $rootScope = _$rootScope_;
      AuthenticationService = _AuthenticationService_;
      $location = _$location_;

      $controller('NavbarCtrl', {
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
  });

  describe('on $locationChangeSuccess', function(){
    checkAuthenticationBehavior(function(){
      $rootScope.$broadcast('$locationChangeSuccess');
    });
  });

  describe('logout', function () {
    it('should call AuthenticationService.logout in logout', function () {
      $scope.logout();
      expect(AuthenticationService.logoutCtr).toBe(1);
    });

    it('should set the path to /login immediately', function () {
      $location.path('/foo');
      $scope.logout();
      expect($location.path()).toBe('/login');
    });
  });

  describe('getActiveTabCss', function(){
    it('should return active if and only if the current location.path matches the passed in path', function(){
      $location.path('/foo');
      expect($scope.getActiveTabCss('foo')).toBe('active');
      expect($scope.getActiveTabCss('bar')).toBe('');
    });
  });
});