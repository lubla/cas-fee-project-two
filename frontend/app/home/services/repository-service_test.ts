///<reference path='../../../typings/tsd.d.ts' />
///<reference path='../../../app/interfaces/types.ts' />
///<reference path='../../../app/interfaces/services.ts' />
///<reference path='../../../app/utilities/md5.ts' />
///<reference path='../../../app/utilities/uuid.ts' />

/* global describe, beforeEach, it, expect, inject, module */

'use strict';

describe('Repository', function () {
    var repository:Home.Interfaces.IRepository;
    var $httpBackend;

    var password = '11111';
    var email = 'a@a.a';

    var user:Home.Interfaces.IUser = {
        email: email,
        password: password
    };

    var userProfile:Home.Interfaces.IUserProfile = {
        _id: Home.Utilities.Uuid.new(),
        email: email,
        passwordHash: Home.Utilities.Hash.MD5(password)
    };

    var userRegister: Home.Interfaces.IUserRegister = {
        email: email,
        passwordHash: Home.Utilities.Hash.MD5(password)
    };

    beforeEach(module('home'));

    //beforeEach(inject(function (Repository) {
    //    repository = Repository;
    //}));

    beforeEach(inject(function ($injector) {

        // Set up the mock http service responses
        $httpBackend = $injector.get('$httpBackend');
        repository = $injector.get('Repository');

        // http backend definition for get user profile request.
        var loginHandler = $httpBackend.when('GET', '/getUserProfiles?email=' + user.email + '&passwordHash=' + Home.Utilities.Hash.MD5(user.password))
            .respond([userProfile]);

        var registerUserHandler = $httpBackend.when('POST', '/registerUser', userRegister)
            .respond([userProfile]);

    }));


    it('should equal Repository', function () {
        expect(repository.get()).toEqual('Repository');
    });

    it('login should set loggedInUser and respond the user profile of the user', function () {

        var result = repository.login(user);
        result.then(userProfile => {
            expect(repository.loggedInUser).not.toBe(null);
            expect(userProfile).toBeDefined();
            expect(userProfile.passwordHash).toBe(Home.Utilities.Hash.MD5(password));
            expect(userProfile.email).toBe(email);
        });
        $httpBackend.flush();

    });


});
