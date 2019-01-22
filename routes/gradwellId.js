'use strict';

var express = require('express');
var router = express.Router();
var apiCallout = require('../helper/apiCalls');
var valid = require('../middleware/valid')

router.get('/', function(req, res) {
        //if the user has specified a record id reroute them
        if(!req.query.gradId){
            res.redirect('/accountManager/');
        } else {
            res.redirect('/gradwellId/' + req.query.gradId);
        }
});

router.get('/:gradId', valid.gradwellId, function(req, res) {

    var soqlQuery = 'SELECT Id, Name, GradwellId__c, (SELECT Id, LastName, Email FROM Contacts) FROM Account WHERE gradwellId__c=' + req.params.gradId;
    var encodedQuery = encodeURI(soqlQuery);
    var endpoint = '/services/data/v44.0/query/?q=' + encodedQuery;

    apiCallout(req, res, endpoint, 'GET', function(req, res, responseData, code) {
        if(code == 200) {
            if(responseData.totalSize == 0) {
                res.render('error', {
                    message : 'This gradwell Id does not belong to an account in salesforce',
                    errorCode : 'CUSTOM_ERROR'
                });
            }
            res.render('accountPage', responseData);
        } else if (code == 400) {
            res.render('error', responseData[0]);
        }
    });
    
});

module.exports = router;