'use strict';

describe('Directive: fileReader', function () {

  // load the directive's module
  beforeEach(module('angGeocoderApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  // TODO : https://github.com/matteosuppo/angular-filereader/blob/master/tests/filereader.service.js

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<file-reader></file-reader>');
    element = $compile(element)(scope);
    // expect(element.text()).toBe('this is the fileReader directive');
  }));
});
