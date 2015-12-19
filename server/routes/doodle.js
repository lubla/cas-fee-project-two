/**
 * Created by Luzius on 09.11.2015.
 */
/**
 * Created by Luzius on 12.09.2015.
 */

/**
 * Routes for the doodle functions of the doodle repository.
 */

var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });


/**
 * GET doodle for edit / GET doodle for register / GET doodles for user
 */
router.get('/', urlencodedParser, function (req, res, next) {

    if(req.query.registerId) {
        req.repository.getDoodleRegister(req.query.registerId)
            .then(function (result) {
                res.send(result);
            })
            .catch(next);
    }
    else if(req.query.doodleId) {
        req.repository.getDoodle(req.query.doodleId)
            .then(function (result) {
                res.send(result);
            })
            .catch(next);
    }
    else if(req.query.userId) {
        req.repository.getDoodlesForUser(req.query.userId)
            .then(function (result) {
                res.send(result);
            })
            .catch(next);
    }
});


/**
 * POST a doodle.
 */
router.post('/', bodyParser.json(), function (req, res, next) {
    req.repository.addDoodle(req.body)
        .then(function (result) {
            res.send(result);
        })
        .catch(next);
});

/**
 * PUT a doodle.
 */
router.put('/', bodyParser.json(), function (req, res, next) {
    req.repository.putDoodle(req.body)
        .then(function (result) {
            res.send(result);
        })
        .catch(next);
});

/**
 * DELETE a doodle.
 */
router.delete('/', urlencodedParser, function (req, res, next) {

    req.repository.deleteDoodle(req.query.doodleId)
        .then(function (result) {
            res.send(result);
        })
        .catch(next);
});

module.exports = router;
