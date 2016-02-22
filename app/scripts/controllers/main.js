'use strict';

/**
 * @ngdoc function
 * @name angGeocoderApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the angGeocoderApp
 */
angular.module('angGeocoderApp')
    .controller('MainCtrl', function($scope, $log, $rootScope, utils) {
        $rootScope.currentStep = 1;
        function uploadFile() {
            $rootScope.detailsData = null;
            $scope.parsedCsv = utils.processData($scope.uploadedFile);
            if (utils.validateSchema($scope.parsedCsv)) {

                $log.info('validation successful. generating geocoded lat/lon');
                utils.generateGeocodes($scope.parsedCsv)
                    .then(function() {
                        // all ok
                        $log.info('aal izz well, need to go to next step');
                        $rootScope.detailsData = $scope.parsedCsv;
                    }, function(err) {
                        $log.error('oops, geocode fail macha');
                        $log.error(err);
                    });
            }
        }

        $scope.uploadedFile = null;
        $scope.uploadDisabled = function() {
            // check if file has been uploaded
            return $scope.uploadedFile === null;
        }

        $scope.uploadFile = uploadFile;
        $scope.map = { center: { latitude: 45, longitude: -73 }, zoom: 8 };
    });
