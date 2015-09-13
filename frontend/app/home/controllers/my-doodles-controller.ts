///<reference path='../../../typings/tsd.d.ts' />
module Home.Controllers {
    'use strict';

    class MyDoodlesCtrl {

        ctrlName:string;
        doodles:Array<Home.Interfaces.IDoodle>;
        errorMessage: string;


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
            this.ctrlName = 'MyDoodlesCtrl';
            repository
                .getDoodlesForUser(repository.loggedInUser._id)
                .then(doodles => this.doodles = doodles)
                .catch(err => {
                    this.$log.debug("problem getting doodlea");
                    this.errorMessage = err.statusText;
                });
        }
    }


    /**
     * @ngdoc object
     * @name home.controller:MyDoodlesCtrl
     *
     * @description
     *
     */
    angular
        .module('home')
        .controller('MyDoodlesCtrl', MyDoodlesCtrl);
}
