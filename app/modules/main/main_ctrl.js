angular.module('splendor.main').controller('MainCtrl',
  function ($scope) {
    $scope.init = function(){
      $scope.page = {
        title: 'Splendor'
      };
    };

    $scope.init();
  }
);
