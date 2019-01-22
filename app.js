'use strict';

const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');


//Information used for Oauth2
const CLIENT_ID = '3MVG9fTLmJ60pJ5KsAIY_SDssNp.LJMszR8cxFmXCR45fR..1Xi.sv0jjao4BRSkjUcKQyEeKq8t7Yko_07xB';
const CLIENT_SECRET_ID = '5771926701866322237';
const REDIRECT_URI = 'http%3A%2F%2Flocalhost%3A3000%2Foauth-redirect';


let app = express();


//Set where to find views and set the template engine to jade
app.set('views', __dirname + '/views');
app.set('view engine', 'pug');



app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: 'alexjones'
}));

//Allows the use of req.body property
console.log(bodyParser);
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());



//Load routes
app.use('/', require('./routes/indexRedirect'));
app.use('/oauth-redirect', require('./routes/oauthRedirect'));
app.use('/accountManager', require('./routes/accountManager'));
app.use('/contact', require('./routes/contact'));
app.use('/gradwellId', require('./routes/gradwellId'));




//Start listing*/
app.listen(3000);
