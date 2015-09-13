/**
 * Created by Luzius on 13.09.2015.
 */
var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

/* GET doodles for user. */

var urlencodedParser = bodyParser.urlencoded({ extended: false });

router.get('/', urlencodedParser, function (req, res, next) {

    req.repository.getDoodlesForUser(req.query.userId)
        .then(function (result) {
            res.send(result);
        })
        .catch(next);
});

module.exports = router;