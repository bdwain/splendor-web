angular.module('splendor.home').controller('HomeCtrl', function ($scope) {
  $scope.init = function () {
    $scope.page.title = 'Home';
  };
  
  $scope.init();
});
