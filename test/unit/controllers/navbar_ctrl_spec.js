'use strict';

describe('NavbarCtrl', function () {
  beforeEach(module('splendor.controllers'));
  beforeEach(module('splendor.test.mocks'));
  
  var $scope, AuthenticationService, $location, $q, clickstream;

  beforeEach(function () {
    module(function ($provide, MockAuthenticationServiceProvider) {
      $provide.provider('AuthenticationService', MockAuthenticationServiceProvider);
    });

    inject(function (CtrlTestRootScope, $controller, _AuthenticationService_, _$location_) {
      $scope = CtrlTestRootScope.$new();
      AuthenticationService = _AuthenticationService_;
      $location = _$location_;

      $controller('NavbarCtrl', {
        '$scope': $scope
      });
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