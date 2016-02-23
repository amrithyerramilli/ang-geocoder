'use strict';

/**
 * @ngdoc service
 * @name angGeocoderApp.utils
 * @description
 * # utils
 * Factory in the angGeocoderApp.
 */
angular.module('angGeocoderApp')
    .factory('utils', function($q, $log, geocoder) {

        function myAddress(input) {
            var self = this;
            self.id = input[0];
            self.firstName = input[1];
            self.lastName = input[2];
            self.houseNumber = input[3];
            self.streetName = input[4];
            self.city = input[5];
            self.country = input[6];
            self.addressString = [self.houseNumber, self.streetName, self.city, self.country].join(' ');
            self.isInvalid = false;
            self.validationMessage = '';
        }

        function checkRequiredProperties(data) {
            var requiredProperties = ['id', 'houseNumber', 'streetName', 'city', 'country'];
            for (var i = 0; i < requiredProperties.length; i++) {
                var requiredProperty = requiredProperties[i];
                if (!data[requiredProperty]) {
                    data.isInvalid = true;
                    data.validationMessage = requiredProperty + ' is required';
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

            // use a loop along with callbacks (promises)
            // Hail StackOverflow : http://stackoverflow.com/a/34662434

            var allThings = data.map(function(row) {
                var p = geocoder.geocode(row.addressString);
                return p.then(function(data) {
                    row.coordinates = data;
                }, function(err) {
                    row.coordinates = data;
                });
            });

            return $q.all(allThings);
        }

        function convertToCsv(data) {            
            var separator = ",";
            
            var headers = ["Id", "First Name", "Last Name", "Address", "Latitude", "Longitude"];
            var stringData = "";
            stringData += headers.join(separator) + "\n";
            
            for (var i = 0; i < data.length; i++) {
                var row = data[i];
                stringData += [row.id, row.firstName, row.lastName, row.addressString, row.coordinates.latitude, row.coordinates.longitude].join(separator) + "\n";
            }
            return stringData;
        }

        // Public API here
        return {
            processData: processData,
            validateSchema: validateSchema,
            generateGeocodes: generateGeocodes,
            convertToCsv: convertToCsv
        };
    });
