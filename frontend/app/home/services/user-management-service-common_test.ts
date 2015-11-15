/**
 * Created by Luzius on 15.11.2015.
 */

///<reference path='../../../typings/tsd.d.ts' />
///<reference path='../../../app/interfaces/types.ts' />
///<reference path='../../../app/interfaces/services.ts' />
///<reference path='../../../app/utilities/md5.ts' />
///<reference path='../../../app/utilities/uuid.ts' />

module Home.UnitTestCommon {


    export class UserManagementTest {


        // Property values of user that is used in the tests.
        static password = '11111';
        static email = 'a@a.a';
        static userId = Home.Utilities.Uuid.new();

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


        static setupUserManagementBackend($httpBackend:ng.IHttpBackendService):void {
            // http backend to register a user.
            $httpBackend.when('POST', '/userProfile', RepositoryTest.userRegister)
                .respond(RepositoryTest.userProfile);

            // http backend definition for the get user profile request.
            $httpBackend.when('GET', '/userProfile?email=' + RepositoryTest.user.email + '&passwordHash=' + Home.Utilities.Hash.MD5(RepositoryTest.user.password))
                .respond([RepositoryTest.userProfile]);

        }

    }
}
