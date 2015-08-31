///<reference path='../../typings/tsd.d.ts' />
module home {
    'use strict';

    angular
        .module('home')
        .config(config)

    function config($routeProvider:ng.route.IRouteProvider) {
        $routeProvider
            .when('/home', {
                templateUrl: 'home/views/home.tpl.html',
                controller: 'HomeCtrl',
                controllerAs: 'home'
            })
            .when('/Login', {
                templateUrl: 'home/views/login.tpl.html',
                controller: 'LoginCtrl',
                controllerAs: 'login',
                resolve: {
                    'Something': ['Repository', function (repository:Home.Interfaces.IRepository) {
                        return repository;
                    }]
                }

            })
            .when('/RegisterUser', {
              templateUrl: 'home/views/register-user.tpl.html',
              controller: 'RegisterUserCtrl',
              controllerAs: 'registerUser'
            })
            .when('/NestedParent', {
              templateUrl: 'home/views/nested-parent.tpl.html',
              controller: 'NestedParentCtrl',
              controllerAs: 'nestedParent'
            })
            .when('/NestedChild', {
              templateUrl: 'home/views/nested-child.tpl.html',
              controller: 'NestedChildCtrl',
              controllerAs: 'nestedChild'
            });
    }
}
