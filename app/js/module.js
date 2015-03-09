var app = angular.module('splendor', [
  'ngRoute',
  'ui.bootstrap',
  'splendor.main',
  'splendor.authentication',
  'splendor.home',
  'splendor.navbar',
  'splendor.registration'
]);

app.config(function ($routeProvider, $locationProvider) {
  $routeProvider.
    when('/', {
      templateUrl: 'partials/home.html',
      controller: 'HomeCtrl'
    }).
    when('/login', {
      templateUrl: 'partials/login.html',
      controller: 'LoginCtrl'
    }).
    when('/register', {
      templateUrl: 'partials/registration.html',
      controller: 'RegistrationCtrl'
    }).
    otherwise({
      redirectTo: '/'
    });

  $locationProvider.html5Mode(true);
});