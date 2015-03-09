angular.module('splendor.navbar').controller('NavbarCtrl',
  function ($scope, $location, AuthenticationService) {
    $scope.init = function(){
      $scope.isLoggedIn = AuthenticationService.isLoggedIn();
    };

    $scope.$on('$locationChangeSuccess', function(){
      $scope.isLoggedIn = AuthenticationService.isLoggedIn();
    });

    $scope.logout = function () {
      AuthenticationService.logout();
      $location.path('/login');
    };

    $scope.getActiveTabCss = function(path){      
      return $location.path() === '/' + path ? 'active' : '';
    };

    $scope.init();
  }
);
