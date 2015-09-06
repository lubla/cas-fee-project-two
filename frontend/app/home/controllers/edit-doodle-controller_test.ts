///<reference path='../../../typings/tsd.d.ts' />

/* global describe, beforeEach, it, expect, inject, module */
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
