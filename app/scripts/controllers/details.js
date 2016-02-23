'use strict';

/**
 * @ngdoc function
 * @name angGeocoderApp.controller:DetailsCtrl
 * @description
 * # DetailsCtrl
 * Controller of the angGeocoderApp
 */
angular.module('angGeocoderApp')
    .controller('DetailsCtrl', function($rootScope, $scope, uiGmapGoogleMapApi) {
        $rootScope.currentStep = 2;
        $scope.isValid = $rootScope.geocodedData != null;
        $scope.myInfoWindow = null;
        uiGmapGoogleMapApi.then(function(maps) {
            $scope.detailsData = $rootScope.geocodedData;
            $scope.myInfoWindow = new google.maps.InfoWindow();
        });

        $scope.map = { center: { latitude: 45, longitude: -73 }, zoom: 8 };
        $scope.markerOptions = {
            draggable: true,
            // title: 'marker title',
            // label : 'marker label'
        }

        $scope.showMarkerInfo = function(marker, ev, model) {
            model.show = !model.show;
        };


        // $scope.detailsData = $rootScope.detailsData;
        // $scope.detailsData = angular.fromJson('[{"id":"1","firstName":"A","lastName":"Y","houseNumber":"B6","streetName":"L&T South City","city":"Bangalore","country":"India","coordinates":{"latitude":12.8878047,"longitude":77.5913984}},{"id":"2","firstName":"S","lastName":"Y","houseNumber":"2","streetName":"L&T","city":"Bangalore","country":"India","coordinates":{"latitude":12.8245676,"longitude":77.67465229999993}}]'); // mocking temporarily
    });
