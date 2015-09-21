///<reference path='../../../typings/tsd.d.ts' />
module RegisteredForDoodleCtrl {
  'use strict';

  class RegisteredForDoodleCtrl {

    ctrlName: string

    // $inject annotation.
    // It provides $injector with information about dependencies to be injected into constructor
    // it is better to have it close to the constructor, because the parameters must match in count and type.
    // See http://docs.angularjs.org/guide/di
    public static $inject = [
    ];

    // dependencies are injected via AngularJS $injector
    constructor() {
      var vm = this;
      vm.ctrlName = 'RegisteredForDoodleCtrl';
    }
  }


  /**
  * @ngdoc object
  * @name home.controller:RegisteredForDoodleCtrl
  *
  * @description
  *
  */
  angular
    .module('home')
    .controller('RegisteredForDoodleCtrl', RegisteredForDoodleCtrl);
}
