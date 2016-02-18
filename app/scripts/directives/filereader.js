'use strict';

/**
 * @ngdoc directive
 * @name angGeocoderApp.directive:fileReader
 * @description
 * # fileReader
 */
angular.module('angGeocoderApp')
    .directive('fileReader', function() {
        return {
            restrict: 'A',
            scope: {
                fileReader: "="
            },
            link: function postLink(scope, element, attrs) {
                element.bind("change", function(changeEvent) {
                    if (changeEvent.target.files.length > 0) {
                        var reader = new FileReader();
                        reader.onload = function(loadEvent) {
                            scope.$apply(function() {
                                scope.fileReader = loadEvent.target.result;
                            });
                        }
                        reader.readAsText(changeEvent.target.files[0]);
                    }

                });
            }
        };
    });
