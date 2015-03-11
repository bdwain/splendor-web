'use strict';

describe('RegistrationService', function () {
  beforeEach(module('splendor.user.registration'));

  var RegistrationService, httpBackend, apiUrl, registrationData;

  beforeEach(function () {
    registrationData = {
      email: 'email',
      password: 'password'
    };

    inject(function (_RegistrationService_, $httpBackend, _apiUrl_) {
      RegistrationService = _RegistrationService_;
      httpBackend = $httpBackend;
      apiUrl = _apiUrl_;
    });
  });

  afterEach(function () {
    httpBackend.verifyNoOutstandingExpectation();
    httpBackend.verifyNoOutstandingRequest();
  });

  describe('register', function(){
    it('should post the registration data', function () {
      httpBackend.expectPOST(apiUrl + 'register', {user: registrationData}).respond(200, {message: 'foo'});
      RegistrationService.register(registrationData);
      httpBackend.flush();
    });

    it('should resolve the promise with the message on success', function(){
      var result = {message: 'foo'};
      httpBackend.whenPOST(apiUrl + 'register', {user: registrationData}).respond(200, result);
      RegistrationService.register(registrationData).then(function(response){
        expect(response).toBe(result.message);
      });
      httpBackend.flush();
    });

    it('should reject the promise with the error on error', function () {
      var err = {message: 'err'};
      httpBackend.whenPOST(apiUrl + 'register', {user: registrationData}).respond(500, err);
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
      httpBackend.expectDELETE(apiUrl + 'delete_account').respond(200, {message: 'foo'});
      RegistrationService.deleteAccount();
      httpBackend.flush();
    });

    it('should resolve the promise with the message on success', function(){
      var result = {message: 'foo'};
      httpBackend.whenDELETE(apiUrl + 'delete_account').respond(200, result);
      RegistrationService.deleteAccount().then(function(response){
        expect(response).toBe(result.message);
      });
      httpBackend.flush();
    });

    it('should reject the promise with the error on error', function () {
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
