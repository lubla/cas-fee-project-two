///<reference path='../../../typings/tsd.d.ts' />

/**
 * Login controller unit test.
 *
 * Checks the controller name only.
 */

'use strict';

describe('LoginCtrl', function () {
  var ctrl;

  beforeEach(module('home'));

  beforeEach(inject(function ($rootScope, $controller) {
    ctrl = $controller('LoginCtrl');
  }));

  it('should have ctrlName as LoginCtrl', function () {
    expect(ctrl.ctrlName).toEqual('LoginCtrl');
  });

});
