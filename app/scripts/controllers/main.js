'use strict';

/**
 * @ngdoc function
 * @name angGeocoderApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the angGeocoderApp
 */
angular.module('angGeocoderApp')
    .controller('MainCtrl', function($scope, $log, $rootScope, utils, $location) {
        $rootScope.currentStep = 1; // for navbar

        $scope.uploadedFile = null;
        $scope.uploadFile = uploadFile;
        $scope.showValidationErrors = false;
        $scope.uploadDisabled = true;

        // setup watch to enable/disable upload button
        $scope.$watch('uploadedFile', function(newValue, oldValue, scope) {
            if (newValue)
                $scope.uploadDisabled = false;
            else
                $scope.uploadDisabled = true;
        });

        function uploadFile() {
            $rootScope.geocodedData = null;
            $scope.parsedCsv = utils.processData($scope.uploadedFile);
            if (utils.validateSchema($scope.parsedCsv)) {
                $log.info('validation successful. generating geocoded lat/lon');

                $scope.showValidationErrors = false;
                utils.generateGeocodes($scope.parsedCsv)
                    .then(function() {
                        // all ok
                        $log.info('aal izz well, going to next step');
                        $rootScope.geocodedData = $scope.parsedCsv;
                        $location.path('/details');
                    }, function(err) {
                        $log.error('oops, geocode fail macha');
                        $log.error(err);
                    });
            } else {
                $scope.showValidationErrors = true;
                $log.log($scope.parsedCsv);
                $log.log('validation failed.');
            }
        }
    });
