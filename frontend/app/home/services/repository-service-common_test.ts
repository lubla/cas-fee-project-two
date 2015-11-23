/**
 * Created by Luzius on 09.10.2015.
 */
///<reference path='../../../typings/tsd.d.ts' />
///<reference path='../../../app/interfaces/types.ts' />
///<reference path='../../../app/interfaces/services.ts' />
///<reference path='../../../app/utilities/md5.ts' />
///<reference path='../../../app/utilities/uuid.ts' />

/**
 *
 * Common stuff for the repository service unit tests.
 *
 */

module Home.UnitTestCommon {


    export class RepositoryTest {


        // Property values of user that is used in the tests.
        static password = '11111';
        static email = 'a@a.a';
        static userId = Home.Utilities.Uuid.new();

        // Property values of the doodle that is used in the test.
        static place = 'place';
        static title = 'title';

        static user:Home.Interfaces.IUser = {
            email: RepositoryTest.email,
            password: RepositoryTest.password
        };

        static userProfile:Home.Interfaces.IUserProfile = {
            _id: RepositoryTest.userId,
            email: RepositoryTest.email,
            passwordHash: Home.Utilities.Hash.MD5(RepositoryTest.password)
        };

        static userRegister:Home.Interfaces.IUserRegister = {
            email: RepositoryTest.email,
            passwordHash: Home.Utilities.Hash.MD5(RepositoryTest.password)
        };

        static doodle:Home.Interfaces.IDoodle;
        static dateProposalCount = 2;

        /**
         * Initializes the test doodle.
         */
        static createDoodle(repository:Home.Interfaces.IRepository) {
            RepositoryTest.doodle = repository.createNewDoodle(RepositoryTest.userId);
            RepositoryTest.doodle.place = RepositoryTest.place;
            RepositoryTest.doodle.title = RepositoryTest.title;
            for (var dateProposal:number = 0; dateProposal < RepositoryTest.dateProposalCount; dateProposal++) {
                RepositoryTest.doodle.addNewDateProposal();
            }
        }

        /**
         * Checks if a doodle is the test doodle.
         *
         * @param doodle The test doodle.
         */
        static expectDoodle(doodle) {
            expect(doodle).toBeDefined();
            expect(doodle.userId).toBe(RepositoryTest.userId);
            expect(doodle.dateProposals.length).toBe(RepositoryTest.dateProposalCount);
            expect(doodle.place).toBe(RepositoryTest.place);
            expect(doodle.title).toBe(RepositoryTest.title);
        }

        /**
         * Sets up the http mock for the repository unit tests
         *
         * @param $httpBackend The http mock service.
         */
        static setupRepositoryBackend($httpBackend:ng.IHttpBackendService):void {
            // http backend definition for the post doodle request.
            $httpBackend.when('POST', '/doodle', RepositoryTest.doodle)
                .respond(RepositoryTest.doodle);

            // http backend definition for the put doodle request.
            $httpBackend.when('PUT', '/doodle', RepositoryTest.doodle)
                .respond(RepositoryTest.doodle);

            // http backend definition for the get doodle request.
            $httpBackend.when('GET', '/doodle?doodleId=' + RepositoryTest.doodle._id)
                .respond(RepositoryTest.doodle);

            // http backend definition for the get doodles for user request.
            $httpBackend.when('GET', '/doodle?userId=' + RepositoryTest.userId)
                .respond([RepositoryTest.doodle, RepositoryTest.doodle, RepositoryTest.doodle]);

            // http backend definition for the get doodle for register request.
            $httpBackend.when('GET', '/doodle?registerId=' + RepositoryTest.doodle.registerId)
                .respond(RepositoryTest.doodle);

            // http backend definition for the delete doodle request.
            $httpBackend.when('DELETE', '/doodle?doodleId=' + RepositoryTest.doodle._id)
                .respond(true);

        }

    }
}
