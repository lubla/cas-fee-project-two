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
         * Indicates if "My Doodles" link is shown.
         */
        showMyDoodles:boolean;

        /**
         * The controller injections.
         *
         * @type {string[]}
         */
        public static $inject = ['$log', '$location', '$http', 'UserManagement'];

        constructor(private $log:ng.ILogService,
                    private $location:ng.ILocationService,
                    private $http:ng.IHttpService,
                    private userManagement: Home.Interfaces.IUserManagement) {

            this.ctrlName = 'HomeCtrl';
            this.setupLoggedInControls();
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
    }


    /**
     * Register the controller.
     */
    angular
        .module('home')
        .controller('HomeCtrl', HomeCtrl);
}
