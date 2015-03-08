'use strict';

describe('LoginCtrl', function () {
  beforeEach(module('splendor.controllers'));
  beforeEach(module('splendor.test.mocks'));

  var $scope, AuthenticationService, $location;

  beforeEach(function () {
    module(function ($provide, MockAuthenticationServiceProvider) {
      $provide.provider('AuthenticationService', MockAuthenticationServiceProvider);
    });

    inject(function (CtrlTestRootScope, $controller, _AuthenticationService_, _$location_) {
      $scope = CtrlTestRootScope.$new();
      AuthenticationService = _AuthenticationService_;
      $location = _$location_;

      var controller = $controller('LoginCtrl', {
        '$scope': $scope
      });
    });
  });

  describe('init', function(){
    it('should redirect to /home if logged in', function () {
      $location.path('/foo');
      AuthenticationService.loggedIn = true;
      $scope.init();
      expect($location.path()).toBe('/home');
    });

    it('should not redirect if not logged in', function () {
      $location.path('/foo');
      AuthenticationService.loggedIn = false;
      $scope.init();
      expect($location.path()).toBe('/foo');
    });

    it('should set the page title to Log In', function(){
      expect($scope.page.title).toBe('Log In');
    });

    it('should set blank loginData', function () {
      expect($scope.loginData.email).toBe('');
      expect($scope.loginData.password).toBe('');
    });
  });

  describe('login', function () {
    it('should call AuthenticationService.login in login and pass in scope.loginData', function () {
      $scope.loginData = { email: 'email', password: 'password' };
      $scope.login();
      expect(AuthenticationService.loginCtr).toBe(1);
      expect(AuthenticationService.loginData).toBe($scope.loginData);
    });

    it('should set the path to /home when login succeeds', function () {
      AuthenticationService.loginSuccess = true;
      $scope.loginData = {email: 'blah', password: 'meh'};
      $scope.login();
      $scope.$digest();
      expect($location.path()).toBe('/home');
    });
  });
});