///<reference path='../../../typings/tsd.d.ts' />
module Home.Controllers{
  'use strict';

  class HomeCtrl {

    ctrlName: string;
    loginMessage: string;

    /**
     * Indicates if "My Doodles" link is shown.
     */
    showMyDoodles: boolean;

    // $inject annotation.
    // It provides $injector with information about dependencies to be injected into constructor
    // it is better to have it close to the constructor, because the parameters must match in count and type.
    // See http://docs.angularjs.org/guide/di
    public static $inject = ['$log', '$location', '$http', 'Repository'];

    // dependencies are injected via AngularJS $injector
    constructor(
        private $log : ng.ILogService,
        private $location : ng.ILocationService,
        private $http : ng.IHttpService,
        private repository:Home.Interfaces.IRepository) {

      this.ctrlName = 'HomeCtrl';
      this.$log.debug('home controller called');
      if(this.repository.loggedInUser != null)  {
        this.loginMessage = 'Hallo ' + this.repository.loggedInUser.email;
        this.showMyDoodles = true;
      }
      else {
        this.showMyDoodles = false;
      }
    }
  }


  /**
  * @ngdoc object
  * @name home.controller:HomeCtrl
  *
  * @description
  *
  */
  angular
    .module('home')
    .controller('HomeCtrl', HomeCtrl);
}
