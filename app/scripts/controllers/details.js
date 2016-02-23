'use strict';

/**
 * @ngdoc function
 * @name angGeocoderApp.controller:DetailsCtrl
 * @description
 * # DetailsCtrl
 * Controller of the angGeocoderApp
 */
angular.module('angGeocoderApp')
    .controller('DetailsCtrl', function($rootScope, $scope, uiGmapGoogleMapApi, utils) {
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

        $scope.downloadFile = downloadFile;

        function downloadFile() {
            var csvString = utils.convertToCsv($scope.detailsData);
            // using HTML5 download attribute
            var a = angular.element('<a/>');
            a.attr({
              href : 'data:attachment/csv;charset=utf-8,' + encodeURI(csvString),  
              target : '_blank',
              download : 'downloaded geocodes.csv'
            })[0].click();
        }        
    });
