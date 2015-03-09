angular.module('splendor.registration').controller('RegistrationCtrl', 
  function($scope, RegistrationService, AuthenticationService, $location) {
    $scope.init = function(){      
      if(AuthenticationService.isLoggedIn()){
        $location.path('/');
        return;
      }

      $scope.page.title = 'Sign Up';

      $scope.registrationData = {
        email: '',
        password: ''
      };

      $scope.passwordConfirmation = '';
      
      $scope.message = '';
      $scope.success = false;
    };

    $scope.register = function () {
      if($scope.registrationData.password !== $scope.passwordConfirmation){
        $scope.message = 'Your passwords don\'t match.';
        $scope.success = false;
        return;
      }

      RegistrationService.register($scope.registrationData).then(
        function () {
          $scope.message = 'Please check your email to confirm your account.';
          $scope.success = true;
        },
        function (err) {
          $scope.message = err;
          $scope.success = false;
        }
      );
    };

    $scope.init();
  }
);
