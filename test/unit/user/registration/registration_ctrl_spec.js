'use strict';

describe('RegistrationCtrl', function () {
  beforeEach(module('splendor.user.registration'));
  beforeEach(module('splendor.test.mocks'));

  var $scope, RegistrationService, AuthenticationService, $location, $q;

  beforeEach(function () {
    module(function ($provide, MockAuthenticationServiceProvider) {
      $provide.provider('AuthenticationService', MockAuthenticationServiceProvider);
    });

    inject(function (CtrlTestRootScope, $controller, _AuthenticationService_, _RegistrationService_, _$location_, _$q_) {
      $scope = CtrlTestRootScope.$new();
      AuthenticationService = _AuthenticationService_;
      RegistrationService = _RegistrationService_;
      $location = _$location_;
      $q = _$q_;

      $controller('RegistrationCtrl', {
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
        spyOn(RegistrationService, 'register').and.returnValue($q.defer().promise);
        $scope.register();
        expect(RegistrationService.register).not.toHaveBeenCalled();
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
      var deferred;
      beforeEach(function(){
        $scope.registrationData.password = 'foo';
        $scope.passwordConfirmation = 'foo';

        deferred = $q.defer();
        spyOn(RegistrationService, 'register').and.returnValue(deferred.promise);
      });

      it('should call RegistrationService.register and pass in scope.registrationData', function () {
        $scope.register();
        expect(RegistrationService.register).toHaveBeenCalledWith($scope.registrationData);
      });

      it('should set success to true and a proper message on success', function () {
        var msg = 'msg';
        deferred.resolve(msg);
        $scope.register();
        $scope.$digest();
        expect($scope.success).toBe(true);
        expect($scope.message).toBe(msg);
      });

      it('should set success to false and set message to the promise rejection string on error', function () {
        var err = 'errors';
        deferred.reject(err);
        $scope.register();
        $scope.$digest();
        expect($scope.success).toBe(false);
        expect($scope.message).toBe(err);
      });
    });
  });
});