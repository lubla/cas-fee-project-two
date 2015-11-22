///<reference path='../../../typings/tsd.d.ts' />

/**
 * Controller for the edit doodle page which is displayed create a new  doodle or to update an existing doodle.
 *
 * The page allows to set the doodle title, place and date proposals.
 *
 */

module Home.Controllers {
    'use strict';

    interface IEditDoodleRouteParams extends ng.route.IRouteParamsService {
        doodleId: string;
    }

    /**
     * The edit doodle controller.
     */
    class EditDoodleCtrl {

        /**
         * The controller name. Used in unit tests.
         */
        ctrlName:string;

        /**
         * The doodle that is edited.
         */
        doodle:Home.Interfaces.IDoodle;

        /**
         * Error message if something goes wrong.
         */
        errorMessage:string;

        /**
         * Indicates if it is an new doodle that has to be added to the database or an existing doodle the has to be updated in the database.
         */
        isNewDoodle:boolean;

        /**
         * The controller injections.
         *
         * @type {string[]}
         */
        public static $inject = ['$log', '$location', '$http', '$routeParams', 'Repository', 'UserManagement'];

        // dependencies are injected via AngularJS $injector
        constructor(private $log:ng.ILogService,
                    private $location:ng.ILocationService,
                    private $http:ng.IHttpService,
                    private $routeParams:IEditDoodleRouteParams,
                    private repository:Home.Interfaces.IRepository,
                    private userManagement:Home.Interfaces.IUserManagement) {

            this.ctrlName = 'EditDoodleCtrl';

            // Initialize the doodlee.
            if (!$routeParams.doodleId) {
                // No id specified in route => Create a new doodle.
                this.isNewDoodle = true;
                this.doodle = this.repository.createNewDoodle(this.userManagement.loggedInUser ? this.userManagement.loggedInUser._id : '');
            }
            else {
                // Id specified => Get the doodle from db.
                this.isNewDoodle = false;
                repository
                    .getDoodle($routeParams.doodleId)
                    .then(doodle => this.doodle = doodle)
                    .catch(err => {
                        this.$log.debug("problem getting doodle");
                        this.errorMessage = err.statusText;
                    });
            }
        }

        /**
         * ng-click callback to add a new date proposal.
         */
        addDateProposal():void {
            this.doodle.addNewDateProposal();

        }

        /**
         * ng-click callback to delete an existing date proposal.
         *
         * @param dateProposalId   The id of the date proposal to delete.
         */
        deleteDateProposal(dateProposalId:string):void {
            this.doodle.deleteDateProposal(dateProposalId);
        }

        /**
         * Sets the location to the doodle registered page and sets up its search parameters.
         */
        setDoodleRegisteredLocation() {
            this.$location.search('doodleId', this.doodle._id);
            this.$location.search('isNewDoodle', this.isNewDoodle);
            this.$location.search('registerId', this.doodle.registerId);
            this.$location.path('/DoodleRegistered');
        }

        /**
         *  ng-click callback the stores the doodle in the database.
         */
        postOrPutDoodle():void {
            if (this.isNewDoodle) {
                this.repository
                    .postDoodle(this.doodle)
                    .then(doodle => {
                        this.setDoodleRegisteredLocation();
                    })
                    .catch(err => {
                        this.errorMessage = err.statusText;
                    });
            }
            else {
                this.repository
                    .putDoodle(this.doodle)
                    .then(doodle => {
                        this.setDoodleRegisteredLocation();
                    })
                    .catch(err => {
                        this.errorMessage = err.statusText;
                    });
            }

        }

    }


    /**
     * Register the controller.
     */
    angular
        .module('home')
        .controller('EditDoodleCtrl', EditDoodleCtrl);
}
