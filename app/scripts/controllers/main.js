'use strict';

/**
 * @ngdoc function
 * @name angGeocoderApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the angGeocoderApp
 */
angular.module('angGeocoderApp')
    .controller('MainCtrl', function($scope, $log) {

        function validateSchema(rows) {
            var isValid = true;
            var requiredProperties = ['id', 'houseNumber', 'streetName', 'city', 'country'];

            angular.forEach(rows, function(value, key) {
                value.isValid = true;
                value.validationMessage = '';

                for (var i = 0; i < requiredProperties.length; i++) {
                    var requiredProperty = requiredProperties[i];
                    if (!value[requiredProperty]) {
                        value.isValid = false;
                        value.validationMessage = requiredProperty + ' is required';
                        isValid = false;
                        break;
                    }
                }
            });

            return isValid;
        }

        function uploadFile() {
            if (validateSchema($scope.parsedCsv)) {
                $log.info('validation successful. navigating to details page.')
            }
        }

        $scope.parsedCsv = [];
        $scope.uploadedFile = '';
        $scope.uploadEnabled = function() {
            // check if file has been uploaded
            return true;
        }

        $scope.uploadFile = uploadFile;
        
        

    });
