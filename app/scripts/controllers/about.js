'use strict';

/**
 * @ngdoc function
 * @name angGeocoderApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the angGeocoderApp
 */
angular.module('angGeocoderApp')
    .controller('AboutCtrl', function($rootScope) {
    	$rootScope.currentStep = 3;
        this.awesomeThings = [
            'HTML5 Boilerplate',
            'AngularJS',
            'Karma'
        ];
    });
