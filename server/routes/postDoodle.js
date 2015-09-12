/**
 * Created by Luzius on 12.09.2015.
 */
var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

/* POST doodle. */

router.post('/', bodyParser.json(), function (req, res, next) {
    req.repository.addDoodle(req.body)
        .then(function (result) {
            res.send(result);
        })
        .catch(next);
});

module.exports = router;