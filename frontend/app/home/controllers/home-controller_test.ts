///<reference path='../../../typings/tsd.d.ts' />
///<reference path='../services/repository-service-common_test.ts' />
/* global describe, beforeEach, it, expect, inject, module */
'use strict';

/**
 * Home controller unit test.
 *
 * Checks the controller name only.
 */

describe('HomeCtrl', function () {
  var ctrl;

  beforeEach(module('home'));

  beforeEach(inject(function ($rootScope, $controller, Repository) {
    ctrl = $controller('HomeCtrl');
    Home.UnitTestCommon.RepositoryTest.createDoodle(Repository);
  }));

  it('should have ctrlName as HomeCtrl', function () {
    expect(ctrl.ctrlName).toEqual('HomeCtrl');
  });

});
