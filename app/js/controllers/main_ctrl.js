angular.module('splendor.controllers').controller('MainCtrl',
  function ($scope, $location, AuthenticationService) {
    function checkAuthentication(){
      $scope.isLoggedIn = AuthenticationService.isLoggedIn();
    }

    $scope.init = function(){
      checkAuthentication();

      $scope.page = {
        title: 'Splendor'
      };
    };

    $scope.$on('$locationChangeSuccess', function () {
      checkAuthentication();
    });

    $scope.init();
  }
);
