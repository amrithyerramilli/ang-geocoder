'use strict';

/**
 * @ngdoc function
 * @name angGeocoderApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the angGeocoderApp
 */
angular.module('angGeocoderApp')
    .controller('MainCtrl', function($scope, $log, $rootScope) {

        function validateSchema(rows) {
            var isValid = true;
            // var requiredProperties = ['id', 'houseNumber', 'streetName', 'city', 'country'];
            var requiredProperties = [0, 3, 4, 5, 6];

            angular.forEach(rows, function(value, key) {
                value[7] = true;
                value[8] = '';

                for (var i = 0; i < requiredProperties.length; i++) {
                    var requiredProperty = requiredProperties[i];
                    if (!value[requiredProperty]) {
                        value[7] = false;
                        value[8] = 'field is required';
                        isValid = false;
                        break;
                    }
                }
            });

            return isValid;
        }

        function processData(csv) {
            var separator = ',';
            var allTextLines = csv.split(/\r\n|\n/); // split on newline
            var lines = [];
            for (var i = 0; i < allTextLines.length; i++) {
                var data = allTextLines[i].split(separator); // split CSV
                lines.push(data);
            }
            return lines;
        }

        function uploadFile() {
            $scope.parsedCsv = processData($scope.uploadedFile);
            if (validateSchema($scope.parsedCsv)) {
                $log.info('validation successful. navigating to details page.');
                // convert each address to geocoded lat/lon
            }            
        }

        $scope.uploadedFile = null;
        $scope.uploadDisabled = function() {
            // check if file has been uploaded
            return $scope.uploadedFile === null;
        }

        $scope.uploadFile = uploadFile;
    });
