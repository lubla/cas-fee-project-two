///<reference path='../../../typings/tsd.d.ts' />

/* global describe, beforeEach, it, expect, inject, module */
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
