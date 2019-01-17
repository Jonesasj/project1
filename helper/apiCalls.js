var https = require('https');

module.exports = function (req, res, endpoint, method, success) {

    let myURL = new URL(req.session.instance_url);
    let reqData = JSON.stringify(req.body);

    let options = {
        protocol : 'https:',
        host : myURL.host,
        method : method,
        headers : {
            'Content-Type' : 'application/json',
            Authorization : req.session.token_type + ' ' + req.session.access_token
        },
        path : endpoint
    };

    let request = https.request(options, function(response) {
        var responseData = '';
        var responseObject = {};
        console.log(`STATUS: ${response.statusCode}`);
        console.log(`HEADERS: ${JSON.stringify(response.headers)}`);
        response.setEncoding('utf8');
        response.on('data', (data) => {
            responseData += data;
        });
        response.on('end', () => {
            console.log('No more data in response');
            console.log(responseData);
            if(!(responseData === '')){
                var responseObject = JSON.parse(responseData);
                console.log(responseObject);
            }
            success(req, res, responseObject, response.statusCode);

        });
    });
    request.on('error', (e) => {
        console.error(`problem with request: ${e.message}`);
    });

    request.write(reqData);
    request.end();
};