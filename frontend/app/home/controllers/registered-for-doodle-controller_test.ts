///<reference path='../../../typings/tsd.d.ts' />


/**
 * Controller of the register user page which allows the registration of a new user.
 *
 * The page shows input fields for the user email, password and password confirmation.
 *
 */

'use strict';

describe('RegisteredForDoodleCtrl', function () {
  var ctrl;

  beforeEach(module('home'));

  beforeEach(inject(function ($rootScope, $controller) {
    ctrl = $controller('RegisteredForDoodleCtrl');
  }));

  it('should have ctrlName as RegisteredForDoodleCtrl', function () {
    expect(ctrl.ctrlName).toEqual('RegisteredForDoodleCtrl');
  });

});
