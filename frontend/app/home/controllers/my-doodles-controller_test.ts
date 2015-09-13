///<reference path='../../../typings/tsd.d.ts' />

/* global describe, beforeEach, it, expect, inject, module */
'use strict';

describe('MyDoodlesCtrl', function () {
  var ctrl;

  beforeEach(module('home'));

  beforeEach(inject(function ($rootScope, $controller) {
    ctrl = $controller('MyDoodlesCtrl');
  }));

  it('should have ctrlName as MyDoodlesCtrl', function () {
    expect(ctrl.ctrlName).toEqual('MyDoodlesCtrl');
  });

});
