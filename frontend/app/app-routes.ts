///<reference path='../typings/tsd.d.ts' />
module frontend {
  'use strict';

  angular
    .module('frontend')
    .config(config);

  function config($routeProvider: ng.route.IRouteProvider) {
    $routeProvider.otherwise({
      redirectTo: '/home'
    });
  }
}
