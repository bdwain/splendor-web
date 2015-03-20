'use strict';

describe('GameCtrl', function () {
  beforeEach(module('splendor.game.play'));
  beforeEach(module('splendor.test.controller.mocks'));

  var $scope, AuthenticationService, $location, gameId;


  beforeEach(function () {
    gameId = '1';
    module(function ($provide, MockAuthenticationServiceProvider) {
      $provide.provider('AuthenticationService', MockAuthenticationServiceProvider);
    });

    inject(function (CtrlTestRootScope, $controller, _AuthenticationService_, _$location_) {
      $scope = CtrlTestRootScope.$new();
      AuthenticationService = _AuthenticationService_;
      $location = _$location_;

      $controller('GameCtrl', {
        $scope: $scope,
        gameId: gameId
      });
    });
  });

  describe('init', function(){
    describe('when not logged in', function(){
      it('should redirect to /login', function () {
        $location.path('/foo');
        AuthenticationService.loggedIn = false;
        $scope.init();
        expect($location.path()).toBe('/login');
      });
    });

    describe('when logged in', function(){
      beforeEach(function(){
        AuthenticationService.loggedIn = true;
        $scope.init();
      });

      it('should not redirect', function () {
        $location.path('/foo');
        AuthenticationService.loggedIn = true;
        $scope.init();
        expect($location.path()).toBe('/foo');
      });

      it('should set the page title to Play game', function(){
        expect($scope.page.title).toBe('Play game');
      });
    });
  });
});