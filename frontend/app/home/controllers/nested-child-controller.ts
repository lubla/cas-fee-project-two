///<reference path='../../../typings/tsd.d.ts' />
module Home.Controllers {
    'use strict';

    class NestedChildCtrl {

        ctrlName:string

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
            this.ctrlName = 'NestedChildCtrl';
            this.$log.debug('Child controller called');
        }
    }


    /**
     * @ngdoc object
     * @name home.controller:NestedChildCtrl
     *
     * @description
     *
     */
    angular
        .module('home')
        .controller('NestedChildCtrl', NestedChildCtrl);
}
