/**
 * Created by Luzius on 03.08.2015.
 */
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.send('Hello World2!');
});

module.exports = router;
