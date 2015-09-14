///<reference path='../../../typings/tsd.d.ts' />
module  Home.Controllers {
    'use strict';

    interface IDoodleRegisteredRouteParams extends ng.route.IRouteParamsService {
        doodleId: string;
        isNewDoodle;
    }
    class DoodleRegisteredCtrl {

        ctrlName:string;
        doodleId:string;
        isNewDoodle:boolean;
        doodleLink:string;

        // $inject annotation.
        // It provides $injector with information about dependencies to be injected into constructor
        // it is better to have it close to the constructor, because the parameters must match in count and type.
        // See http://docs.angularjs.org/guide/di
        public static $inject = ['$log', '$location', '$http', '$routeParams', 'Repository'];

        // dependencies are injected via AngularJS $injector
        constructor(private $log:ng.ILogService,
                    private $location:ng.ILocationService,
                    private $http:ng.IHttpService,
                    private $routeParams:IDoodleRegisteredRouteParams,
                    private repository:Home.Interfaces.IRepository) {

            this.ctrlName = 'DoodleRegisteredCtrl';
            this.doodleId = $routeParams.doodleId;
            this.isNewDoodle = $routeParams.isNewDoodle;
            this.doodleLink = 'http://localhost:3000/#/EditDoodle?doodleId=' + this.doodleId;
        }
    }


    /**
     * @ngdoc object
     * @name home.controller:DoodleRegisteredCtrl
     *
     * @description
     *
     */
    angular
        .module('home')
        .controller('DoodleRegisteredCtrl', DoodleRegisteredCtrl);
}
