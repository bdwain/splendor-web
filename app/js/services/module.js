var mod = angular.module('splendor.services', []);

mod.config(function ($httpProvider) {
  $httpProvider.interceptors.push('AuthInterceptor');
});