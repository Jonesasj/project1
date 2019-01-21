'use strict';

var express = require('express');
var router = express.Router();
var auth = require('../middleware/auth');
var valid = require('../middleware/valid');
var https = require('https');
var querystring = require('querystring');
var apiCallout = require('../helper/apiCalls');


router.use(auth);
router.get('/', function(req, res) {
    //if the user has specified a record id reroute them
    if(!req.query.id && !req.query.gradId){
        res.status(200).render('accountManager');
    } else {
        res.redirect('/accountManager/' + req.query.id);
    }

});

// id and gradId return the same data by different means
//router.use('/:id', require('./getId'));
//router.use('/:gradId', require('./getGradId'));
//router.use('/:email', require('./getEmail'));

router.get('/:id', valid, function(req, res) {
    //make an api call to retrieve the desired account record using the salesforce id
    //var endpoint = '/services/data/v44.0/sobjects/account/' + req.params.id;

    var soqlQuery = 'SELECT Id, Name, (SELECT Id, LastName, Email FROM Contacts) FROM Account WHERE Id=\'' + req.params.id + '\'';
    var encodedQuery = encodeURI(soqlQuery);
    var endpoint = '/services/data/v44.0/query/?q=' + encodedQuery;

    apiCallout(req, res, endpoint, 'GET', function(req, res, responseData, code) {
        if(code == 200) {
            res.render('accountPage', responseData);
        } else if (code == 400) {
            res.render('error', responseData[0]);
        }
    });
});

router.post('/:id', valid, function(req, res) {
    console.log('please not here');
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

router.post('/:id/createContact', valid, function(req, res) {
    console.log('please here');
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