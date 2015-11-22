///<reference path='../../../typings/tsd.d.ts' />

/**
 * My doodles controller unit test.
 *
 * Checks the controller name only.
 */

'use strict';

describe('MyDoodlesCtrl', function () {
  var ctrl;

  beforeEach(module('home'));

  beforeEach(inject(function ($rootScope, $controller, $log, $location, $http, Repository) {
    ctrl = $controller('MyDoodlesCtrl', $log, $location, $http, Repository);
  }));

  it('should have ctrlName as MyDoodlesCtrl', function () {
    expect(ctrl.ctrlName).toEqual('MyDoodlesCtrl');
  });

});
