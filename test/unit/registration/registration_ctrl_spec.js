'use strict';

describe('RegistrationCtrl', function () {
  beforeEach(module('splendor.registration'));
  beforeEach(module('splendor.test.mocks'));

  var $scope, RegistrationService, AuthenticationService, $location;

  beforeEach(function () {
    module(function ($provide, MockAuthenticationServiceProvider, MockRegistrationServiceProvider) {
      $provide.provider('AuthenticationService', MockAuthenticationServiceProvider);
      $provide.provider('RegistrationService', MockRegistrationServiceProvider);
    });

    inject(function (CtrlTestRootScope, $controller, _AuthenticationService_, _RegistrationService_, _$location_) {
      $scope = CtrlTestRootScope.$new();
      AuthenticationService = _AuthenticationService_;
      RegistrationService = _RegistrationService_;
      $location = _$location_;

      var controller = $controller('RegistrationCtrl', {
        '$scope': $scope
      });
    });
  });

  describe('init', function(){
    it('should set the page title to Sign Up', function(){
      expect($scope.page.title).toBe('Sign Up');
    });

    it('should redirect to / if logged in', function () {
      $location.path('/foo');
      AuthenticationService.loggedIn = true;
      $scope.init();
      expect($location.path()).toBe('/');
    });

    it('should not redirect if not logged in', function () {
      $location.path('/foo');
      AuthenticationService.loggedIn = false;
      $scope.init();
      expect($location.path()).toBe('/foo');
    });

    it('should set blank registrationData', function () {
      expect($scope.registrationData.email).toBe('');
      expect($scope.registrationData.password).toBe('');
    });

    it('should set blank password confirmation', function(){
      expect($scope.passwordConfirmation).toBe('');
    });

    it('should set message to blank', function(){
      expect($scope.message).toBe('');
    });

    it('should set success to false', function(){
      expect($scope.success).toBe(false);
    });
  });

  describe('register', function () {
    describe('when the password and password confirmation don\'t match', function(){
      beforeEach(function(){
        $scope.registrationData.password = 'foo';
        $scope.passwordConfirmation = 'bar';
      });

      it('shouldn\'t call registrationservice.register', function(){
        $scope.register();
        expect(RegistrationService.registerCtr).toBe(0);
      });

      it('should set success to false and the proper error message ', function(){
        $scope.success = true;
        $scope.message = '';
        $scope.register();
        expect($scope.success).toBe(false);
        expect($scope.message).toBe('Your passwords don\'t match.')
      });
    });

    describe('when the password and confirmation do match', function(){
      beforeEach(function(){
        $scope.registrationData.password = 'foo';
        $scope.passwordConfirmation = 'foo';
      });

      it('should call RegistrationService.register and pass in scope.registrationData', function () {
        $scope.register();
        expect(RegistrationService.registerCtr).toBe(1);
        expect(RegistrationService.registerData).toBe($scope.registrationData);
      });

      it('should set success to true and a proper message on success', function () {
        RegistrationService.registerSuccess = true;
        $scope.register();
        $scope.$digest();
        expect($scope.success).toBe(true);
        expect($scope.message).toBe('Please check your email to confirm your account.');
      });

      it('should set success to false and set message to the promise rejection string on error', function () {
        RegistrationService.registerSuccess = false;
        $scope.register();
        $scope.$digest();
        expect($scope.success).toBe(false);
        expect($scope.message).toBe('error');
      });
    });
  });
});