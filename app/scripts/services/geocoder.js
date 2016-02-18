'use strict';

/**
 * @ngdoc service
 * @name angGeocoderApp.geocoder
 * @description
 * # geocoder
 * Factory in the angGeocoderApp.
 */
angular.module('angGeocoderApp')
    .factory('geocoder', function($q, uiGmapGoogleMapApi) {
        var geocoder = null;
        // uiGmapGoogleMapApi is a promise.
        // The "then" callback function provides the google.maps object.
        uiGmapGoogleMapApi.then(function(maps) {
            geocoder = new google.maps.Geocoder();
        });


        function geocode(address) {
            var geocodePromise = $q.defer();
            geocoder.geocode({ address: address }, function(result, status) {
                if (status === google.maps.GeocoderStatus.OK) {
                    var latLng = {
                        latitude: result[0].geometry.location.lat(),
                        longitude: result[0].geometry.location.lng()
                    };
                    geocodePromise.resolve(latLng);

                } else {
                    geocodePromise.reject('geocode failed because : ' + status);
                }
            });
            return geocodePromise.promise;
        }

        function reverseGeocode(location) {

        }


        // Public API here
        return {
            geocode: geocode
        };
    });
