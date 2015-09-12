///<reference path='../../../typings/tsd.d.ts' />

/* global describe, beforeEach, it, expect, inject, module */
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
