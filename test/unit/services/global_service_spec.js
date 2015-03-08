'use strict';

describe('GlobalService', function () {
  var GlobalService, $location;

  beforeEach(function () {
    module('splendor.services');

    inject(function (_GlobalService_, _$location_) {
      GlobalService = _GlobalService_;
      $location = _$location_;
    });
  });

  describe('getApiLocation', function () {
    /*it('should return the server host with api. in front of it and /api/v1/ added to the end', function () {
      spyOn($location, 'host').and.returnValue('foo.bar.com');
      expect(GlobalService.getApiLocation()).toBe('api.foo.bar.com/api/v1/');
    });*/
  });
});
