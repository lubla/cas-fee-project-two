///<reference path='../../../typings/tsd.d.ts' />

/**
 * Doodle registered controller unit test.
 *
 * Checks the controller name only.
 */

'use strict';

describe('DoodleRegisteredCtrl', function () {
  var ctrl;

  beforeEach(module('home'));

  beforeEach(inject(function ($rootScope, $controller) {
    ctrl = $controller('DoodleRegisteredCtrl');
  }));

  it('should have ctrlName as DoodleRegisteredCtrl', function () {
    expect(ctrl.ctrlName).toEqual('DoodleRegisteredCtrl');
  });

});
