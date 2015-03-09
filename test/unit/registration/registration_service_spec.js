'use strict';

describe('RegistrationService', function () {
  beforeEach(module('splendor.registration'));

  var RegistrationService, httpBackend, apiUrl, registrationData;

  beforeEach(function () {
    registrationData = {
      email: 'email',
      password: 'password'
    };

    inject(function (_RegistrationService_, $httpBackend, GlobalService) {
      RegistrationService = _RegistrationService_;
      httpBackend = $httpBackend;
      apiUrl = GlobalService.getApiLocation();
    });
  });

  afterEach(function () {
    httpBackend.verifyNoOutstandingExpectation();
    httpBackend.verifyNoOutstandingRequest();
  });

  describe('register', function(){
    it('post the registration data', function () {
      var registrationData = {
        email: 'email',
        password: 'password'
      }
      var result = {message: 'foo'};
      httpBackend.expectPOST(apiUrl + 'register', {user: registrationData}).respond(200, result);
      RegistrationService.register(registrationData).then(function(response){
        expect(response).toBe(result.message);
      });
      httpBackend.flush();
    });

    it('should pass along an error', function () {
      var registrationData = {
        email: 'email',
        password: 'password'
      }
      var err = {message: 'err'};

      httpBackend.expectPOST(apiUrl + 'register', {user: registrationData}).respond(500, err);
      RegistrationService.register(registrationData).then(function(){
        expect(true).toBe(false);
      }, function(error){
        expect(error).toBe(err.message);
      });
      
      httpBackend.flush();
    });
  });

  describe('deleteAccount', function(){
    it('should make a DELETE request to delete_account', function () {
      var result = {message: 'foo'};
      httpBackend.expectDELETE(apiUrl + 'delete_account').respond(200, result);
      RegistrationService.deleteAccount().then(function(response){
        expect(response).toBe(result.message);
      });
      httpBackend.flush();
    });

    it('should pass along an error', function () {
      var err = {message: 'err'};
      httpBackend.expectDELETE(apiUrl + 'delete_account').respond(500, err);
      RegistrationService.deleteAccount().then(function(){
        expect(true).toBe(false);
      }, function(error){
        expect(error).toBe(err.message);
      });
      
      httpBackend.flush();
    });
  });
});
