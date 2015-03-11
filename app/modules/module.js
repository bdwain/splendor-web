var app = angular.module('splendor', [
  'ngRoute',
  'ui.bootstrap',
  'splendor.main',
  'splendor.user.authentication',
  'splendor.home',
  'splendor.navbar',
  'splendor.user.registration',
  'splendor.game.management',
  'splendor.api'
]);

app.config(function ($routeProvider, $locationProvider) {
  $routeProvider.
    when('/', {
      templateUrl: 'modules/home/home.html',
      controller: 'HomeCtrl'
    }).
    when('/login', {
      templateUrl: 'modules/user/authentication/login.html',
      controller: 'LoginCtrl'
    }).
    when('/register', {
      templateUrl: 'modules/user/registration/registration.html',
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