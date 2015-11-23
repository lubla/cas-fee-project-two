///<reference path='../../../typings/tsd.d.ts' />
///<reference path='z_rest-service-consumer.ts' />

/**
 * User management Service
 *
 * Implementation of the user management types and the user management interface.
 *
 *
 */

module Home.Services {

    'use strict';

    /**
     * Implements the Home.Interfaces.IUser interface.
     */
    export class User implements Home.Interfaces.IUser {
        email:string;
        password:string;

        constructor(email:string, password:string) {
            this.email = email;
            this.password = password;
        }
    }

    /**
     * Implements the Home.IUserRegister.IUser interface.
     */
    export class UserRegister implements Home.Interfaces.IUserRegister {
        email:string;
        passwordHash:string;

        constructor(user:Home.Interfaces.IUser) {
            this.email = user.email;
            this.passwordHash = Home.Utilities.Hash.MD5(user.password);
        }
    }

    /**
     * Implements the Home.IUserRegister.IUserProfile interface.
     */
    export class UserProfile implements Home.Interfaces.IUserProfile {
        _id:string;
        email:string;
        passwordHash:string;


        /**
         * Constructs a user profile from user profile data that is stored as json object.
         *
         * @param userProfile
         */
        constructor(userProfile:any) {
            this._id = userProfile._id;
            this.email = userProfile.email;
            this.passwordHash = userProfile.passwordHash;
        }
    }

    /**
     * Implements the Home.Interfaces.IUserManagement interface.
     *
     * Service wrapper for the user management REST API.
     *
     */
    export class UserManagement extends RestServiceConsumer implements Home.Interfaces.IUserManagement {

        /**
         * Constructor
         *
         * @param $log
         * @param $http
         * @param $q
         */
        constructor($log:ng.ILogService,
                    $http:ng.IHttpService,
                    $q:ng.IQService) {
            super($log, $http, $q);
            this.loggedInUser = this.getLoggedInUserFromLocalStorage();
        }


        /**
         * The user that is currently logged in. If not set then no user is loggedin.
         *
         * Persistence of the logged in user is implemented using the local storage.
         */
        loggedInUser:Home.Interfaces.IUserProfile;

        /**
         * Local storage key to store the user profile of the logged in user.
         *
         * @type {string}
         */
        private loggedInUserKey = 'loggedInUser';

        /**
         * Gets the logged in user from the local storage.
         *
         * @returns {UserProfile} The logged in user or null if no user is stored in local storage.
         */
        private getLoggedInUserFromLocalStorage():UserProfile {
            var localStorageLoggedInUser = localStorage.getItem(this.loggedInUserKey);
            if (localStorageLoggedInUser) {
                return new UserProfile(JSON.parse(localStorage.getItem(this.loggedInUserKey)));
            }
            else {
                return null;
            }
        }

        /**
         * Stores a user in the local storage.
         *
         * @param userProfile The user to store. Use null to clear the user in the local storage.
         */
        private setLoggedInUserInLocalStorage(userProfile:UserProfile) {
            if (userProfile) {
                localStorage.setItem(this.loggedInUserKey, JSON.stringify(userProfile));
            }
            else {
                localStorage.removeItem(this.loggedInUserKey);

            }
        }

        /**
         * Registers a user.
         *
         * @param user The user to register.
         * @returns {IPromise<T>} A promise that resolves with the user profile.
         */
        registerUser(user:Home.Interfaces.IUser):ng.IPromise<Home.Interfaces.IUserProfile> {

            var deferred = this.$q.defer();
            var userRegister = new UserRegister(user);
            this.$http
                .post('/userProfile', userRegister)
                .then(response => {
                    RestServiceConsumer.resolveResponse(
                        deferred,
                        response,
                        () => {
                            this.loggedInUser = new UserProfile(response.data);
                            return new UserProfile(this.loggedInUser);
                        });
                })
                .catch(error => RestServiceConsumer.rejectError(deferred, error));


            return deferred.promise;
        }


        /**
         * Gets the user profiles of a user. Note that a user should have one profile only.
         *
         * @param user The user.
         * @returns {IPromise<T>} A promise that resolves with the user profiles.
         */
        getUserProfiles(user:Home.Interfaces.IUser):ng.IPromise<Array<Home.Interfaces.IUserProfile>> {

            var deferred = this.$q.defer();
            this.$http
                .get('/userProfile?email=' + user.email + '&passwordHash=' + Home.Utilities.Hash.MD5(user.password))
                .then(response => {
                    RestServiceConsumer.resolveResponse(
                        deferred,
                        response,
                        () => {
                            var userProfiles = <Array<any>> response.data;
                            return Home.Utilities.ArrayUtilities.select(userProfiles, userProfile => new UserProfile(userProfile))
                        });
                })
                .catch(error => RestServiceConsumer.rejectError(deferred, error));


            return deferred.promise;
        }

        /**
         * Logs out the currentl logged in user.
         */
        logout():void {
            this.loggedInUser = null;
            this.setLoggedInUserInLocalStorage(null);

        }

        /**
         * Logs in a user
         *
         * @param user             The user to log in.
         * @param stayLoggedIn     Indicates if the logged in user has to be stored in the local storage.
         * @returns {IPromise<T>}  A promise that resolves with the user profile of the user.
         */
        login(user:Home.Interfaces.IUser, stayLoggedIn:boolean):ng.IPromise<Home.Interfaces.IUserProfile> {
            var deferred = this.$q.defer();

            // Reset the the logged in user.
            this.logout();
            this
                .getUserProfiles(user)
                .then(userProfiles => {

                    if (userProfiles.length === 0) {
                        deferred.reject(new Error('Passwort oder Email Adresse ungültig!'))
                    }
                    else if (userProfiles.length != 1) {
                        deferred.reject(new Error('Multiple user profiles found!'))
                    }
                    else {
                        this.loggedInUser = userProfiles[0];
                        if (stayLoggedIn) {
                            this.setLoggedInUserInLocalStorage(this.loggedInUser);
                        }
                        deferred.resolve(this.loggedInUser);
                    }

                })
                .catch(error => RestServiceConsumer.rejectError(deferred, error));


            return deferred.promise;
        }

        /**
         * Gets the name of the user management service. Used in the unit test.
         *
         * @returns {string}  The name of the service.
         */
        get():string {
            return 'UserManagement';
        }
    }

    // Register the user management service.
    angular
        .module('home')
        .service('UserManagement', UserManagement);
}
