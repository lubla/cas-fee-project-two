/**
 * Created by Luzius on 12.09.2015.
 */
var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

/* GET doodle. */

var urlencodedParser = bodyParser.urlencoded({ extended: false });

router.get('/', urlencodedParser, function (req, res, next) {

    req.repository.getDoodle(req.query.id)
        .then(function (result) {
            res.send(result);
        })
        .catch(next);
});

module.exports = router;
