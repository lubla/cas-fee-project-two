/**
 * Created by Luzius on 21.09.2015.
 */
var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

/* GET doodle for register. */

var urlencodedParser = bodyParser.urlencoded({ extended: false });

router.get('/', urlencodedParser, function (req, res, next) {

    req.repository.getDoodleRegister(req.query.registerId)
        .then(function (result) {
            res.send(result);
        })
        .catch(next);
});

module.exports = router;
