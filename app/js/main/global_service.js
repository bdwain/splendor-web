angular.module('splendor.main').factory('GlobalService', function () {
  return {
    getApiLocation: function () {
      return 'http://localhost:3000/api/v1/';
      /*
      var apiLocation = 'api.';
      apiLocation = apiLocation.concat($location.host().concat('/api/v1/'));
      return apiLocation;*/
    }
  };
});