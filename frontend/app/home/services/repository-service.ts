///<reference path='../../../typings/tsd.d.ts' />
///<reference path='z_rest-service-consumer.ts' />


/**
 * Repository Service
 *
 * Implementation of the doodle interfaces and the repository interface.
 *
 *
 */

module Home.Services {

    'use strict';

    /**
     * Implements the Home.Interfaces.IDateProposal interface.
     */
    export class DateProposal implements Home.Interfaces.IDateProposal {

        /**
         * The id of the proposal.
         */
        _id:string;
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

        /**
         * Constructor. Creates a new date proposal or a clone from a JSON date proposal.
         *
         * @param sourceDateProposal   Optional. If not specified then a new date proposal with default values is created.
         *                 If specified then  the values of source are copied.
         */
        constructor(sourceDateProposal?:any) {

            if(sourceDateProposal) {
                this._id = sourceDateProposal._id;
                this.start = sourceDateProposal.start;
                this.end = sourceDateProposal.end;
                this.acceptedBy = sourceDateProposal.acceptedBy;

            }
            else {
                this._id = Home.Utilities.Uuid.createNew();
                this.start = new Date();
                this.start.setMinutes(0, 0, 0);
                this.end = this.start;
                this.end.setHours(this.start.getHours() + 1);
                this.acceptedBy = [];
            }
        }
    }


    /**
     * Implements the Home.Interfaces.IDoodle interface.
     */
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
        registerId:string;


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
         * Declaration only!
         *
         * @param userId The id of the user that creates the doodle.
         */
        constructor(userId:string);

        /**
         * Creates a doodle from a plain javascript doodle (JSON doodle). If
         * no doodle is specified then a new doodle is created.
         *
         * Declaration only!
         *
         * @param doodle
         */
        constructor(doodle:any);

        /**
         * Implementation of the two constructors.
         *
         * @param doodleOrUserId
         */
        constructor(doodleOrUserId:any | string) {
            if (typeof doodleOrUserId === 'string') {
                // Create a new doodle.
                var userId:string = doodleOrUserId;
                this._id = Home.Utilities.Uuid.createNew();
                this.userId = userId;
                this.registerId = Home.Utilities.Uuid.createNew();
                this.title = '';
                this.place = '';
                this.dateProposals = [];
                this.isExpired = false;
            }
            else {
                // Create a doodle with the values fom the JSON object.
                var doodle:any = doodleOrUserId;
                this._id = doodle._id;
                this.userId = doodle.userId;
                this.registerId = doodle.registerId;
                this.title = doodle.title;
                this.place = doodle.place;
                this.dateProposals = Home.Utilities.ArrayUtilities.select(doodle.dateProposals, dateProposal => new DateProposal(dateProposal));
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
            Home.Utilities.ArrayUtilities.removeWhere(this.dateProposals, dateProposal => dateProposal._id === dateProposalId);
        }

        /**
         * Adds a new name to the names that have accepted a date proposal.
         *
         * @param dateProposalId The id of the data proposal.
         * @param name The name to add.
         */
        addAcceptedNameToDateProposal(dateProposalId:string, name:string):void {
            var dateProposal = this.getDateProposal(dateProposalId);
            dateProposal.acceptedBy.push(name);
        }

        /**
         * Deletes a name from the names that have accepted a new date proposal.
         *
         * @param dateProposalId The id of the data proposal.
         * @param name The name to delete.
         */
        deleteAcceptedNameFromDateProposal(dateProposalId:string, name:string):void {
            var dateProposal = this.getDateProposal(dateProposalId);
            Home.Utilities.ArrayUtilities.removeWhere(dateProposal.acceptedBy, acceptedBy => acceptedBy === name);
        }

        /**
         * Gets a date proposal for an id.
         *
         * @param dateProposalId The id of the date proposal.
         */
        getDateProposal(dateProposalId:string):Home.Interfaces.IDateProposal {
            return Home.Utilities.ArrayUtilities.findFirstOrDefault(this.dateProposals, dateProposal => dateProposal._id === dateProposalId);
        }
    }


    /**
     * Implements the Home.Interfaces.IRepository interface.
     *
     * Service wrapper for the doodle REST API.
     *
     */
    export class Repository extends RestServiceConsumer implements Home.Interfaces.IRepository {

        /**
         * Constructor.
         *
         * @param $log
         * @param $http
         * @param $q
         */
        constructor($log:ng.ILogService,
                    $http:ng.IHttpService,
                    $q:ng.IQService) {
            super($log, $http, $q);
        }

        /**
         * Creates a new doodle.
         *
         * @param userId The id of the user that creates to doodle (An anonymous doodle is created if not specified).
         *
         * @returns {Home.Interfaces.IDoodle}
         */
        createNewDoodle(userId:string):Home.Interfaces.IDoodle {
            return new Doodle(userId ? userId : '');
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
                .post('/doodle', doodle)
                .then(response => {
                    RestServiceConsumer.resolveResponse(
                        deferred,
                        response,
                        () => new Doodle(response.data));
                })
                .catch(error => RestServiceConsumer.rejectError(deferred, error));

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
                .get('/doodle?doodleId=' + doodleId)
                .then(response => {
                    RestServiceConsumer.resolveResponse(
                        deferred,
                        response,
                        () => new Doodle(response.data));
                })
                .catch(error => RestServiceConsumer.rejectError(deferred, error));


            return deferred.promise;
        }

        /**
         * Gets a doodle from the doodle database to register for the doodle.
         *
         * @param registerId The register Id of the doodle.
         * @returns {IPromise<Home.Interfaces.IDoodle>} A promise with the retrieved doodle as result.
         */
        getDoodleRegister(registerId:string):ng.IPromise<Home.Interfaces.IDoodle> {

            var deferred = this.$q.defer();

            this.$http
                .get('/doodle?registerId=' + registerId)
                .then(response => {
                    RestServiceConsumer.resolveResponse(
                        deferred,
                        response,
                        () => new Doodle(response.data));
                })
                .catch(error => RestServiceConsumer.rejectError(deferred, error));

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
                .delete('/doodle?doodleId=' + doodleId)
                .then(response => {
                    RestServiceConsumer.resolveResponse(
                        deferred,
                        response,
                        () => <Boolean> response.data);
                })
                .catch(error => RestServiceConsumer.rejectError(deferred, error));

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
                .get('/doodle?userId=' + userId)
                .then(response => {
                    RestServiceConsumer.resolveResponse(
                        deferred,
                        response,
                        () => {
                            var doodleArray = <Array<any>> response.data;
                            return Home.Utilities.ArrayUtilities.select(doodleArray, doodle => new Doodle(doodle));
                        });
                })
                .catch(error => RestServiceConsumer.rejectError(deferred, error));

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
                .put('/doodle', doodle)
                .then(response => {
                    RestServiceConsumer.resolveResponse(
                        deferred,
                        response,
                        () => new Doodle(response.data));
                })
                .catch(error => RestServiceConsumer.rejectError(deferred, error));

            return deferred.promise;
        }


        /**
         * The name of the repository. Used for the unit tests.
         *
         * @returns {string}
         */
        get():string {
            return 'Repository';
        }
    }

    // Registers the doodle service.
    angular
        .module('home')
        .service('Repository', Repository);
}
