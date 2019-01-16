var assert = require('chai').assert;
var valid = require('../../middleware/valid');
var sinon = require('sinon');
var httpMocks = require('node-mocks-http');

var request = {};
var response = {};

describe('Test Valid Middleware', function() {
    beforeEach(function() {
        request = httpMocks.createRequest();
        response = httpMocks.createResponse();
    });

    it('Should call next() if 18 digits long', function(done) {
        request.params.id = 123456789012345678     //18 digit number
        valid(request, response, function(){
            done();
        });
    });
    it('Should respond with the status code of 400 if the id has 17 digits', function() {
        request.params.id = 12345678901234567      //17 digit number  
        valid(request, response, function() { console.log('This is only here because the middleware requires the thrid arguement to be a function'); });
        assert(response.statusCode === 400);
    });
});