///<reference path='../../../typings/tsd.d.ts' />

/* global describe, beforeEach, it, expect, inject, module */
'use strict';

describe('UserManagement', function () {
  var service;

  beforeEach(module('home'));

  beforeEach(inject(function (UserManagement) {
    service = UserManagement;
  }));

  it('should equal UserManagement', function () {
    expect(service.get()).toEqual('UserManagement');
  });

});
