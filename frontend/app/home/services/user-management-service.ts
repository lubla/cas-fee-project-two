///<reference path='../../../typings/tsd.d.ts' />


module Home.Services {
    'use strict';

    export class User implements Home.Interfaces.IUser {
        email:string;
        password:string;

        constructor(email:string, password:string) {
            this.email = email;
            this.password = password;
        }
    }

    export class UserRegister implements Home.Interfaces.IUserRegister {
        email:string;
        passwordHash:string;

        constructor(user:Home.Interfaces.IUser) {
            this.email = user.email;
            this.passwordHash = Home.Utilities.Hash.MD5(user.password);
        }
    }

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

    export class UserManagement implements Home.Interfaces.IUserManagement{

        /**
         * Local storage key to store the user profile of the logged in user.
         *
         * @type {string}
         */
        private loggedInUserKey = 'loggedInUser';

        loggedInUser:Home.Interfaces.IUserProfile;

        public static $inject = ['$log', '$http', '$q'];

        constructor(private $log:ng.ILogService,
                    private $http:ng.IHttpService,
                    private $q:ng.IQService) {

            this.loggedInUser = this.getLoggedInUserFromLocalStorage();
        }

        private getLoggedInUserFromLocalStorage() : Home.Interfaces.IUserProfile {
            var localStorageLoggedInUser = localStorage.getItem(this.loggedInUserKey);
            if (localStorageLoggedInUser) {
                return new UserProfile(JSON.parse(localStorage.getItem(this.loggedInUserKey)));
            }
            else {
                return null;
            }
        }

        private setLoggedInUserInLocalStorage(userProfile : Home.Interfaces.IUserProfile) {
            if(userProfile) {
                localStorage.setItem(this.loggedInUserKey, JSON.stringify(userProfile));
            }
            else {
                localStorage.removeItem(this.loggedInUserKey);

            }
        }

        registerUser(user:Home.Interfaces.IUser):ng.IPromise<Home.Interfaces.IUserProfile> {

            var deferred = this.$q.defer();
            var userRegister = new UserRegister(user);
            this.$http
                .post('/userProfile', userRegister)
                .then(response => {
                    if (response.status === 200) {
                        // OK.
                        this.loggedInUser = new UserProfile(response.data);
                        deferred.resolve(this.loggedInUser);
                    }
                    else {
                        deferred.reject(new Error(response.statusText));
                    }
                })
                .catch(err => deferred.reject(err));


            return deferred.promise;
        }


        getUserProfiles(user:Home.Interfaces.IUser):ng.IPromise<Array<Home.Interfaces.IUserProfile>> {

            var deferred = this.$q.defer();
            this.$http
                .get('/userProfile?email=' + user.email + '&passwordHash=' + Home.Utilities.Hash.MD5(user.password))
                .then(response => {
                    var userProfiles = response.data;
                    if (userProfiles instanceof Array) {
                        deferred.resolve(Home.Utilities.ArrayUtilities.select(userProfiles, userProfile => new UserProfile(userProfile)));
                    }
                    else {
                        deferred.reject(new Error('Unexpected response'))
                    }

                })
                .catch(err => deferred.reject(err));


            return deferred.promise;
        }

        logout(): void{
            this.loggedInUser = null;
            this.setLoggedInUserInLocalStorage(null);

        }

        login(user:Home.Interfaces.IUser, stayLoggedIn: boolean):ng.IPromise<Home.Interfaces.IUserProfile> {
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
                        if(stayLoggedIn) {
                            this.setLoggedInUserInLocalStorage(this.loggedInUser);
                        }
                        deferred.resolve(this.loggedInUser);
                    }

                })
                .catch(err => deferred.reject(err));


            return deferred.promise;
        }

        get():string {
            return 'UserManagement';
        }
    }

    /**
     * @ngdoc service
     * @name home.service:UserManagement
     *
     * @description
     *
     */
    angular
        .module('home')
        .service('UserManagement', UserManagement);
}
