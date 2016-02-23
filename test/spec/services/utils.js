'use strict';

describe('Service: utils', function () {

  // load the service's module
  beforeEach(module('angGeocoderApp'));

  // instantiate service
  var utils;
  beforeEach(inject(function (_utils_) {
    utils = _utils_;
  }));

  it('utils must be valid', function () {
    expect(!!utils).toBe(true);
  });

  it('should parse the csv and return an array of 2 objects', function () {
    var stringData = "Id,First Name,Last Name,House Number,Street Name,City,Country\n1,A,Y,B6,L&T South City,Bangalore,India\n2,S,Y,2,L&T,Bangalore,India";
    var parsedCsv = utils.processData(stringData);
    expect(parsedCsv.length).toBe(2);
  });

});
