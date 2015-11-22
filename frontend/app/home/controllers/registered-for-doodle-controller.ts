///<reference path='../../../typings/tsd.d.ts' />


/**
 * Controller of the registered for doodle page.
 *
 *  The page shows that user has successfully registered for a doodle.
 *
 */

module RegisteredForDoodleCtrl {
  'use strict';

  /**
   * The registered for doodle  controller.
   */
  class RegisteredForDoodleCtrl {

    /**
     * The controller name. Used in unit tests.
     */
    ctrlName: string;

    /**
     * The controller injections.
     *
     * @type {string[]}
     */
    public static $inject = [
    ];

    // dependencies are injected via AngularJS $injector
    constructor() {
      this.ctrlName = 'RegisteredForDoodleCtrl';
    }
  }


  /**
   * Register the controller.
   */
  angular
    .module('home')
    .controller('RegisteredForDoodleCtrl', RegisteredForDoodleCtrl);
}
