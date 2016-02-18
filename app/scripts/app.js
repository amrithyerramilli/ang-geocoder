'use strict';

/**
 * @ngdoc overview
 * @name angGeocoderApp
 * @description
 * # angGeocoderApp
 *
 * Main module of the application.
 */
angular
    .module('angGeocoderApp', [
        'ngAnimate',
        'ngCookies',
        'ngResource',
        'ngRoute',
        'ngSanitize',
        'ngTouch',
        'uiGmapgoogle-maps'
    ])
    .config(function($routeProvider) {
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
            .when('/details', {
              templateUrl: 'views/details.html',
              controller: 'DetailsCtrl',
              controllerAs: 'details'
            })
            .otherwise({
                redirectTo: '/'
            });
    }).config(function(uiGmapGoogleMapApiProvider) {
        uiGmapGoogleMapApiProvider.configure({
            //    key: 'your api key',
            v: '3.20', //defaults to latest 3.X anyhow
            libraries: 'weather,geometry,visualization'
        });
    });
