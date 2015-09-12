///<reference path='../../typings/tsd.d.ts' />
module home {
    'use strict';

    angular
        .module('home')
        .config(config);

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
                //resolve: {
                //    'Something': ['Repository', function (repository:Home.Interfaces.IRepository) {
                //        return repository;
                //    }]
                //}

            })
            .when('/RegisterUser', {
                templateUrl: 'home/views/register-user.tpl.html',
                controller: 'RegisterUserCtrl',
                controllerAs: 'registerUser'
            })
            .when('/EditDoodle', {
                templateUrl: 'home/views/edit-doodle.tpl.html',
                controller: 'EditDoodleCtrl',
                controllerAs: 'editDoodle'
                //resolve: {
                //    'Something': ['Repository', function (repository:Home.Interfaces.IRepository) {
                //        return repository;
                //    }],
                //}

            })
            .when('/DoodleRegistered', {
              templateUrl: 'home/views/doodle-registered.tpl.html',
              controller: 'DoodleRegisteredCtrl',
              controllerAs: 'doodleRegistered'
            });
    }
}
