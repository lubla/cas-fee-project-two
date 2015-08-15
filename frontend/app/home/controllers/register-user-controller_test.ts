///<reference path='../../../typings/tsd.d.ts' />

/* global describe, beforeEach, it, expect, inject, module */
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
