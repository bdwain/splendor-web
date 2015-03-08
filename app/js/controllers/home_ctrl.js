angular.module('splendor.controllers').controller('HomeCtrl', function ($scope) {
  $scope.init = function () {
    $scope.page.title = 'Home';
  };
  
  $scope.init();
});
