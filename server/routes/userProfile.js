/**
 * Created by Luzius on 09.11.2015.
 */
/**
 * Created by Luzius on 14.08.2015.
 */

/**
 * Routes for the user profile functions of the doodle repository.
 */

var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

var urlencodedParser = bodyParser.urlencoded({ extended: false });

/* . */
/**
 * GET the user profiles for a given email and password hash
 */
router.get('/', urlencodedParser, function (req, res, next) {
    req.repository.getUserProfiles(req.query.email, req.query.passwordHash)
        .then(function (result) {
            res.send(result);
        })
        .catch(next);
});

/**
 * POST a user profile (i.e. register a user.
 */
router.post('/', bodyParser.json(), function (req, res, next) {
    req.repository.registerUser(req.body)
        .then(function (result) {
            res.send(result);
        })
        .catch(next);
});

module.exports = router;