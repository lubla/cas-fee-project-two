///<reference path='../../../typings/tsd.d.ts' />
///<reference path='../../../app/interfaces/types.ts' />
///<reference path='../../../app/interfaces/services.ts' />
///<reference path='../../../app/utilities/md5.ts' />
///<reference path='../../../app/utilities/uuid.ts' />
///<reference path='repository-service-common_test.ts' />

/**
 *
 * Repository service unit tests.
 *
 */

'use strict';

describe('Repository', function () {
    var repository:Home.Interfaces.IRepository;
    var $httpBackend: ng.IHttpBackendService;
    var $rootScope;

    beforeEach(module('home'));

    beforeEach(inject(function ($injector) {

        // Set up the mock http service responses
        $httpBackend = $injector.get('$httpBackend');
        repository = $injector.get('Repository');
        $rootScope = $injector.get('$rootScope');

        Home.UnitTestCommon.RepositoryTest.createDoodle(repository);

        Home.UnitTestCommon.RepositoryTest.setupRepositoryBackend($httpBackend);
    }));

    it('should equal Repository', function () {
        expect(repository.get()).toEqual('Repository');
    });

    it('create new doodle should return an empty doodle', function () {
        var doodle = repository.createNewDoodle(Home.UnitTestCommon.RepositoryTest.userId);
        expect(doodle).toBeDefined();
        expect(doodle.userId).toBe(Home.UnitTestCommon.RepositoryTest.userId);
        expect(doodle.dateProposals.length).toBe(0);
        expect(doodle.place).toBe('');
        expect(doodle.title).toBe('');
    });

    it('post doodle should return the posted doodle (i.e. the test doodle)', function () {
        repository
            .postDoodle(Home.UnitTestCommon.RepositoryTest.doodle)
            .then(doodle => Home.UnitTestCommon.RepositoryTest.expectDoodle(doodle));

        $httpBackend.flush();
    });

    it('put doodle should return the updated doodle (i.e. the test doodle)', function () {
        repository
            .putDoodle(Home.UnitTestCommon.RepositoryTest.doodle)
            .then(doodle => Home.UnitTestCommon.RepositoryTest.expectDoodle(doodle));

        $httpBackend.flush();
    });

    it('get doodle should return the test doodle', function () {
        repository
            .getDoodle(Home.UnitTestCommon.RepositoryTest.doodle._id)
            .then(doodle => Home.UnitTestCommon.RepositoryTest.expectDoodle(doodle));

        $httpBackend.flush();
    });

    it('get doodle for register should return the test doodle', function () {
        repository
            .getDoodleRegister(Home.UnitTestCommon.RepositoryTest.doodle.registerId)
            .then(doodle => Home.UnitTestCommon.RepositoryTest.expectDoodle(doodle));

        $httpBackend.flush();
    });

    it('get doodle for user should return an array of test doodles', function () {
        repository
            .getDoodlesForUser(Home.UnitTestCommon.RepositoryTest.userId)
            .then(doodles => {
                expect(doodles.constructor === Array).toBe(true);
                doodles.forEach(doodle => Home.UnitTestCommon.RepositoryTest.expectDoodle(doodle));
            });

        $httpBackend.flush();
    });

    it('delete doodle should return true', function () {
        repository
            .deleteDoodle(Home.UnitTestCommon.RepositoryTest.doodle._id)
            .then(deleted => expect(deleted).toBe(true));

        $httpBackend.flush();
    });

});
