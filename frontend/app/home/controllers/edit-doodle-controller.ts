///<reference path='../../../typings/tsd.d.ts' />
module Home.Controllers {
    'use strict';

    interface IPersonalDetailRouteParams extends ng.route.IRouteParamsService {
        id: string;
    }

    class EditDoodleCtrl {

        ctrlName:string;
        doodle:Home.Interfaces.IDoodle;
        id:string;

        // $inject annotation.
        // It provides $injector with information about dependencies to be injected into constructor
        // it is better to have it close to the constructor, because the parameters must match in count and type.
        // See http://docs.angularjs.org/guide/di
        public static $inject = ['$log', '$location', '$http', '$routeParams', 'Repository'];

        // dependencies are injected via AngularJS $injector
        constructor(private $log:ng.ILogService,
                    private $location:ng.ILocationService,
                    private $http:ng.IHttpService,
                    private $routeParams:IPersonalDetailRouteParams,
                    private repository:Home.Interfaces.IRepository) {

            this.ctrlName = 'EditDoodleCtrl';
            if (!$routeParams.id) {
                // No id specified in route => Create a new doodle.
                this.repository.createNewDoodle().then(doodle => this.doodle = doodle);
            }
        }

        addDateProposal():void {
            this.$log.debug('addDateProposal');
            this.doodle.addNewDateProposal();

        }
        deleteDateProposal(id:string):void {
            this.$log.debug('deleteDateProposal');
            this.doodle.deleteDateProposal(id);
        }
    }


    /**
     * @ngdoc object
     * @name home.controller:EditDoodleCtrl
     *
     * @description
     *
     */
    angular
        .module('home')
        .controller('EditDoodleCtrl', EditDoodleCtrl);
}
