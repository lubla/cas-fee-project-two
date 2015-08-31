///<reference path='../../../typings/tsd.d.ts' />

/* global describe, beforeEach, it, expect, inject, module */
'use strict';

describe('NestedChildCtrl', function () {
  var ctrl;

  beforeEach(module('home'));

  beforeEach(inject(function ($rootScope, $controller) {
    ctrl = $controller('NestedChildCtrl');
  }));

  it('should have ctrlName as NestedChildCtrl', function () {
    expect(ctrl.ctrlName).toEqual('NestedChildCtrl');
  });

});
