///<reference path='../../../typings/tsd.d.ts' />
module Home.Controllers {
    'use strict';

    class LoginCtrl {

        ctrlName:string;

        user: Home.Services.User;


        // $inject annotation.
        // It provides $injector with information about dependencies to be injected into constructor
        // it is better to have it close to the constructor, because the parameters must match in count and type.
        // See http://docs.angularjs.org/guide/di
        public static $inject = ['$log', '$location', '$http', 'Repository'];

        // dependencies are injected via AngularJS $injector
        constructor(private $log:ng.ILogService, private $location:ng.ILocationService, private $http:ng.IHttpService, private repository: Home.Interfaces.IRepository) {
            this.ctrlName = 'LoginCtrl';
            this.$log.debug('Login controller called');
            this.$log.debug('Repository name: ' + repository.name);
            this.user = new Home.Services.User();
            this.user.email = "test@test";
            this.user.passwordHash = "abc";

        }

        getUserProfiles():void {
            this.$log.debug('getUserProfiles');
            this.$http({
                method: "get",
                url: "/getUserProfiles",
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                data: this.user
            }).success(function(result){
                console.log(result);
            });

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
