'use strict';

var express = require('express');
var router = express.Router();
var apiCallout = require('../helper/apiCalls');
var valid = require('../middleware/valid');

router.get('/', valid.email, function(req, res) {

    var soqlQuery = 'SELECT Id, LastName, Account.Id, Account.Name FROM Contact WHERE email=\'' + req.query.email + '\'';
    var encodedQuery = encodeURI(soqlQuery);
    var endpoint = '/services/data/v44.0/query/?q=' + encodedQuery;
    console.log(encodedQuery);
 
    apiCallout(req, res, endpoint, 'GET', function(req, res, responseData, code) {
        if(code == 200) {
            if(responseData.totalSize == 0) {
                res.render('error', {
                    message : 'The email address you have entered does not belong to a contact in salesforce',
                    errorCode : 'CUSTOM_ERROR'
                }); 
            } else {
                console.log('successful');
                //res.json(responseData);
                res.render('contact', responseData);
            }

        } else if (code == 400 || code == 404) {
            res.render('error', responseData[0]);
        } 
    });
});

module.exports = router;