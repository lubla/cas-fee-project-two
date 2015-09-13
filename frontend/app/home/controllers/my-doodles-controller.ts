///<reference path='../../../typings/tsd.d.ts' />
module MyDoodlesCtrl {
  'use strict';

  class MyDoodlesCtrl {

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
      vm.ctrlName = 'MyDoodlesCtrl';
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
