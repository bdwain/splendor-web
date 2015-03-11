angular.module('splendor.authentication').controller('LoginCtrl',
  function ($scope, AuthenticationService, $location) {
    $scope.init = function () {
      if (AuthenticationService.isLoggedIn()) {
        $location.path('/');
        return;
      }
      
      $scope.page.title = 'Log In';

      $scope.loginData = {
        email: '',
        password: ''
      };
      $scope.errorMessage = '';
    };

    $scope.init();

    $scope.login = function () {
      AuthenticationService.login($scope.loginData).then(
        function () {
          $location.path('/');
        },
        function (err) {
          $scope.errorMessage = err;
        }
      );
    };
  }
);
