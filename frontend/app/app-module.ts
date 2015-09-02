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
            'ngLocale',
            'mgcrea.ngStrap',
            'home',
            'mgcrea.ngStrap.tooltip',
            'mgcrea.ngStrap.helpers.dateParser',
            'mgcrea.ngStrap.datepicker',
        ]);
}
