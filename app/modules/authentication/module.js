var mod = angular.module('splendor.authentication', ['splendor.main', 'splendor.config']);

mod.config(function ($httpProvider) {
  $httpProvider.interceptors.push('AuthInterceptor');
});