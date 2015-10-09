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
    var $rootScope;

    // Property values of user that is used in the tests.
    var password = '11111';
    var email = 'a@a.a';
    var userId = Home.Utilities.Uuid.new();

    // Property values of the doodle that is used in the test.
    var place = 'place';
    var title = 'title';
    var dateProposalCount = 2;

    var user:Home.Interfaces.IUser = {
        email: email,
        password: password
    };

    var userProfile:Home.Interfaces.IUserProfile = {
        _id: userId,
        email: email,
        passwordHash: Home.Utilities.Hash.MD5(password)
    };

    var userRegister:Home.Interfaces.IUserRegister = {
        email: email,
        passwordHash: Home.Utilities.Hash.MD5(password)
    };

    var doodle:Home.Interfaces.IDoodle;

    /**
     * Initializes the test doodle.
     */
    function createDoodle() {
        doodle = repository.createNewDoodleSync(userId);
        doodle.place = place;
        doodle.title = title;
        for (var dateProposal:number = 0; dateProposal < dateProposalCount; dateProposal++) {
            doodle.addNewDateProposal();
        }
    }

    /**
     * Checks if a doodle is the test doodle.
     *
     * @param doodle The test doodle.
     */
    function expectDoodle(doodle) {
        expect(doodle).toBeDefined();
        expect(doodle.userId).toBe(userId);
        expect(doodle.dateProposals.length).toBe(dateProposalCount);
        expect(doodle.place).toBe(place);
        expect(doodle.title).toBe(title);
    }


    function loginUser():void {
        repository.login(user);
        $httpBackend.flush();
    }

    beforeEach(module('home'));

    beforeEach(inject(function ($injector) {

        // Set up the mock http service responses
        $httpBackend = $injector.get('$httpBackend');
        repository = $injector.get('Repository');
        $rootScope = $injector.get('$rootScope');

        createDoodle();

        // http backend definition for the post doodle request.
        $httpBackend.when('POST', '/postDoodle', doodle)
            .respond(doodle);

        // http backend definition for the put doodle request.
        $httpBackend.when('PUT', '/putDoodle', doodle)
            .respond(doodle);

        // http backend definition for the get doodle request.
        $httpBackend.when('GET', '/getDoodle?doodleId=' + doodle._id)
            .respond(doodle);

        // http backend definition for the get doodles for user request.
        $httpBackend.when('GET', '/getDoodlesForUser?userId=' + userId)
            .respond([doodle, doodle, doodle]);

        // http backend definition for the get doodle for register request.
        $httpBackend.when('GET', '/getDoodleRegister?registerId=' + doodle.registerId)
            .respond(doodle);

        // http backend definition for the delete doodle request.
        $httpBackend.when('DELETE', '/deleteDoodle?doodleId=' + doodle._id)
            .respond(true);

        // http backend to register a user.
        $httpBackend.when('POST', '/registerUser', userRegister)
            .respond(userProfile);

        // http backend definition for the get user profile request.
        $httpBackend.when('GET', '/getUserProfiles?email=' + user.email + '&passwordHash=' + Home.Utilities.Hash.MD5(user.password))
            .respond([userProfile]);


    }));

    it('should equal Repository', function () {
        expect(repository.get()).toEqual('Repository');
    });

    it('login should set loggedInUser and return the user profile of the user', function () {
        var result = repository.login(user);
        result.then(userProfile => {
            expect(repository.loggedInUser).not.toBe(null);
            expect(userProfile).toBeDefined();
            expect(userProfile.passwordHash).toBe(Home.Utilities.Hash.MD5(password));
            expect(userProfile.email).toBe(email);
        });
        $httpBackend.flush();
    });

    it('register user should set loggedInUser and return the profile of the user', function () {
        var result = repository.registerUser(user);
        result.then(userProfile => {
            expect(repository.loggedInUser).not.toBe(null);
            expect(userProfile).toBeDefined();
            expect(userProfile.passwordHash).toBe(Home.Utilities.Hash.MD5(password));
            expect(userProfile.email).toBe(email);
        });
        $httpBackend.flush();
    });

    it('create new doodle should return an empty doodle', function (done) {

        loginUser();

        // Note repository.createNewDoodle is async but not using $http =>
        // use the done() function (to indicate that the callback is called) together $rootScope.$apply() (to pump to event loop).
        var result = repository.createNewDoodle();
        result.then(doodle => {
            expect(doodle).toBeDefined();
            expect(doodle.userId).toBe(userId);
            expect(doodle.dateProposals.length).toBe(0);
            expect(doodle.place).toBe('');
            expect(doodle.title).toBe('');
            done();
        });

        $rootScope.$apply();
    });

    it('post doodle should return the posted doodle (i.e. the test doodle)', function () {
        repository
            .postDoodle(doodle)
            .then(doodle => expectDoodle(doodle));

        $httpBackend.flush();
    });

    it('put doodle should return the updated doodle (i.e. the test doodle)', function () {
        repository
            .putDoodle(doodle)
            .then(doodle => expectDoodle(doodle));

        $httpBackend.flush();
    });

    it('get doodle should return the test doodle', function () {
        repository
            .getDoodle(doodle._id)
            .then(doodle => expectDoodle(doodle));

        $httpBackend.flush();
    });

    it('get doodle for register should return the test doodle', function () {
        repository
            .getDoodleRegister(doodle.registerId)
            .then(doodle => expectDoodle(doodle));

        $httpBackend.flush();
    });

    it('get doodle for user should return an array of test doodles', function () {
        repository
            .getDoodlesForUser(userId)
            .then(doodles => {
                expect(doodles.constructor === Array).toBe(true);
                doodles.forEach(doodle => expectDoodle(doodle));
            });

        $httpBackend.flush();
    });

    it('delete doodle should return true', function () {
        repository
            .deleteDoodle(doodle._id)
            .then(deleted => expect(deleted).toBe(true));

        $httpBackend.flush();
    });

});
