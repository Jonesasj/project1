//Checks if the id is in the correct salesforce format, if it's not redirect to accountManager with an error message

module.exports = function(req, res, next) {
    var regEx = /[a-zA-Z0-9]{18}/;

    if(regEx.test(req.params.id) && req.params.id.toString().length === 18){
        //console.log('valid');
        next();
    } else {
        /*console.log('id: ' + req.params.id);
        console.log('length: ' + req.params.id.length);
        console.log(typeof req.params.id);
        console.log('error');*/
        console.log('3');
        console.log(req.params.id);
        res.status(400).render('error');
    }
};