///<reference path='../../../typings/tsd.d.ts' />
///<reference path='../../../app/interfaces/types.ts' />
///<reference path='../../../app/interfaces/services.ts' />

/* global describe, beforeEach, it, expect, inject, module */
'use strict';

describe('Repository', function () {
  var service: Home.Interfaces.IRepository;



  beforeEach(module('home'));

  beforeEach(inject(function (Repository) {
    service = Repository;
  }));

  it('should equal Repository', function () {
    expect(service.get()).toEqual('Repository');
  });

  it('login should set loggedInUser', function (done) {
    var user = {
        email: "a@a.a",
        password: "11111"
    };

    var result = service.login(user);
    result.then(userProfile => {
      expect(service.loggedInUser).not.toBe(null);
      done();
    });

    expect(service.get()).toEqual('Repository');
  });
});
