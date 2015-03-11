'use strict';

describe('StartGameCtrl', function () {
  beforeEach(module('splendor.game.management'));
  beforeEach(module('splendor.test.controller.mocks'));

  var $scope, AuthenticationService, GameManagementService, $location, $q;

  beforeEach(function () {
    module(function ($provide, MockAuthenticationServiceProvider) {
      $provide.provider('AuthenticationService', MockAuthenticationServiceProvider);
    });

    inject(function (CtrlTestRootScope, $controller, _AuthenticationService_, _GameManagementService_, _$location_, _$q_) {
      $scope = CtrlTestRootScope.$new();
      AuthenticationService = _AuthenticationService_;
      GameManagementService = _GameManagementService_;
      $location = _$location_;
      $q = _$q_;

      $controller('StartGameCtrl', {
        '$scope': $scope
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

      it('should set the page title to Start a game', function(){
        expect($scope.page.title).toBe('Start a game');
      });

      it('should set numPlayers to 2 ', function () {
        expect($scope.numPlayers).toBe(2);
      });

      it('should set numPlayersChoices to [2,3,4]', function () {
        expect($scope.numPlayersChoices).toEqual([2,3,4]);
      });
    });
  });

  describe('startGame', function () {
    it('should call GameManagementService.startGame and pass in scope.numPlayers', function () {
      $scope.numPlayers = 3;
      spyOn(GameManagementService, 'startGame').and.returnValue($q.defer().promise);
      $scope.startGame();
      expect(GameManagementService.startGame).toHaveBeenCalledWith(3);
    });

    it('should set the path to /games/game.id when starting the game succeeds, where game is the promise response', function () {
      $scope.numPlayers = 3;
      var deferred = $q.defer();
      spyOn(GameManagementService, 'startGame').and.returnValue(deferred.promise);
      var game = {id: 123};
      deferred.resolve(game);
      $scope.startGame();
      $scope.$digest();
      expect($location.path()).toBe('/games/' + game.id);
    });

    it('should set the error message from the promise response when starting the game fails', function(){
      $scope.numPlayers = 5;
      var deferred = $q.defer();
      spyOn(GameManagementService, 'startGame').and.returnValue(deferred.promise);
      var err = 'error';
      deferred.reject(err);
      $scope.startGame();
      $scope.$digest();
      expect($scope.errorMessage).toBe(err);
    });
  });
});