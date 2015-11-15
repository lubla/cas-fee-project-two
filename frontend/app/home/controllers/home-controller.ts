///<reference path='../../../typings/tsd.d.ts' />
module Home.Controllers {
    'use strict';

    class HomeCtrl {

        ctrlName:string;
        loginMessage:string;

        /**
         * Indicates if "My Doodles" link is shown.
         */
        showMyDoodles:boolean;

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

            this.ctrlName = 'HomeCtrl';
            this.$log.debug('home controller called');
            this.SetupLoggedInControls();
        }

        private SetupLoggedInControls() {
            if (this.userManagement.loggedInUser != null) {
                this.showMyDoodles = true;
                this.loginMessage = 'Hallo ' + this.userManagement.loggedInUser.email;
            }
            else {
                this.showMyDoodles = false;
                this.loginMessage = null;
            }
        };

        public logout():void {
            this.userManagement.logout();
            this.SetupLoggedInControls();
        }
    }


    /**
     * @ngdoc object
     * @name home.controller:HomeCtrl
     *
     * @description
     *
     */
    angular
        .module('home')
        .controller('HomeCtrl', HomeCtrl);
}
