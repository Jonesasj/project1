'use strict';

var express = require('express');
var router = express.Router();
var auth = require('../middleware/auth');
var valid = require('../middleware/valid');
var https = require('https');
var querystring = require('querystring');


router.get('/', auth, function(req, res) {
    //if the user has specified a record id reroute them
    if(!req.query.id){
        res.render('accountManager');
    } else {
        res.redirect('/accountManager/' + req.query.id);
    }

});

router.get('/:id', valid, function(req, res) {
    //make an api call to retrieve the desired account record
    let myURL = new URL(req.session.instance_url);

    let options = {
        protocol : 'https:',
        host : myURL.host,
        method : 'GET',
        headers : {
            'Content-Type' : 'application/json',
            Authorization : req.session.token_type + ' ' + req.session.access_token
        },
        path : '/services/data/v44.0/sobjects/account/' + req.params.id
    }
    console.log(options);

    let resBody = "";
    let account = {};
    let resError = {};

    let request = https.request(options, function(response) {
        console.log(`STATUS: ${response.statusCode}`);
        console.log(`HEADERS: ${JSON.stringify(response.headers)}`);
        response.setEncoding('utf8');
        response.on('data', (data) => {
            resBody += data;
        });
        if(response.statusCode == '200') {
            response.on('end', () => {
                console.log('No more data in response');
                account = JSON.parse(resBody);
                console.log(account);
                res.render('accountPage', account);
                
            });
        } else if (response.statusCode == '400') {
            response.on('end', () => {
                console.log('here');
                resError = JSON.parse(resBody);
                console.log(resError);
                res.render('error', resError[0]);
            });
        }

    });

    request.on('error', (e) => {
        console.error(`problem with request: ${e.message}`);
    });

    request.end();
});

module.exports = router;