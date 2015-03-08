angular.module('splendor.controllers').controller('NavbarCtrl',
  function ($scope, $location, AuthenticationService) {
    $scope.init = function(){
      //placeholder
    };

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
