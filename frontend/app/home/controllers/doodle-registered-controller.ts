///<reference path='../../../typings/tsd.d.ts' />
module  Home.Controllers {
    'use strict';

    interface IDoodleRegisteredRouteParams extends ng.route.IRouteParamsService {
        doodleId: string;
        registerId: string;
        isNewDoodle;
    }
    class DoodleRegisteredCtrl {

        ctrlName:string;
        doodleId:string;
        registerId:string;
        isNewDoodle:boolean;
        editDoodleLink:string;
        registerDoodleLink:string;

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
            this.registerId = $routeParams.registerId;
            this.isNewDoodle = $routeParams.isNewDoodle;
            var serverUrl = $location.absUrl().substr(0, $location.absUrl().length - $location.url().length)
            this.editDoodleLink = serverUrl + '/EditDoodle?doodleId=' + this.doodleId;
            this.registerDoodleLink = serverUrl + '/RegisterDoodle?registerId=' + this.registerId;
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
