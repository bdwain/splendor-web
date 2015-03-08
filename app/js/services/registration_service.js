angular.module('splendor.services').factory('RegistrationService',
  function ($http, $q, GlobalService) {
    return {
      register: function (registrationData) {
        var deferred = $q.defer();
        $http.post(GlobalService.getApiLocation() + 'register', {user: registrationData})
          .success(function (response) {
            deferred.resolve(response.message);
          }).error(function (err) {
            deferred.reject(err.message);
          });

        return deferred.promise;
      },

      deleteAccount: function () {
        var deferred = $q.defer();

        $http['delete'](GlobalService.getApiLocation() + 'delete_account')
          .success(function (response) {
            deferred.resolve(response.message);
          }).error(function (err) {
            deferred.reject(err.message);
          });

        return deferred.promise;
      }
    };
});
