// Requires the user to be logged in

const CLIENT_ID = '3MVG9fTLmJ60pJ5KsAIY_SDssNp.LJMszR8cxFmXCR45fR..1Xi.sv0jjao4BRSkjUcKQyEeKq8t7Yko_07xB';
const CLIENT_SECRET_ID = '5771926701866322237';
const REDIRECT_URI = 'http%3A%2F%2Flocalhost%3A3000%2Foauth-redirect';

module.exports = function(req, res, next) {
    if(!req.session.access_token) { //May need to add logic to deal with expirey of access tokens
        //if there is no access token login.
        let url = 'http://login.salesforce.com/services/oauth2/authorize'
                + '?response_type=code' 
                + '&client_id=' + CLIENT_ID
                + '&redirect_uri=' + REDIRECT_URI;
    
        res.redirect(url);
    } else {
        console.log('logged in');
        next();
    }
}