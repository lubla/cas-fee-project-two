///<reference path='../../../typings/tsd.d.ts' />

/**
 * Controller of the my doodles page which allows to administrate the doodles of the logged in user.
 *
 * The page shows a list of the doodles of the doodles which can be edited or deleted.
 *
 */


module Home.Controllers {
    'use strict';

    /**
     * The my doodles controller.
     */
    class MyDoodlesCtrl {

        /**
         * The controller name. Used in unit tests.
         */
        ctrlName:string;

        /**
         * The doodles of the user.
         */
        doodles:Array<Home.Interfaces.IDoodle>;

        /**
         * Error message if something goes wrong.
         */
        errorMessage:string;


        /**
         * The controller injections.
         *
         * @type {string[]}
         */
        public static $inject = ['$log', '$location', '$http', 'Repository', 'UserManagement'];

        // dependencies are injected via AngularJS $injector
        constructor(private $log:ng.ILogService,
                    private $location:ng.ILocationService,
                    private $http:ng.IHttpService,
                    private repository:Home.Interfaces.IRepository,
                    private userManagement: Home.Interfaces.IUserManagement) {

            this.ctrlName = 'MyDoodlesCtrl';

            if(userManagement.loggedInUser) {
                repository
                    .getDoodlesForUser(userManagement.loggedInUser._id)
                    .then(doodles => this.doodles = doodles)
                    .catch(err => {
                        this.errorMessage = err.statusText;
                    });
            }
        }

        /**
         * ng-click callback to delete a doodle.
         *
         * @param doodleId  The id of the doodle to delete.
         */
        deleteDoodle(doodleId:string):void {

            this.repository
                .deleteDoodle(doodleId)
                .then(doodle => {
                    Home.Utilities.ArrayUtilities
                        .removeWhere(this.doodles, doodle => doodle._id === doodleId);
                })
                .catch(err => {
                    this.errorMessage = err.statusText;
                });
        }

        /**
         * ng-click callback to show the doodle status. The register doodle page is displayed.
         *
         * @param doodleId The id of the doodle.
         */
        showDoodleStatus(registerId:string):void {
            this.$location.search('registerId', registerId);
            this.$location.path('/RegisterDoodle');
        }

    }


    /**
     * Register the controller.
     */
    angular
        .module('home')
        .controller('MyDoodlesCtrl', MyDoodlesCtrl);
}
