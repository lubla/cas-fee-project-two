/**
 * Created by Luzius on 15.08.2015.
 */
/**
 * Created by Luzius on 14.08.2015.
 */
var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

/* POST user. */

router.post('/', bodyParser.json(), function (req, res, next) {
    req.repository.registerUser(req.body)
        .then(function (result) {
            res.send(result);
        })
        .catch(next);
});

module.exports = router;