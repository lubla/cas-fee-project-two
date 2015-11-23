///<reference path='../../../typings/tsd.d.ts' />
///<reference path='../../../app/interfaces/types.ts' />
///<reference path='../../../app/interfaces/services.ts' />
///<reference path='../../../app/utilities/md5.ts' />
///<reference path='../../../app/utilities/uuid.ts' />
///<reference path='user-management-service-common_test.ts' />

/**
 *
 * User management service unit tests.
 *
 */

'use strict';

describe('UserManagement', function () {
  var userManagement:Home.Interfaces.IUserManagement;
  var $httpBackend: ng.IHttpBackendService;
  var $rootScope;

  beforeEach(module('home'));

  beforeEach(inject(function ($injector) {

    // Set up the mock http service responses
    $httpBackend = $injector.get('$httpBackend');
    $rootScope = $injector.get('$rootScope');
    userManagement = $injector.get('UserManagement');

    Home.UnitTestCommon.UserManagementTest.setupUserManagementBackend($httpBackend);
  }));

  it('login should set loggedInUser and return the user profile of the user', function () {
    var result = userManagement.login(Home.UnitTestCommon.RepositoryTest.user, false);
    result.then(userProfile => {
      expect(userManagement.loggedInUser).not.toBe(null);
      expect(userProfile).toBeDefined();
      expect(userProfile.passwordHash).toBe(Home.Utilities.Hash.MD5(Home.UnitTestCommon.RepositoryTest.password));
      expect(userProfile.email).toBe(Home.UnitTestCommon.RepositoryTest.email);
    });
    $httpBackend.flush();
  });

  it('register user should set loggedInUser and return the profile of the user', function () {
    var result = userManagement.registerUser(Home.UnitTestCommon.RepositoryTest.user);
    result.then(userProfile => {
      expect(userManagement.loggedInUser).not.toBe(null);
      expect(userProfile).toBeDefined();
      expect(userProfile.passwordHash).toBe(Home.Utilities.Hash.MD5(Home.UnitTestCommon.RepositoryTest.password));
      expect(userProfile.email).toBe(Home.UnitTestCommon.RepositoryTest.email);
    });
    $httpBackend.flush();
  });


});
