angular.module('splendor.authentication').factory('AuthenticationService',
  function ($http, $q, $window, apiUrl) {
    var hasLoggedOut = false, //this is needed to prevent a race condition between a logout and the redirect back from the login page
      authTokenIdentifier = 'authToken',
      currentUserIdentifier = 'currentUser';

    return {
      getToken: function () {
        return $window.localStorage.getItem(authTokenIdentifier);
      },

      getCurrentUser: function () {
        return JSON.parse($window.localStorage.getItem(currentUserIdentifier));
      },

      hasCredentials: function () {
        return this.getToken() && this.getCurrentUser();
      },

      isLoggedIn: function () {
        return !hasLoggedOut && this.hasCredentials();
      },

      login: function (loginData) {
        var deferred = $q.defer();

        hasLoggedOut = false;

        $http.post(apiUrl + 'login', {user: loginData})
          .success(function (response) {
            $window.localStorage.setItem(authTokenIdentifier, response.auth_token);
            $window.localStorage.setItem(currentUserIdentifier, JSON.stringify(response.user));

            deferred.resolve(response);
          }).error(function (err) {
            deferred.reject(err.message);
          });

        return deferred.promise;
      },

      onLogout: function () {
        $window.localStorage.removeItem(authTokenIdentifier);
        $window.localStorage.removeItem(currentUserIdentifier);
      },

      logout: function () {
        hasLoggedOut = true;
        var service = this;

        $http['delete'](apiUrl + 'logout')
          ['finally'](function(){
            service.onLogout();
          });
      }
    };
});
