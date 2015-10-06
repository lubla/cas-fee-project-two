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
        _id:string;
        /**
         * The start date of the proposal.
         */
        start:Date;

        /**
         * The end date of the proposal.
         */
        end:Date;


        test:string;

        /**
         * The list of the names of the people that have accepted the proposal.
         */
        acceptedBy:Array<string>;

        constructor() {

            this._id = Home.Utilities.Uuid.new();
            this.start = new Date();
            this.start.setMinutes(0, 0, 0);
            this.end = this.start;
            this.end.setHours(this.start.getHours() + 1);
            this.acceptedBy = new Array<string>();
        }

    }


    export class Doodle implements Home.Interfaces.IDoodle {
        /**
         * The id of the doodle.
         */
        _id:string;

        /**
         * The id of the user that has created the Doodle.
         */
        userId:string;


        /**
         * The id of the doodle to register for it.
         * This id is introduced to have two ids for a doodle:
         * One for the owner (_id, to edit the doodle) and one to register
         * (registerId, to register).
         */
        registerId: string;


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


        /**
         * Constructor to create a new doodle
         *
         * @param userId
         */
        constructor(userId:string);

        /**
         * Creates a doodle from a pain javascript doodle (JSON doodle). If
         * no doodle is specified then a new doodle is created.
         *
         * @param doodle
         */
        constructor(doodle:any);

        constructor(doodleOrUserId:any | string) {
            if (typeof doodleOrUserId === 'string') {
                var userId:string = doodleOrUserId;
                this._id = Home.Utilities.Uuid.new();
                this.userId = userId;
                this.registerId = Home.Utilities.Uuid.new();
                this.title = '';
                this.place = '';
                this.dateProposals = new Array<Home.Interfaces.IDateProposal>();
                this.isExpired = false;
            }
            else {
                var doodle:any = doodleOrUserId;
                this._id = doodle._id;
                this.userId = doodle.userId;
                this.registerId = doodle.registerId;
                this.title = doodle.title;
                this.place = doodle.place;
                this.dateProposals = doodle.dateProposals;
                this.isExpired = doodle.isExpired;
            }
        }


        /**
         * Adds a new date proposal.
         *
         * @return The new data proposal.
         */
        addNewDateProposal():Home.Interfaces.IDateProposal {
            var dataProposal = new DateProposal();
            this.dateProposals.push(dataProposal);
            return dataProposal;
        }

        /**
         * Deletes a date proposal.
         *
         * @param dateProposalId The id of the data proposal to delete.
         */
        deleteDateProposal(dateProposalId:string) {
            Home.Utilities.ArrayUtilities.RemoveWhere(this.dateProposals, dateProposal => dateProposal._id === dateProposalId);
        }

        /**
         * Adds a new name to the names that have accepted a date proposal.
         *
         * @param dateProposalId The id of the data proposal.
         * @param name The name to add.
         */
        addAcceptedNameToDateProposal(dateProposalId:string, name: string): void {
            var dateProposal = this.getDatePoposal(dateProposalId);
            dateProposal.acceptedBy.push(name);
        }

        /**
         * Deletes a name from the names that have accepted a new date proposal.
         *
         * @param dateProposalId The id of the data proposal.
         * @param name The name to delete.
         */
        deleteAcceptedNameFromDateProposal(dateProposalId:string, name: string): void {
            var dateProposal = this.getDatePoposal(dateProposalId);
            Home.Utilities.ArrayUtilities.RemoveWhere(dateProposal.acceptedBy, acceptedBy => acceptedBy === name);
        }

        /**
         * Gets a date proposal for an id.
         *
         * @param dateProposalId The id of the date proposal.
         */
        getDatePoposal(dateProposalId: string): Home.Interfaces.IDateProposal {
            return Home.Utilities.ArrayUtilities.FindFirst(this.dateProposals, dateProposal => dateProposal._id === dateProposalId);
        }

    }


    export class Repository implements Home.Interfaces.IRepository {
        public static $inject = ['$log', '$http', '$q'];

        name:string;
        loggedInUser:Home.Interfaces.IUserProfile;

        constructor(private $log:ng.ILogService, private $http:ng.IHttpService, private $q:ng.IQService) {
            this.name = 'Repository';
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
                        deferred.reject(new Error(response.statusText));
                    }
                })
                .catch(err => deferred.reject(err));


            return deferred.promise;
        }


        getUserProfiles(user:Home.Interfaces.IUser):ng.IPromise<Array<Home.Interfaces.IUserProfile>> {

            var deferred = this.$q.defer();

            console.log("in getUserProfiles");

            this.$http
                .get('http://localhost:3000/getUserProfiles?email=' + user.email + '&passwordHash=' + Home.Utilities.Hash.MD5(user.password))
                .then(response => {
                    console.log("have response");
                    var userProfiles = response.data;
                    if (userProfiles instanceof Array) {
                        deferred.resolve(userProfiles);
                    }
                    else {
                        deferred.reject(new Error('Unexpected response'))
                    }

                })
                .catch(err => deferred.reject(err));


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

                })
                .catch(err => deferred.reject(err));


            return deferred.promise;
        }

        /**
         * Creates a new doodle.
         *
         * @returns {IPromise<Home.Interfaces.IDoodle>}
         */
        createNewDoodle():ng.IPromise<Home.Interfaces.IDoodle> {
            var deferred = this.$q.defer();

            var doodle = new Doodle(this.loggedInUser ? this.loggedInUser._id : '');
            deferred.resolve(doodle);


            return deferred.promise;
        }

        /**
         * Adds a new doodle to the doodle database.
         *
         * @param doodle
         * @returns {IPromise<Home.Interfaces.IDoodle>}
         */
        postDoodle(doodle:Home.Interfaces.IDoodle):ng.IPromise<Home.Interfaces.IDoodle> {

            var deferred = this.$q.defer();
            this.$http
                .post('/postDoodle', doodle)
                .then(response => {
                    if (response.status === 200) {
                        // OK.
                        deferred.resolve(new Doodle(response.data));
                    }
                    else {
                        console.log("status:" + response.status)
                        deferred.reject(new Error(response.statusText));
                    }
                })
                .catch(err => deferred.reject(err));


            return deferred.promise;
        }

        /**
         * Gets a doodle from the doodle database.
         *
         * @param doodleId Id of the doodle
         * @returns {IPromise<Home.Interfaces.IDoodle>}
         */
        getDoodle(doodleId:string):ng.IPromise<Home.Interfaces.IDoodle> {
            var deferred = this.$q.defer();
            this.$http
                .get('/getDoodle?doodleId=' + doodleId)
                .then(response => {
                    if (response.status === 200) {
                        // OK.
                        deferred.resolve(new Doodle(response.data));
                    }
                    else {
                        console.log("status:" + response.status)
                        deferred.reject(new Error(response.statusText));
                    }
                })
                .catch(err => deferred.reject(err));


            return deferred.promise;
        }

        /**
         * Gets a doodle from the doodle database to register for the doodle.
         *
         * @param registerId The register Id of the doodle.
         * @returns {IPromise<Home.Interfaces.IDoodle>} A promise with the retrieved doodle as result.
         */
        getDoodleRegister(registerId:string):ng.IPromise<Home.Interfaces.IDoodle>{
                var deferred = this.$q.defer();
                this.$http
                    .get('/getDoodleRegister?registerId=' + registerId)
                    .then(response => {
                        if (response.status === 200) {
                            // OK.
                            deferred.resolve(new Doodle(response.data));
                        }
                        else {
                            console.log("status:" + response.status)
                            deferred.reject(new Error(response.statusText));
                        }
                    })
                    .catch(err => deferred.reject(err));


                return deferred.promise;
            }

        /**
         * Deletes a doodle.
         *
         * @param doodleId The id of the doodle to delete.
         * @returns {ng.IPromise<boolean>} A promise with a boolean value as result that indicates if the delete succeeded.
         */
        deleteDoodle(doodleId:string):ng.IPromise<boolean> {
            var deferred = this.$q.defer();
            this.$http
                .delete('/deleteDoodle?doodleId=' + doodleId)
                .then(response => {
                    if (response.status === 200) {
                        // OK.
                        deferred.resolve(response.data);
                    }
                    else {
                        console.log("status:" + response.status)
                        deferred.reject(new Error(response.statusText));
                    }
                })
                .catch(err => deferred.reject(err));


            return deferred.promise;
        }

        /**
         * Gets all doodles for a user
         *
         * @param userId
         * @returns {ng.IPromise<Array<Home.Interfaces.IDoodle>>} A promise with the doodles of the user as result.
         */
        getDoodlesForUser(userId:string):ng.IPromise<Array<Home.Interfaces.IDoodle>> {
            var deferred = this.$q.defer();
            this.$http
                .get('/getDoodlesForUser?userId=' + userId)
                .then(response => {
                    if (response.status === 200) {
                        // OK.
                        var doodles = new Array<Home.Interfaces.IDoodle>();
                        var doodleArray = <Array<any>> response.data;
                        doodleArray.forEach(doodle => doodles.push(new Doodle(doodle)));
                        deferred.resolve(doodles);
                    }
                    else {
                        console.log("status:" + response.status)
                        deferred.reject(new Error(response.statusText));
                    }
                })
                .catch(err => deferred.reject(err));


            return deferred.promise;
        }


        /**
         * Updates an existing doodle.
         *
         * @param doodle The doodle to update.
         * @returns {IPromise<Home.Interfaces.IDoodle>} A promise with the updated doodle as result.
         */
        putDoodle(doodle:Home.Interfaces.IDoodle):ng.IPromise<Home.Interfaces.IDoodle> {
            var deferred = this.$q.defer();
            this.$http
                .put('/putDoodle', doodle)
                .then(response => {
                    if (response.status === 200) {
                        // OK.
                        deferred.resolve(new Doodle(response.data));
                    }
                    else {
                        console.log("status:" + response.status)
                        deferred.reject(new Error(response.statusText));
                    }
                })
                .catch(err => deferred.reject(err));


            return deferred.promise;
        }


        get():string {
            return this.name;
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
