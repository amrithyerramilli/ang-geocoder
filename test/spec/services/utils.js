'use strict';

describe('Service: utils - positive tests', function () {
  var stringData = "Id,First Name,Last Name,House Number,Street Name,City,Country\n1,A,Y,B6,L&T South City,Bangalore,India\n2,S,Y,2,L&T,Bangalore,India";
  var parsedCsv;
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
    parsedCsv = utils.processData(stringData);
    expect(parsedCsv.length).toBe(2);
  });

  it('should validate the rows', function() { 
    var isValid = utils.validateSchema(parsedCsv[0]);    
    expect(isValid).toBe(true);
  });

});

describe('Service: utils - negative tests', function () {
  var stringData = "Id,First Name,Last Name,House Number,Street Name,City,Country\n,A,Y,B6,L&T South City,Bangalore,India\n2,S,Y,2,L&T,Bangalore,India";
  var parsedCsv;
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
    parsedCsv = utils.processData(stringData);
    expect(parsedCsv.length).toBe(2);
  });

  it('should validate the rows and return false, with message as "id is required"', function() { 
    var isValid = utils.validateSchema(parsedCsv);    
    expect(isValid).toBe(false);
    expect(parsedCsv[0]['validationMessage']).toBe('id is required');
  });

});
