var mod = angular.module('splendor.authentication', ['splendor.main']);

mod.config(function ($httpProvider) {
  $httpProvider.interceptors.push('AuthInterceptor');
});