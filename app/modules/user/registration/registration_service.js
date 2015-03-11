angular.module('splendor.user.registration').factory('RegistrationService',
  function ($http, $q, apiUrl) {
    return {
      register: function (registrationData) {
        var deferred = $q.defer();
        $http.post(apiUrl + 'register', {user: registrationData})
          .success(function (response) {
            deferred.resolve(response.message);
          }).error(function (err) {
            deferred.reject(err.message);
          });

        return deferred.promise;
      },

      deleteAccount: function () {
        var deferred = $q.defer();

        $http['delete'](apiUrl + 'delete_account')
          .success(function (response) {
            deferred.resolve(response.message);
          }).error(function (err) {
            deferred.reject(err.message);
          });

        return deferred.promise;
      }
    };
});
