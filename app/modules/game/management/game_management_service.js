angular.module('splendor.game.management').factory('GameManagementService',
  function ($http, $q, apiUrl) {
    return {
      startGame: function (numPlayers) {
        var deferred = $q.defer();
        $http.post(apiUrl + 'games', {game: {num_players: numPlayers}})
          .success(function (game) {
            deferred.resolve(game);
          }).error(function (err) {
            deferred.reject(err.message);
          });

        return deferred.promise;
      }
    };
  }
);
