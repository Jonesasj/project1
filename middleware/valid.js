//Checks if the id is in the correct salesforce format, if it's not redirect to accountManager with an error message

module.exports = {};

module.exports.salesForceId = function(req, res, next) {
    var regEx = /[a-zA-Z0-9]{18}/;

    if(regEx.test(req.params.id) && req.params.id.toString().length === 18){
        next();
    } else {
        res.status(400).render('error', {
            message : 'The id you have entered is formatted incorrectly, it should be 18 characters long consisting of numbers and letters only',
            errorCode : 'CUSTOM_ERROR'
        });
    }
};

module.exports.email = function(req, res, next) {

    var regEx = /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;

    if(regEx.test(req.query.email)) {
        next();
    } else {
        res.status(400).render('error', {
            message : 'The email address you have entered is formatted incorrectly',
            errorCode : 'CUSTOM_ERROR'
        });
    }
};

module.exports.gradwellId = function(req, res, next) {
    var regEx = /[0-9]{1,7}/;

    console.log(req.params.gradId);

    if(regEx.test(req.params.gradId)){
        next();
    } else {
        res.status(400).render('error', {
            message : 'The gradwell Id you have entered is formatted incorrectly, it should be a 1-7 digit long number',
            errorCode : 'CUSTOM_ERROR'
        });
    }
};