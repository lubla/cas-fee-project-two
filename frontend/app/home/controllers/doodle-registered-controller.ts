///<reference path='../../../typings/tsd.d.ts' />


/**
 * Controller for the doodle registered page which is displayed when a new doodle has been stored in the doodle database.
 *
 * The page shows two links: To edit the doodle (for creator of the doodle) and to register for the doodle (for the doodle participiants).
 *
 */

module  Home.Controllers {
    'use strict';

    interface IDoodleRegisteredRouteParams extends ng.route.IRouteParamsService {
        doodleId: string;
        registerId: string;
        isNewDoodle;
    }

    /**
     * The doodle registered controller.
     */
    class DoodleRegisteredCtrl {

        /**
         * The controller name. Used in unit tests.
         */
        ctrlName:string;

        /**
         * The id of the doodle. Used to create the link to edit the doodle.
         */
        doodleId:string;

        /**
         * The register id of the doodle. Used the create link to register for the doodle.
         */
        registerId:string;

        /**
         * Indicates if the new doodle has been added to the database or if a existing doodle has been updated.
         */
        isNewDoodle:boolean;

        /**
         * The link to edit the doodle.
         */
        editDoodleLink:string;

        /**
         * The link to register for the doodle.
         */
        registerDoodleLink:string;

        copiedToClipboard():void {
          var target = $(event.currentTarget);
          target.addClass("highlight")
          setTimeout(function() {
            target.removeClass("highlight");
          }, 500);

        }


      /**
         * The controller injections.
         *
         * @type {string[]}
         */
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
     * Register the controller.
     */
    angular
        .module('home')
        .controller('DoodleRegisteredCtrl', DoodleRegisteredCtrl);
}
