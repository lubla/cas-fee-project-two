///<reference path='../../../typings/tsd.d.ts' />

/**
 * Controller of the login page which allows the user to login with email and password.
 *
 * The page shows input fields to enter the email and password and a check box to enable "stay logged in".
 *
 */


module Home.Controllers {
    'use strict';

    class LoginCtrl {

        /**
         * The controller name. Used in unit tests.
         */
        ctrlName:string;

        /**
         * Stores the email and password.
         */
        user:Home.Services.User;

        /**
         * Indicates of the user should stay logged in.
         */
        stayLoggedIn: boolean;

        /**
         * Error message if something goes wrong, e.g. wrong email/password.
         */
        errorMessage:string;

        /**
         * The controller injections.
         *
         * @type {string[]}
         */
        public static $inject = ['$log', '$location', '$http', 'UserManagement'];

        // dependencies are injected via AngularJS $injector
        constructor(private $log:ng.ILogService,
                    private $location:ng.ILocationService,
                    private $http:ng.IHttpService,
                    private userManagement: Home.Interfaces.IUserManagement) {
            this.ctrlName = 'LoginCtrl';
            this.user = new Home.Services.User('', '');
            this.stayLoggedIn = true;
        }


        /**
         * ng-click callback to log in the user.
         */
        login():void {
            this.userManagement
                .login(this.user, this.stayLoggedIn)
                .then(userProfile => {
                    // Sucess. Go to the home page.
                    this.$location.path('/Home')
                })
                .catch(error => {
                    // E.g. email/password wrong.
                    this.errorMessage = error.message;
                })

        }
    }


    /**
     * Register the controller.
     */
    angular
        .module('home')
        .controller('LoginCtrl', LoginCtrl);
}
