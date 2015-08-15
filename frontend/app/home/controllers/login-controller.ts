///<reference path='../../../typings/tsd.d.ts' />
module Home.Controllers {
    'use strict';

    class LoginCtrl {

        ctrlName:string;

        user:Home.Services.User;
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
            this.ctrlName = 'LoginCtrl';
            this.$log.debug('Login controller called');
            this.$log.debug('Repository name: ' + repository.name);
            this.user = new Home.Services.User();
            this.user.email = "test@test";
            this.user.password = "abc";

        }

        getUserProfiles():void {
            this.$log.debug('getUserProfiles');
            this.$http
                .get('/getUserProfiles?email=' + this.user.email + '&passwordHash=' + Home.Utilities.Hash.MD5(this.user.password))
                .then(response => {
                    this.$log.debug(response.data);
                    var userProfiles = response.data;
                    if(userProfiles instanceof Array) {
                        if(userProfiles.length === 0) {
                            this.errorMessage = "Passwort oder Email Adresse ungültig!";
                        }
                    }
                    else {
                        throw new Error('Unexpected response');
                    }

                })
                .catch(err => {
                    this.$log.debug('error:' + err);
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
