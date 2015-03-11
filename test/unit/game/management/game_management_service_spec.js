'use strict';

describe('GameManagementService', function () {
  beforeEach(module('splendor.game.management'));

  var GameManagementService, httpBackend, apiUrl;

  beforeEach(function () {
    inject(function (_GameManagementService_, $httpBackend, _apiUrl_) {
      GameManagementService = _GameManagementService_;
      httpBackend = $httpBackend;
      apiUrl = _apiUrl_;
    });
  });

  afterEach(function () {
    httpBackend.verifyNoOutstandingExpectation();
    httpBackend.verifyNoOutstandingRequest();
  });

  describe('startGame', function(){
    it('should post the game data to the POST games endpoint', function(){
      var numPlayers = 2;
      httpBackend.expectPOST(apiUrl + 'games', {game: {num_players: numPlayers}}).respond(200);
      GameManagementService.startGame(numPlayers);
      httpBackend.flush();
    });

    it('should return the game data on success', function () {
      var result = {message: 'foo'};
      var numPlayers = 2;
      httpBackend.whenPOST(apiUrl + 'games', {game: {num_players: numPlayers}}).respond(200, result);
      GameManagementService.startGame(numPlayers).then(function(response){
        expect(response).toEqual(result);
      });
      httpBackend.flush();
    });

    it('should pass along the error message on error', function () {
      var err = {message: 'err'};
      var numPlayers = 2;
      httpBackend.whenPOST(apiUrl + 'games', {game: {num_players: numPlayers}}).respond(400, err);
      GameManagementService.startGame(numPlayers).then(function(response){
        expect(true).toBe(false);
      }, function(error){
        expect(error).toBe(err.message);
      });
      httpBackend.flush();
    });
  });
});
