'use strict';

var express = require('express');
var router = express.Router();
var valid = require('../middleware/valid');
var apiCallout = require('../helper/apiCalls');
var auth = require('../middleware/auth');


router.use(auth);
router.get('/', function(req, res) {
    //if the user has specified a record id reroute them
    if(!req.query.id){
        res.status(200).render('accountManager');
    } else {
        res.redirect('/accountManager/' + req.query.id);
    }

});

router.get('/:id', valid.salesForceId, function(req, res) {
    //make an api call to retrieve the desired account record using the salesforce id
    //var endpoint = '/services/data/v44.0/sobjects/account/' + req.params.id;

    var soqlQuery = 'SELECT Id, Name, GradwellId__c, (SELECT Id, LastName, Email FROM Contacts) FROM Account WHERE Id=\'' + req.params.id + '\'';
    var encodedQuery = encodeURI(soqlQuery);
    var endpoint = '/services/data/v44.0/query/?q=' + encodedQuery;

    apiCallout(req, res, endpoint, 'GET', function(req, res, responseData, code) {
        if(code == 200) {
            if(responseData.totalSize == 0) {
                res.render('error', {
                    message : 'The requested account id does not belong to an account',
                    errorCode : 'CUSTOM_ERROR'
                });
            } else {
                res.render('accountPage', responseData);
            }
        } else if (code == 400) {
            res.render('error', responseData[0]);
        }
    });
});

router.post('/:id', valid.salesForceId, function(req, res) {
    var endpoint = '/services/data/v44.0/sobjects/account/' + req.params.id;


    
    //This callout updates the name of the account record
    apiCallout(req, res, endpoint, 'PATCH', function(req, res, responseData, code) {
        if(code == 204) {
            console.log('Status code: 204');
            res.redirect('/accountManager/' + req.params.id);
        } else if (code == 400) {
            res.render('error', responseData[0]);
        }

    });
});

router.post('/:id/createContact', valid.salesForceId, function(req, res) {
    req.body.AccountId = req.params.id;
    var endpoint = '/services/data/v44.0/sobjects/contact';

    apiCallout(req, res, endpoint, 'POST', function(req, res, responseData, code) {
        if(code == 201) {
            res.redirect('/accountManager/' + req.params.id);
        } else if (code == 400) {
            res.render('error', responseData[0]);
        }
   });
});


module.exports = router;