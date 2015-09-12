///<reference path='../../../typings/tsd.d.ts' />
module Home.Controllers {
    'use strict';

    class RegisterUserCtrl {

        ctrlName:string;
        user:Home.Services.User;
        passwordConfirmation:string;
        errorMessage:string;


        // $inject annotation.
        // It provides $injector with information about dependencies to be injected into constructor
        // it is better to have it close to the constructor, because the parameters must match in count and type.
        // See http://docs.angularjs.org/guide/di
        public static $inject = ['$log', '$location', '$http', 'Repository'];

        // dependencies are injected via AngularJS $injector
        constructor(private $log:ng.ILogService,
                    private $location:ng.ILocationService,
                    private $http:ng.IHttpService,
                    private repository:Home.Interfaces.IRepository) {

            this.ctrlName = 'RegisterUserCtrl';
            this.user = new Home.Services.User('', '');
            this.passwordConfirmation = '';
        }

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
                this.repository
                    .registerUser(this.user)
                    .then(userProfile => {
                        console.log(this.user);
                        this.repository
                            .login(this.user)
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
     * @ngdoc object
     * @name home.controller:RegisterUserCtrl
     *
     * @description
     *
     */
    angular
        .module('home')
        .controller('RegisterUserCtrl', RegisterUserCtrl);
}
