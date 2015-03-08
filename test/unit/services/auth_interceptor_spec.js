'use strict';

describe('AuthInterceptor', function () {
  beforeEach(module('splendor.test.mocks'));
  beforeEach(module('splendor.services'));

  var AuthenticationService, $http, $httpBackend, $location, apiUrl;

  beforeEach(function () {
    module(function ($provide, MockAuthenticationServiceProvider) {
      $provide.provider('AuthenticationService', MockAuthenticationServiceProvider);
    });

    inject(function (_AuthenticationService_, _$http_, _$httpBackend_, _$location_, GlobalService) {
      AuthenticationService = _AuthenticationService_;
      $httpBackend = _$httpBackend_;
      $http = _$http_;
      $location = _$location_;
      apiUrl = GlobalService.getApiLocation();
    });
  });

  afterEach(function () {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
    window.sessionStorage.clear();
  });

  it("should add X-User-Token and X-User-Email headers from the AuthenticationService if authenticated and an api request (api.HOST/api/v1)", function () {
    var token = 'my token';
    var user = {email: 'email'};
    AuthenticationService.credentials = true;
    AuthenticationService.token = token;
    AuthenticationService.currentUser = user;
    var requestUrl = apiUrl + 'foo/bar';
    $httpBackend.expectGET(requestUrl,
      function (headers) {
        return headers['X-User-Token'] === token &&
          headers['X-User-Email'] === user.email;
      }).respond();

    $http.get(requestUrl);
    $httpBackend.flush();
  });

  it("should not add X-User-Token or X-User-Email headers if not an api request", function () {
    var token = 'my token';
    var user = {email: 'email'};
    AuthenticationService.credentials = true;
    AuthenticationService.token = token;
    AuthenticationService.user = user;
    var requestUrl = 'http://foo.com/foo/bar';
    $httpBackend.expectGET(requestUrl,
      function (headers) {
        return !('X-User-Token' in headers) && !('X-User-Email' in headers);
      }).respond();

    $http.get(requestUrl);
    $httpBackend.flush();
  });

  it("should not add X-User-Token or X-User-Email headers if not authenticated", function () {
    AuthenticationService.credentials = false;
    var requestUrl = apiUrl + 'foo/bar';
    $httpBackend.expectGET(requestUrl,
      function (headers) {
        return !('X-User-Token' in headers) && !('X-User-Email' in headers);
      }).respond();

    $http.get(requestUrl);
    $httpBackend.flush();
  });

  describe("when the api returns a 401 error", function () {
    describe('when the request is not a login request but is an api request', function(){
      beforeEach(function () {
        $location.path('/foo');
        AuthenticationService.credentials = true;
        var requestUrl = apiUrl + 'foo/bar';
        $httpBackend.whenGET(requestUrl).respond(401);
        $http.get(requestUrl);
        $httpBackend.flush();
      });

      it("should redirect to the login page", function () {
        expect($location.path()).toBe('/login');
      });

      it("should call AuthenticationService.onLogout", function () {
        expect(AuthenticationService.onLogoutCtr).toBe(1);
      });
    });

    describe('when the request is a login request', function(){
      it("should not redirect to the login page", function () {
        $location.path('/foo');
        AuthenticationService.credentials = true;
        var requestUrl = apiUrl + 'login';
        $httpBackend.whenGET(requestUrl).respond(401);
        $http.get(requestUrl);
        $httpBackend.flush();
        expect($location.path()).toBe('/foo');
      });
    });

    describe('when the request is not an api request', function(){
      it("should not redirect to the login page", function () {
        $location.path('/foo');
        AuthenticationService.credentials = true;
        var requestUrl = 'http://foo.com/bar';
        $httpBackend.whenGET(requestUrl).respond(401);
        $http.get(requestUrl);
        $httpBackend.flush();
        expect($location.path()).toBe('/foo');
      });
    });
  });

  describe("when the api returns an error other than 401", function () {
    beforeEach(function () {
      $location.path('/foo');
      AuthenticationService.credentials = true;
      var requestUrl = apiUrl + 'foo/bar';
      $httpBackend.whenGET(requestUrl).respond(402);
      $http.get(requestUrl);
      $httpBackend.flush();
    });

    it("should not redirect to the login page", function () {
      expect($location.path()).toBe('/foo');
    });

    it("should not call auth service.onLogout", function () {
      expect(AuthenticationService.onLogoutCtr).toBe(0);
    });
  });
});
