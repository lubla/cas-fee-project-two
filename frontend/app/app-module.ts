///<reference path='../typings/tsd.d.ts' />
module frontend {
  'use strict';

  /* @ngdoc object
   * @name frontend
   * @description
   *
   */
  angular
    .module('frontend', [
      'ngRoute',
      'mgcrea.ngStrap',
      'home',
      'angular-clipboard'
        //, 'angular-linq'
    ]);

}
