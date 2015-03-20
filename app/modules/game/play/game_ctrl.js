angular.module('splendor.game.play').controller('GameCtrl', 
  function ($scope, $location, AuthenticationService, gameId) {
    $scope.init = function () {
      if (!AuthenticationService.isLoggedIn()) {
        $location.path('/login');
        return;
      }

      $scope.page.title = 'Play game';
    };
    $scope.init();
  }
);
