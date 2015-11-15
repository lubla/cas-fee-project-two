///<reference path='../../../typings/tsd.d.ts' />
module Home.Controllers {
    'use strict';

    class LoginCtrl {

        ctrlName:string;

        user:Home.Services.User;
        stayLoggedIn: boolean;
        errorMessage:string;

        // $inject annotation.
        // It provides $injector with information about dependencies to be injected into constructor
        // it is better to have it close to the constructor, because the parameters must match in count and type.
        // See http://docs.angularjs.org/guide/di
        public static $inject = ['$log', '$location', '$http', 'UserManagement'];

        // dependencies are injected via AngularJS $injector
        constructor(private $log:ng.ILogService,
                    private $location:ng.ILocationService,
                    private $http:ng.IHttpService,
                    private userManagement: Home.Interfaces.IUserManagement) {
            this.ctrlName = 'LoginCtrl';
            this.$log.debug('Login controller called');
            this.user = new Home.Services.User('', '');
            this.stayLoggedIn = true;
        }

        login():void {
            this.$log.debug('getUserProfiles');
            this.userManagement
                .login(this.user, this.stayLoggedIn)
                .then(userProfile => {
                    this.$location.path('/Home')
                })
                .catch(error => {
                    this.errorMessage = error.message;
                })

        }
    }


    /**
     * @ngdoc object
     * @name home.controller:LoginCtrl
     *
     * @description
     *
     */
    angular
        .module('home')
        .controller('LoginCtrl', LoginCtrl);
}
