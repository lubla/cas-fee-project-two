///<reference path='../../../typings/tsd.d.ts' />
module Home.Controllers {
    'use strict';

    interface IEditDoodleRouteParams extends ng.route.IRouteParamsService {
        doodleId: string;
    }

    class DoodleParticipateCtrl {

        ctrlName: string;
        doodle: Home.Interfaces.IDoodle;
        errorMessage: string;
        isNewDoodle: boolean;

        // $inject annotation.
        // It provides $injector with information about dependencies to be injected into constructor
        // it is better to have it close to the constructor, because the parameters must match in count and type.
        // See http://docs.angularjs.org/guide/di
        public static $inject = ['$log', '$location', '$http', '$routeParams', 'Repository'];

        // dependencies are injected via AngularJS $injector
        constructor(private $log: ng.ILogService,
            private $location: ng.ILocationService,
            private $http: ng.IHttpService,
            private $routeParams: IEditDoodleRouteParams,
            private repository: Home.Interfaces.IRepository) {

            this.ctrlName = 'DoodleParticipateCtrl';
            if (!$routeParams.doodleId) {
                // No id specified in route => Create a new doodle.
                this.isNewDoodle = true;
                this.repository.createNewDoodle().then(doodle => this.doodle = doodle);
            }
            else {
                // Id specified => Get the doodle from db.
                this.isNewDoodle = false;
                repository
                    .getDoodle($routeParams.doodleId)
                    .then(doodle => this.doodle = doodle)
                    .catch(err => {
                        this.$log.debug("problem getting doodle");
                        this.errorMessage = err.statusText;
                    });
            }

        }

        submitOptions(): void {
            console.log(this);
        }


        setPostOrPutDoodleLocation() {
            this.$location.search('doodleId', this.doodle._id);
            this.$location.search('isNewDoodle', this.isNewDoodle);
            this.$location.search('registerId', this.doodle.registerId);
            this.$location.path('/DoodleRegistered');
        }

        /**
         *  Posts the doodle if it is a new doodle, puts the doodle if it is an existing doodle.
         */
        postOrPutDoodle(): void {
            if (this.isNewDoodle) {
                this.$log.debug('postDoodle');
                this.repository
                    .postDoodle(this.doodle)
                    .then(doodle => {
                        this.setPostOrPutDoodleLocation();
                    })
                    .catch(err => {
                        this.errorMessage = err.statusText;
                    });
            }
            else {
                this.$log.debug('putDoodle');
                this.repository
                    .putDoodle(this.doodle)
                    .then(doodle => {
                        this.setPostOrPutDoodleLocation();
                    })
                    .catch(err => {
                        this.errorMessage = err.statusText;
                    });
            }

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
        .controller('DoodleParticipateCtrl', DoodleParticipateCtrl);
}
