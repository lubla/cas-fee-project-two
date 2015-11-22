///<reference path='../../../typings/tsd.d.ts' />

/**
 * Controller of the register user page which allows the registration of a new user.
 *
 * The page shows input fields for the user email, password and password confirmation.
 *
 */

module Home.Controllers {
    'use strict';


    /**
     * The register user controller.
     */
    class RegisterUserCtrl {

        /**
         * The controller name. Used in unit tests.
         */
        ctrlName:string;

        /**
         * Stores user email and password.
         */
        user:Home.Services.User;

        /**
         * Stores the password confirmation.
         */
        passwordConfirmation:string;

        /**
         * Error message if something goes wrong, e.g. invalid password confirmation.
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

            this.ctrlName = 'RegisterUserCtrl';
            this.user = new Home.Services.User('', '');
            this.passwordConfirmation = '';
        }

        /**
         * ng-click callback to register the user. Some validation is performed.
         */
        registerUser():void {
            this.$log.debug('registerUser');
            if (this.user.password !== this.passwordConfirmation) {
                this.errorMessage = 'Passwortbestätigung ungültig!';
            }
            else if (this.user.password.length <= 3) {
                this.errorMessage = 'Passwort muss mindestens 4 Zeichen lang sein!';
            }
            else if (!Home.Utilities.Validation.emailIsValid(this.user.email)) {
                this.errorMessage = 'Email Adresse ungültig!';
            }
            else {
                this.userManagement
                    .registerUser(this.user)
                    .then(userProfile => {
                        this.userManagement
                            // User registeration succeeded => login the registered user.
                            .login(this.user, false)
                            .then((result) => {
                                this.$location.path('/Home');
                            })
                    })
                    .catch(err => {
                        this.errorMessage = err.message;
                    });

            }
        }
    }


    /**
     * Register the controller.
     */
    angular
        .module('home')
        .controller('RegisterUserCtrl', RegisterUserCtrl);
}
