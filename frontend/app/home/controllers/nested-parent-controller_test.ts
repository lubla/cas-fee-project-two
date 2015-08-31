///<reference path='../../../typings/tsd.d.ts' />

/* global describe, beforeEach, it, expect, inject, module */
'use strict';

describe('NestedParentCtrl', function () {
  var ctrl;

  beforeEach(module('home'));

  beforeEach(inject(function ($rootScope, $controller) {
    ctrl = $controller('NestedParentCtrl');
  }));

  it('should have ctrlName as NestedParentCtrl', function () {
    expect(ctrl.ctrlName).toEqual('NestedParentCtrl');
  });

});
