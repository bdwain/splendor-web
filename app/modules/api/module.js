var mod = angular.module('splendor.api', ['splendor.user.authentication']);

mod.config(function ($httpProvider) {
  $httpProvider.interceptors.push('AuthInterceptor');
});
