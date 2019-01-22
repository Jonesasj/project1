'use strict';

var express = require('express');
var router = express.Router();
var https = require('https');
var querystring = require('querystring');
var apiCallout = require('../helper/apiCalls');

router.get('/', function(req, res) {

    var soqlQuery = 'SELECT Id, LastName, Account.Id, Account.Name FROM Contact WHERE email=\'' + req.query.email + '\'';
    var encodedQuery = encodeURI(soqlQuery);
    var endpoint = '/services/data/v44.0/query/?q=' + encodedQuery;
    console.log(encodedQuery);
 
    apiCallout(req, res, endpoint, 'GET', function(req, res, responseData, code) {
        if(code == 200) {
            if(responseData.totalSize == 0) {
                res.send('The email address you entered does not belong to a contact');  
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