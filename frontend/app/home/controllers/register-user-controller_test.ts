///<reference path='../../../typings/tsd.d.ts' />

/**
 * Register doodle controller unit test.
 *
 * Checks the controller name only.
 */

'use strict';

describe('RegisterUserCtrl', function () {
  var ctrl;

  beforeEach(module('home'));

  beforeEach(inject(function ($rootScope, $controller) {
    ctrl = $controller('RegisterUserCtrl');
  }));

  it('should have ctrlName as RegisterUserCtrl', function () {
    expect(ctrl.ctrlName).toEqual('RegisterUserCtrl');
  });

});
