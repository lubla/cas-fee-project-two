///<reference path='../../../typings/tsd.d.ts' />

/* global describe, beforeEach, it, expect, inject, module */
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
