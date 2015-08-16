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

        constructor(user: Home.Interfaces.IUser) {
            this.email = user.email;
            this.passwordHash = Home.Utilities.Hash.MD5(user.password);
        }
    }



    class Repository implements Home.Interfaces.IRepository {
        public static $inject = ['$log', '$http', '$q'];

        name:string;
        loggedInUser: Home.Interfaces.IUserProfile;

        constructor(private $log:ng.ILogService, private $http:ng.IHttpService, private $q:ng.IQService) {
            this.name = 'Repository';
            this.$log.debug('Repository created');
        }

        registerUser(user: Home.Interfaces.IUser):ng.IPromise<Home.Interfaces.IUserProfile> {

            var deferred = this.$q.defer();
            var userRegister = new UserRegister(user);
            this.$http
                .post('/registerUser', userRegister)
                .then(response => {
                    if(response.status === 200) {
                        // OK.
                        deferred.resolve(response.data)
                    }
                    else {
                        deferred.reject(response.statusText);
                    }
                });

            return deferred.promise;
        }


        getUserProfiles(user:Home.Interfaces.IUser):ng.IPromise<Array<Home.Interfaces.IUserProfile>> {

            var deferred = this.$q.defer();

            this.$http
                .get('/getUserProfiles?email=' + user.email + '&passwordHash=' + Home.Utilities.Hash.MD5(user.password))
                .then(response => {
                    var userProfiles = response.data;
                    if (userProfiles instanceof Array) {
                        deferred.resolve(userProfiles);
                    }
                    else {
                        deferred.reject(new Error('Unexpected response'))
                    }

                });

            return deferred.promise;
        }

        login(user:Home.Interfaces.IUser):ng.IPromise<Home.Interfaces.IUserProfile> {
            var deferred = this.$q.defer();

            // Reset the the logged in user.
            this.loggedInUser = null;
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
                        deferred.resolve(this.loggedInUser);
                    }

                });

            return deferred.promise;
        }

        get():string {
            return name;
        }
    }

    /**
     * @ngdoc service
     * @name home.service:Repository
     *
     * @description
     *
     */
    angular
        .module('home')
        .service('Repository', Repository);
}
