///<reference path='../../../typings/tsd.d.ts' />

/**
 * Edit doodle controller unit test.
 *
 * Checks the controller name only.
 */

'use strict';

describe('EditDoodleCtrl', function () {
  var ctrl;

  beforeEach(module('home'));

  beforeEach(inject(function ($rootScope, $controller) {
    ctrl = $controller('EditDoodleCtrl');
  }));

  it('should have ctrlName as EditDoodleCtrl', function () {
    expect(ctrl.ctrlName).toEqual('EditDoodleCtrl');
  });

});
