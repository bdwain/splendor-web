var app = angular.module('splendor', [
  'ngRoute',
  'ui.bootstrap',
  'splendor.main',
  'splendor.authentication',
  'splendor.home',
  'splendor.navbar',
  'splendor.registration',
  'splendor.game.management'
]);

app.config(function ($routeProvider, $locationProvider) {
  $routeProvider.
    when('/', {
      templateUrl: 'modules/home/home.html',
      controller: 'HomeCtrl'
    }).
    when('/login', {
      templateUrl: 'modules/authentication/login.html',
      controller: 'LoginCtrl'
    }).
    when('/register', {
      templateUrl: 'modules/registration/registration.html',
      controller: 'RegistrationCtrl'
    }).
    when('/start_game', {
      templateUrl: 'modules/game/management/start_game.html',
      controller: 'StartGameCtrl'
    }).
    otherwise({
      redirectTo: '/'
    });

  $locationProvider.html5Mode(true);
});