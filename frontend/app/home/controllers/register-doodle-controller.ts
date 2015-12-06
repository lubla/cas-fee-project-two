///<reference path='../../../typings/tsd.d.ts' />

/**
 * Controller of the register doodle page which allows a person to register for a doodle.
 *
 * The page shows the title and the place of the doodle and its date proposals.
 * The input field is available to enter the name of the person that wants to register for
 * the doodle.
 * The persons that have registered so far are listed for each date proposal.
 *
 */

module Home.Controllers {
    'use strict';

    interface IRegisterDoodleRouteParams extends ng.route.IRouteParamsService {
        registerId: string;
    }

    /**
     * The register doodle controller.
     */
    class RegisterDoodleCtrl {

        /**
         * The controller name. Used in unit tests.
         */
        ctrlName:string;

        /**
         * The doodle the users can register for.
         */
        doodle:Home.Interfaces.IDoodle;


        /**
         * Error message if something goes wrong.
         */
        errorMessage:string;

        /**
         * Name of the person that registers.
         */
        name:string;


        /**
         * Local storage key to store the person name.
         *
         * @type {string}
         */
        private static doodleRegisterNameKey = 'doodleRegisterName';


        /**
         * The controller injections.
         *
         * @type {string[]}
         */
        public static $inject = ['$log', '$location', '$http', '$routeParams', 'Repository'];

        // dependencies are injected via AngularJS $injector
        constructor(private $log:ng.ILogService,
                    private $location:ng.ILocationService,
                    private $http:ng.IHttpService,
                    private $routeParams:IRegisterDoodleRouteParams,
                    private repository:Home.Interfaces.IRepository) {
            this.ctrlName = 'RegisterDoodleCtrl';

            // Use the name from the local storage (if available).
            this.name = localStorage.getItem(RegisterDoodleCtrl.doodleRegisterNameKey);
            if(!this.name) {
                this.name = '';
            }

            // Load the doodle from the database.
            repository
                .getDoodleRegister($routeParams.registerId)
                .then(doodle => this.doodle = doodle)
                .catch(err => {
                    this.errorMessage = err.statusText;
                });

        }

        /**
         * Gets the date proposal for a given date proposal id.
         *
         * @param dateProposalId     The date proposal id.
         * @returns {IDateProposal}  The data proposal.
         */
        private getDatePoposal(dateProposalId:string):Home.Interfaces.IDateProposal {
            return Home.Utilities.ArrayUtilities.findFirstOrDefault(this.doodle.dateProposals, dateProposal => dateProposal._id === dateProposalId);

        }

        /**
         * ng-click callback to toggle acceptance of a date proposal.
         *
         * @param dateProposalId  The date proposal id.
         */

        toggleAcceptance(dateProposalId:string) {
            if (this.isRegistered(dateProposalId)){
              this.rejectDateProposal(dateProposalId);
            } else {
              this.acceptDateProposal(dateProposalId);
            }
        }

        /**
         * ng-click callback to register for a date proposal.
         *
         * @param dateProposalId  The date proposal id.
         */
        acceptDateProposal(dateProposalId:string) {
            this.doodle.addAcceptedNameToDateProposal(dateProposalId, this.name);
        }

        /**
         * ng-click callback to reject the registration for a date proposal.
         *
         * @param dateProposalId  The id of the date proposal.
         */
        rejectDateProposal(dateProposalId:string) {
            this.doodle.deleteAcceptedNameFromDateProposal(dateProposalId, this.name);
        }

        /**
         * Checks if the person name field is empty. Used the enble/disable controls.
         *
         * @returns {boolean}
         */
        private nameIsEmtpy():boolean {
            return this.name.length === 0;
        }

        /**
         * Checks if the person the registers has already registered for a date proposal.
         *
         * @param dateProposalId  The date proposal id.
         * @returns {boolean}     Returns true if the person is registered for the date proposal.
         */
        private isRegistered(dateProposalId:string):boolean {
            var dateProposal = this.doodle.getDatePoposal(dateProposalId);
            return Home.Utilities.ArrayUtilities.findFirstOrDefault(dateProposal.acceptedBy, acceptedBy => acceptedBy === this.name) != null;
        }

        /**
         * ????
         *
         * @param dateProposalId
         * @returns {boolean}
         */
        isAccepted(dateProposalId:string):boolean {
            var isRegistered = this.isRegistered(dateProposalId);
            return this.nameIsEmtpy() || this.isRegistered(dateProposalId);
        }


        /**
         * ng-click callback to store the changes in the database.
         */
        putDoodle():void {
            // Store the current name in the local storage.
            localStorage.setItem(RegisterDoodleCtrl.doodleRegisterNameKey, this.name);

            this.repository
                .putDoodle(this.doodle)
                .then(doodle => {
                    this.$location.path('/RegisteredForDoodle');
                })
                .catch(err => {
                    this.errorMessage = err.statusText;
                });
        }
    }


    /**
     * Register the controller.
     */
    angular
        .module('home')
        .controller('RegisterDoodleCtrl', RegisterDoodleCtrl);
}
