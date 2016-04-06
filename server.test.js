var should = require('should'), 
    fs = require('fs'),
    request = require('request');

/* Globals */
var listings;

/*
  Describe blocks organize your unit tests into distinct categories of functionality.
 */
describe('PhDiverse Server Unit Tests', function() {
  describe('Server responds to requests', function() {
    it('should respond', function(done) {
      /*
        The request module allows us to make HTTP requests. This module could also be useful in 
        making API calls to web services you make use of in your application, such as Google Maps. 
       */
      request.get('http://localhost:8080', function(error, response, body) {
        /*
          The 'should' module is an assertion library. Assertions allow us to compare the functions
          that we are testing to the values we expect to recieve back. In this block, we expect that the 
          server should respond to a request made. 

          Note in this unit test we are only testing the existence of a response, and are not concerned 
          with what is contained in the response.
         */
        should.not.exist(error);
        should.exist(response);
        done();
      });
    });
  });
});