///<reference path='../../../typings/tsd.d.ts' />
module Home.Controllers {
    'use strict';

    interface IRegisterDoodleRouteParams extends ng.route.IRouteParamsService {
        registerId: string;
    }
    class RegisterDoodleCtrl {

        ctrlName:string;
        doodle:Home.Interfaces.IDoodle;
        errorMessage:string;

        /**
         * Name of the person that registers.
         */
        name:string;

        private doodleRegisterNameKey = 'doodleRegisterName';


        // $inject annotation.
        // It provides $injector with information about dependencies to be injected into constructor
        // it is better to have it close to the constructor, because the parameters must match in count and type.
        // See http://docs.angularjs.org/guide/di
        public static $inject = ['$log', '$location', '$http', '$routeParams', 'Repository'];

        // dependencies are injected via AngularJS $injector
        constructor(private $log:ng.ILogService,
                    private $location:ng.ILocationService,
                    private $http:ng.IHttpService,
                    private $routeParams:IRegisterDoodleRouteParams,
                    private repository:Home.Interfaces.IRepository) {
            this.ctrlName = 'RegisterDoodleCtrl';

            // Use the name from the local storage (if available).
            this.name = localStorage.getItem(this.doodleRegisterNameKey);
            if(!this.name) {
                this.name = '';
            }

            repository
                .getDoodleRegister($routeParams.registerId)
                .then(doodle => this.doodle = doodle)
                .catch(err => {
                    this.$log.debug("problem getting doodle");
                    this.errorMessage = err.statusText;
                });

        }

        private getDatePoposal(dateProposalId:string):Home.Interfaces.IDateProposal {
            return Home.Utilities.ArrayUtilities.FindFirst(this.doodle.dateProposals, dateProposal => dateProposal._id === dateProposalId);

        }

        acceptDateProposal(dateProposalId:string) {
            console.log(this.name);
            this.doodle.addAcceptedNameToDateProposal(dateProposalId, this.name);
        }

        rejectDateProposal(dateProposalId:string) {
            this.doodle.deleteAcceptedNameFromDateProposal(dateProposalId, this.name);
        }

        private nameIsEmtpy():boolean {
            return this.name.length === 0;
        }

        private isRegistered(dateProposalId:string):boolean {
            var dateProposal = this.doodle.getDatePoposal(dateProposalId);
            return Home.Utilities.ArrayUtilities.FindFirst(dateProposal.acceptedBy, acceptedBy => acceptedBy === this.name) != null;
        }

        acceptDateProposalIsDisabled(dateProposalId:string):boolean {
            var isRegistered = this.isRegistered(dateProposalId);
            return this.nameIsEmtpy() || this.isRegistered(dateProposalId);
        }

        rejectDateProposalIsDisabled(dateProposalId:string):boolean {
            var isRegistered = this.isRegistered(dateProposalId);
            return !this.isRegistered(dateProposalId);
        }

        putDoodle():void {
            // Store the current name in the local storage.
            localStorage.setItem(this.doodleRegisterNameKey, this.name);

            this.repository
                .putDoodle(this.doodle)
                .then(doodle => {
                    this.$location.path('/RegisteredForDoodle');
                })
                .catch(err => {
                    this.errorMessage = err.statusText;
                });
        }
    }


    /**
     * @ngdoc object
     * @name home.controller:RegisterDoodleCtrl
     *
     * @description
     *
     */
    angular
        .module('home')
        .controller('RegisterDoodleCtrl', RegisterDoodleCtrl);
}
