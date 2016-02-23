'use strict';

describe('Controller: MainCtrl', function() {

    // load the controller's module
    beforeEach(module('angGeocoderApp'));

    var MainCtrl,
        scope,
        rootScope;

    // Initialize the controller and a mock scope
    beforeEach(inject(function($controller, $rootScope) {
        rootScope = $rootScope;
        scope = $rootScope.$new();
        MainCtrl = $controller('MainCtrl', {
            $scope: scope,
            $rootScope: rootScope
                // place here mocked dependencies
        });
    }));

    it('should set the currentStep in rootScope to 1', function() {
        expect(rootScope.currentStep).toBe(1);
    });

    it('should initially set uploadedFile in scope to null', function() {
        expect(scope.uploadedFile).toBeNull();
    });

    it('when uploadedFile is set, uploadDisabled must be false', function() {
        scope.uploadedFile = "Id,First Name,Last Name,House Number,Street Name,City,Country\n1,A,Y,B6,L&T South City,Bangalore,India\n2,S,Y,2,L&T,Bangalore,India";
        scope.$digest(); // trigger a digest so that watch expressions are evaluated (since uploadDisabled changes based on a watch expression on uploadedFile)
        expect(scope.uploadDisabled).toBe(false);        
    });
    // utils will be responsible for parsing
    // geocoder will be responsible for geocoding
    // they will have their own tests
});
