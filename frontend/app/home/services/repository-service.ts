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

    export class DateProposal implements Home.Interfaces.IDateProposal {
        id:string;
        /**
         * The start date of the proposal.
         */
        start:Date;

        /**
         * The end date of the proposal.
         */
        end:Date;

        /**
         * The list of the names of the people that have accepted the proposal.
         */
        acceptedBy:Array<string>;

        constructor() {
            this.id = Home.Utilities.Uuid.new();
            this.start = new Date();
            this.start.setMinutes(0,0,0);
            this.end = this.start;
            this.end.setHours(this.start.getHours() + 1)
        }

    }


    export class Doodle implements Home.Interfaces.IDoodle {
        id:string;

        /**
         * The id of the user that has created the Doodle.
         */
        ownerId:string;

        /**
         * The title of the Doodle.
         */
        title:string;

        /**
         * The place of the Doodle.
         */
        place:string;

        /**
         * The date proposals of the Doodle.
         */
        dateProposals:Array<Home.Interfaces.IDateProposal>;

        /**
         * Indicates if the Doodle is expired.
         */
        isExpired:boolean;


        constructor(ownerId:string) {
            console.log('create doodle');
            this.id = '';
            this.ownerId = ownerId;
            this.title = '';
            this.dateProposals = new Array<Home.Interfaces.IDateProposal>();
            this.isExpired = false;
        }

        get():string {
            return 'Doodle';
        }
    }


    class Repository implements Home.Interfaces.IRepository {
        public static $inject = ['$log', '$http', '$q'];

        name:string;
        loggedInUser:Home.Interfaces.IUserProfile;

        constructor(private $log:ng.ILogService, private $http:ng.IHttpService, private $q:ng.IQService) {
            this.name = 'Repository';
            this.$log.debug('Repository created');
        }

        registerUser(user:Home.Interfaces.IUser):ng.IPromise<Home.Interfaces.IUserProfile> {

            var deferred = this.$q.defer();
            var userRegister = new UserRegister(user);
            this.$http
                .post('/registerUser', userRegister)
                .then(response => {
                    if (response.status === 200) {
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

        /**
         * Creates a new doodle.
         */
        createNewDoodle():ng.IPromise<Home.Interfaces.IDoodle> {
            var deferred = this.$q.defer();

            var doodle = new Doodle(this.loggedInUser ? this.loggedInUser.id : '');
            deferred.resolve(doodle);


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
