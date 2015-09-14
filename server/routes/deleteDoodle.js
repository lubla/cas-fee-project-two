/**
 * Created by Luzius on 14.09.2015.
 */
var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

/* DELETE doodle. */

var urlencodedParser = bodyParser.urlencoded({ extended: false });

router.delete('/', urlencodedParser, function (req, res, next) {

    req.repository.deleteDoodle(req.query.doodleId)
        .then(function (result) {
            res.send(result);
        })
        .catch(next);
});

module.exports = router;