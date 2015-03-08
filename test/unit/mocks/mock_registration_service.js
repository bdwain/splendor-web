'use strict';

angular.module('splendor.test.mocks').provider('MockRegistrationService', function(){
  this.$get = function($q){
    return {
      registerSuccess: false,
      registerData: null,
      registerCtr: 0,
      register: function (registerData) {
        this.registerCtr++;
        this.registerData = registerData;

        var deferred = $q.defer();
        if(this.registerSuccess){
          deferred.resolve('success');
        }
        else{
          deferred.reject('error');
        }
        return deferred.promise;
      },

      deleteAccountSuccess: false,
      deleteAccountCtr: 0,
      deleteAccount: function () {
        this.deleteAccountCtr++;

        var deferred = $q.defer();
        if(this.deleteAccountSuccess){
          deferred.resolve('success');
        }
        else{
          deferred.reject('error');
        }
        return deferred.promise;
      },
    };
  };
});