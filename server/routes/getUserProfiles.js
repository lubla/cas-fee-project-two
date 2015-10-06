/**
 * Created by Luzius on 14.08.2015.
 */
var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

/* GET profiles. */

var urlencodedParser = bodyParser.urlencoded({ extended: false });

router.get('/', urlencodedParser, function (req, res, next) {

    console.log("get user profiles");
    req.repository.getUserProfiles(req.query.email, req.query.passwordHash)
        .then(function (result) {
            res.send(result);
        })
       .catch(next);
});

module.exports = router;