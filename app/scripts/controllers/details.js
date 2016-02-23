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
            console.log($scope.detailsData);
            // var csvString = utils.convertToCsv($scope.detailsData);

            var csvString = "Id,First Name,Last Name,House Number,Street Name,City,Country\n1,A,Y,B6,L&T South City,Bangalore,India\n2,S,Y,2,L&T,Bangalore,India";

            // using HTML5 download attribute
            var a = angular.element('<a/>');
            a.attr({
              href : 'data:attachment/csv;charset=utf-8,' + encodeURI(csvString),  
              target : '_blank',
              download : 'downloaded geocodes.csv'
            })[0].click();
        }        
    });
