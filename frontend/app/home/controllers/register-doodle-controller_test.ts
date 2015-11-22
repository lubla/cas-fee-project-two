///<reference path='../../../typings/tsd.d.ts' />

/**
 * Register doodle controller unit test.
 *
 * Checks the controller name only.
 */

'use strict';

describe('RegisterDoodleCtrl', function () {
  var ctrl;

  beforeEach(module('home'));

  beforeEach(inject(function ($rootScope, $controller) {
    ctrl = $controller('RegisterDoodleCtrl');
  }));

  it('should have ctrlName as RegisterDoodleCtrl', function () {
    expect(ctrl.ctrlName).toEqual('RegisterDoodleCtrl');
  });

});
