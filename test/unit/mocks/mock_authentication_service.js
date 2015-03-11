'use strict';

angular.module('splendor.user.authentication').provider('MockAuthenticationService', function(){
  this.$get = function($q){
    return {
      token: 'token',
      getToken: function () {
        return this.token;
      },

      currentUser: {
        id: 1,
        email: 'foo@bar.com'
      },
      getCurrentUser: function () {
        return this.currentUser;
      },

      credentials: false,
      hasCredentials: function () {
        return this.credentials;
      },

      loggedIn: false,
      isLoggedIn: function () {
        return this.loggedIn;
      },

      loginSuccess: false,
      loginData: null,
      loginCtr: 0,
      login: function (loginData) {
        this.loginCtr++;
        this.loginData = loginData;

        var deferred = $q.defer();
        if(this.loginSuccess){
          deferred.resolve('success');
        }
        else{
          deferred.reject('error');
        }
        return deferred.promise;
      },

      onLogoutCtr: 0,
      onLogout: function () {
        this.onLogoutCtr++;
      },

      logoutCtr: 0,
      logout: function () {
        this.logoutCtr++;
      }
    };
  };
});