const assert = require('chai').assert;
const accountManager = require('accountManager');

describe('AccountManager Route', function() {
    describe('Testing base route', function() {
        beforeEach(function() {
            request = httpMocks.createRequest({
                session: {
                    access_token = 1
                }
            });
            response = httpMocks.createResponse();

        });
        it('Status code should be 200 if there is an access token and no id', function(done) {
            
        });

    });
});

