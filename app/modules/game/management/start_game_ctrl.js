angular.module('splendor.game.management').controller('StartGameCtrl', 
  function ($scope, $location, AuthenticationService, GameManagementService) {
    $scope.init = function () {
      if (!AuthenticationService.isLoggedIn()) {
        $location.path('/login');
        return;
      }

      $scope.page.title = 'Start a game';

      $scope.numPlayers = 2;
      $scope.numPlayersChoices = [2,3,4];
    };
    
    $scope.startGame = function(){
      GameManagementService.startGame($scope.numPlayers).then(
        function (game) {
          $location.path('/games/' + game.id);
        },
        function (err) {
          $scope.errorMessage = err;
        }
      );
    };
    $scope.init();
  }
);
