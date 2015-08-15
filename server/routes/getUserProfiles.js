/**
 * Created by Luzius on 14.08.2015.
 */
var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

/* GET profiles. */

var urlencodedParser = bodyParser.urlencoded({ extended: false });

router.get('/', urlencodedParser, function (req, res, next) {

    var mongoDb = req.mongoDb;

    var cursor = mongoDb.collection('userProfiles')
        .find({$and: [{'email': req.query.email}, {'passwordHash': req.query.passwordHash}]});

    var result = cursor.toArray();

    result
        .then(function (result) {
            res.send(JSON.stringify(result))
        })
        .catch(next);

});

module.exports = router;