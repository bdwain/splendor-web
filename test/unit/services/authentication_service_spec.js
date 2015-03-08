'use strict';

describe('AuthenticationService', function () {
  beforeEach(module('splendor.services'));

  var AuthenticationService, httpBackend, apiUrl, authResponse, loginData, authTokenIdentifier, currentUserIdentifier;

  beforeEach(function () {
    window.localStorage.clear();
    authTokenIdentifier = 'authToken';
    currentUserIdentifier = 'currentUser';

    authResponse = {
      user: {
        id: 1,
        email: 'email'
      },
      auth_token: 'auth_token'
    };

    loginData = {
      email: 'email',
      password: 'password'
    };

    inject(function (_AuthenticationService_, $httpBackend, GlobalService) {
      AuthenticationService = _AuthenticationService_;
      httpBackend = $httpBackend;
      apiUrl = GlobalService.getApiLocation();
    });
  });

  afterEach(function () {
    httpBackend.verifyNoOutstandingExpectation();
    httpBackend.verifyNoOutstandingRequest();
  });


  it("should get the right object out of local storage when calling getToken", function () {
    window.localStorage.setItem(authTokenIdentifier, 'foobar');
    expect(AuthenticationService.getToken()).toBe('foobar');
  });

  it("should get the right object out of local storage when calling getCurrentUser", function () {
    var obj = {foo: 'blah'};
    window.localStorage.setItem(currentUserIdentifier, JSON.stringify(obj));
    expect(AuthenticationService.getCurrentUser()).toEqual(obj);
  });

  it("should only say hasCredentials if token and current user are set", function () {
    expect(AuthenticationService.hasCredentials()).toBeFalsy();
    window.localStorage.setItem(authTokenIdentifier, 'blahblah');
    expect(AuthenticationService.hasCredentials()).toBeFalsy();
    window.localStorage.clear();
    window.localStorage.setItem(currentUserIdentifier, JSON.stringify({foo: 'blah'}));
    expect(AuthenticationService.hasCredentials()).toBeFalsy();
    window.localStorage.setItem(authTokenIdentifier, 'foobar');
    expect(AuthenticationService.hasCredentials()).toBeTruthy();
  });

  describe('isLoggedIn', function () {
    it("should only say isLoggedIn if token and current user are set", function () {
      expect(AuthenticationService.isLoggedIn()).toBeFalsy();
      window.localStorage.setItem(authTokenIdentifier, 'foobar');
      expect(AuthenticationService.isLoggedIn()).toBeFalsy();
      window.localStorage.clear();
      window.localStorage.setItem(currentUserIdentifier, JSON.stringify({foo: 'blah'}));
      expect(AuthenticationService.isLoggedIn()).toBeFalsy();
      window.localStorage.setItem(authTokenIdentifier, 'foobar');
      expect(AuthenticationService.isLoggedIn()).toBeTruthy();
    });

    it("should return false if they tried to log out and haven't tried to log in again", function () {
      httpBackend.whenDELETE(apiUrl + 'logout').respond(200);
      AuthenticationService.logout();
      httpBackend.flush();
      window.localStorage.setItem(authTokenIdentifier, 'foobar');
      window.localStorage.setItem(currentUserIdentifier, JSON.stringify({foo: 'blah'}));
      expect(AuthenticationService.isLoggedIn()).toBeFalsy();
      httpBackend.whenPOST(apiUrl + 'login', JSON.stringify({user: loginData})).respond(500, {message: 'foo'});
      AuthenticationService.login(loginData);
      httpBackend.flush();
      expect(AuthenticationService.isLoggedIn()).toBeTruthy(); //because the localstorage is still populated
    });
  });

  describe('login', function () {
    it("should make a post request to the authentication endpoint with the passed in login data", function () {
      httpBackend.expectPOST(apiUrl + 'login', JSON.stringify({user: loginData})).respond(200, authResponse);
      AuthenticationService.login(loginData);
      httpBackend.flush();
    });

    describe('on success', function(){
      beforeEach(function (){
        httpBackend.whenPOST(apiUrl + 'login', JSON.stringify({user: loginData})).respond(200, authResponse);
        AuthenticationService.login(loginData);
        httpBackend.flush();
      });

      it("should store the auth token from the response in local storage", function () {
        expect(window.localStorage.getItem(authTokenIdentifier)).toBe(authResponse.auth_token);
      });

      it("should store the user in local storage", function () {
        expect(window.localStorage.getItem(currentUserIdentifier)).toEqual(JSON.stringify(authResponse.user));
      });
    });

    describe('on error', function(){
      beforeEach(function (){
        authResponse.message = 'something went wrong';
        httpBackend.whenPOST(apiUrl + 'login', JSON.stringify({user: loginData})).respond(500, authResponse);
        AuthenticationService.login(loginData);
        httpBackend.flush();
      });

      it("should not store the auth token or current user", function () {
        expect(window.localStorage.getItem(authTokenIdentifier)).toBeFalsy();
        expect(window.localStorage.getItem(currentUserIdentifier)).toBeFalsy();
      });
    });
  });

  function sharedLogoutBehavior(methodUnderTest) {
    it("should delete the auth token and current user from localStorage", function () {
      window.localStorage.setItem(authTokenIdentifier, 'foobar');
      window.localStorage.setItem(currentUserIdentifier, JSON.stringify({foo: 'blah'}));

      methodUnderTest();

      expect(window.localStorage.getItem(authTokenIdentifier)).toBeFalsy();
      expect(window.localStorage.getItem(currentUserIdentifier)).toBeFalsy();
    });
  }

  describe('logout', function () {
    it("should make a delete request to the logout endpoint", function () {
      httpBackend.expectDELETE(apiUrl + 'logout').respond();
      AuthenticationService.logout();
      httpBackend.flush();
    });

    describe('on success', function () {
      sharedLogoutBehavior(function () {
        httpBackend.whenDELETE(apiUrl + 'logout').respond(200);
        AuthenticationService.logout();
        httpBackend.flush();
      });
    });

    describe('on failure', function () {
      sharedLogoutBehavior(function () {
        httpBackend.whenDELETE(apiUrl + 'logout').respond(400);
        AuthenticationService.logout();
        httpBackend.flush();
      });
    });
  });

  describe('onLogout', function () {
    sharedLogoutBehavior(function () {
      AuthenticationService.onLogout();
    });
  });
});
