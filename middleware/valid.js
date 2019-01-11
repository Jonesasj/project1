//Checks if the id is in the correct salesforce format, if it's not redirect to accountManager with an error message

module.exports = function(req, res, next) {
    var regEx = /[a-zA-Z0-9]{15,18}/;

    if(regEx.test(req.params.id)){
        console.log('valid');
        next();
    } else {
        console.log('error');
        res.render('error');
    }
};