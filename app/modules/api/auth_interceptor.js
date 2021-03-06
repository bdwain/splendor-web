angular.module('splendor.api').factory('AuthInterceptor',
  function ($window, $q, $location, $injector, apiUrl) {
    var isApiRequest = function (path) {
      return path.indexOf(apiUrl) === 0;
    };

    return {
      request: function (config) {
        var AuthenticationService = $injector.get('AuthenticationService');

        config.headers = config.headers || {};

        if ('url' in config && isApiRequest(config.url) && AuthenticationService.hasCredentials()) {
          config.headers['X-User-Token'] = AuthenticationService.getToken();
          config.headers['X-User-Email'] = AuthenticationService.getCurrentUser().email;
        }
        return config || $q.when(config);
      },

      responseError: function (response) {
        var AuthenticationService = $injector.get('AuthenticationService');

        if ('url' in response.config && isApiRequest(response.config.url) && response.config.url.indexOf('login') === -1) {
          if (response.status === 401) {
            $location.path('/login');
            AuthenticationService.onLogout();
          }
        }

        return $q.reject(response);
      }
    };
  }
);