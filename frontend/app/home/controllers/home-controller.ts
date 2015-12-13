///<reference path='../../../typings/tsd.d.ts' />

/**
 * Controller of the home page which is displayed create a new  doodle or to update an existing doodle.
 *
 * The page allows to register a new user, to login and logout a user, and to administrate the doodles of a user which is logged in.
 *
 */


module Home.Controllers {
    'use strict';

    /**
     * The home controller.
     */
    class HomeCtrl {

        /**
         * The controller name. Used in unit tests.
         */
        ctrlName:string;

        /**
         * Hello message, displayed if the user is logged in.
         */
        loginMessage:string;

        /**
         * Error message if something goes wrong.
         */
        errorMessage:string;

        /**
         * Indicates if "My Doodles" link is shown.
         */
        showMyDoodles:boolean;

        /**
         * The doodles of the user.
         */
        doodles:Array<Home.Interfaces.IDoodle>;


      /**
         * The controller injections.
         *
         * @type {string[]}
         */
        public static $inject = ['$log', '$location', '$http', 'UserManagement', 'Repository'];

        constructor(private $log:ng.ILogService,
                    private $location:ng.ILocationService,
                    private $http:ng.IHttpService,
                    private userManagement: Home.Interfaces.IUserManagement,
                    private repository:Home.Interfaces.IRepository) {

            this.ctrlName = 'HomeCtrl';
            this.setupLoggedInControls();

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
         * Show/hide logic that depends on the user logged in state.
         */
        private setupLoggedInControls() {
            if (this.userManagement.loggedInUser != null) {
                this.showMyDoodles = true;
                this.loginMessage = 'Hallo ' + this.userManagement.loggedInUser.email;
            }
            else {
                this.showMyDoodles = false;
                this.loginMessage = null;
            }
        };

        /**
         * ng-click callback to log out the user.
         */
        public logout():void {
            this.userManagement.logout();
            this.setupLoggedInControls();
        }

        /**
         * ng-click callback to delete a doodle.
         *
         * @param doodleId  The id of the doodle to delete.
         */
        deleteDoodle(doodleId:string):void {
          if (confirm("Wirklich löschen?")){
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
        }

        /**
         * ng-click callback to show the doodle status. The register doodle page is displayed.
         *
         * @param registerId The id of the doodle.
         */
        showDoodleStatus(registerId:string):void {
          this.$location.search('registerId', registerId);
          this.$location.path('/RegisterDoodle');
        }

        /**
         * ng-click callback to show the doodle edit page.
         *
         * @param doodleId The id of the doodle.
         */
        editDoodle(doodleId:string):void {
          this.$location.search('doodleId', doodleId);
          this.$location.path('/EditDoodle');
        }

    }


    /**
     * Register the controller.
     */
    angular
        .module('home')
        .controller('HomeCtrl', HomeCtrl);
}
