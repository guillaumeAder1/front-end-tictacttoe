'use strict';

/**
 * @ngdoc overview
 * @name frontendApp
 * @description
 * # frontendApp
 *
 * Main module of the application.
 */
angular
    .module('frontendApp', [
        'ngAnimate',
        'ngCookies',
        'ngResource',
        'ngRoute',
        'ngSanitize',
        'ngTouch',
        //'esri.map'
    ])
    .config(function($routeProvider, $locationProvider) {
        $locationProvider.hashPrefix('');
        $routeProvider
            .when('/', {
                templateUrl: 'views/main.html',
                controller: 'MainCtrl',
                controllerAs: 'main'
            })
            .when('/about', {
                templateUrl: 'views/about.html',
                controller: 'AboutCtrl',
                controllerAs: 'about'
            })
            .when('/work', {
                templateUrl: 'views/work.html',
                controller: 'WorkCtrl',
                controllerAs: 'work'
            })
            .when('/esrimap', {
                templateUrl: 'views/esrimap.html',
                controller: 'EsrimapCtrl',
                controllerAs: 'esrimap'
            })
            .when('/sailsApp', {
              templateUrl: 'views/sailsapp.html',
              controller: 'SailsappCtrl',
              controllerAs: 'sailsApp'
            })
            .otherwise({
                redirectTo: '/'
            });
    });