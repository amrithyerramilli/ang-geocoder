'use strict';

/**
 * @ngdoc service
 * @name angGeocoderApp.utils
 * @description
 * # utils
 * Factory in the angGeocoderApp.
 */
angular.module('angGeocoderApp')
    .factory('utils', function($q, geocoder) {


        function myAddress(input) {
            var self = this;
            self.id = input[0];
            self.firstName = input[1];
            self.lastName = input[2];
            self.houseNumber = input[3];
            self.streetName = input[4];
            self.city = input[5];
            self.country = input[6];

            self.addressString = function() {
                return [self.houseNumber, self.streetName, self.city, self.country].join(' ')
            }
        }

        function checkRequiredProperties(data) {
            var requiredProperties = ['id', 'houseNumber', 'streetName', 'city', 'country'];
            for (var i = 0; i < requiredProperties.length; i++) {
                var requiredProperty = requiredProperties[i];
                if (!data[requiredProperty]) {
                    return false;
                }
            }
            return true;
        }

        function validateSchema(rows) {
            var fileIsValid = true;
            for (var i = 0; i < rows.length; i++) {
                var row = rows[i];
                if (!checkRequiredProperties(row)) {
                    fileIsValid = false;
                    break;
                }
            }
            return fileIsValid;
        }

        function processData(csv) {
            var separator = ',';
            var allTextLines = csv.split(/\r\n|\n/); // split on newline
            var lines = [];
            for (var i = 1; i < allTextLines.length; i++) {
                var data = allTextLines[i].split(separator); // split CSV
                lines.push(new myAddress(data));
            }
            return lines;
        }



        function generateGeocodes(data) {

            var allThings = data.map(function(row) {
                var p = geocoder.geocode(row.addressString());
                return p.then(function(data) {
                    row.coordinates = data;
                }, function(err) {
                    row.coordinates = data;
                });
            })
            // var allGeocodePromises = [];

            // for (var i = 0; i < data.length; i++) {
            //     var x = geocoder.geocode(data[i].addressString());
            //     x.then(data[i].setGeoData, data[i].setGeoData);

            //     allGeocodePromises.push(x);
            // }

            return $q.all(allThings);
        }

        // Public API here
        return {
            processData: processData,
            validateSchema: validateSchema,
            generateGeocodes: generateGeocodes
        };
    });
