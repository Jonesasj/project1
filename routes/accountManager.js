'use strict';

var express = require('express');
var router = express.Router();
var auth = require('./auth');

router.get('/', auth, function(req, res) {
    res.send("Main page");
});

module.exports = router;