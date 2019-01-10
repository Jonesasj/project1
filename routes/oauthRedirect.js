'use strict';
var express = require('express');
var router = express.Router();
var https = require('https');

const CLIENT_ID = '3MVG9fTLmJ60pJ5KsAIY_SDssNp.LJMszR8cxFmXCR45fR..1Xi.sv0jjao4BRSkjUcKQyEeKq8t7Yko_07xB';
const CLIENT_SECRET_ID = '5771926701866322237';
const REDIRECT_URI = 'http%3A%2F%2Flocalhost%3A3000%2Foauth-redirect';

var token = {};

router.get('/', function(req, res){
    let data = 'grant_type=authorization_code' 
    + '&code=' + req.query.code
    + '&client_id=' + CLIENT_ID
    + '&client_secret=' + CLIENT_SECRET_ID
    + '&redirect_uri=' + REDIRECT_URI;

    let options = {
        protocol : 'https:',
        host : 'login.salesforce.com',
        method : 'POST',
        headers : {
            'Content-Type' : 'application/x-www-form-urlencoded',
            'Content-Length' : data.length
        },
        path : '/services/oauth2/token'
    };

    let stringData = "";

    let request = https.request(options, function(response) {
        console.log(`STATUS: ${response.statusCode}`);
        console.log(`HEADERS: ${JSON.stringify(response.headers)}`);
        response.setEncoding('utf8');
        response.on('data', (data) => {
            console.log(`BODY: ${data}`);
            stringData += data;
        });
        response.on('end', () => {
            console.log('No more data in response');
            token = JSON.parse(stringData);
            token.token_id = token.id;
            delete token.id;
            Object.assign(req.session, token);
            res.redirect('/accountManager');
        });
    });

    request.write(data);
    request.end();
});

module.exports = router;