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

    var mongoDb = req.mongoDb;

    // Check if user already exists.

    var result = mongoDb.collection('userProfiles')
        .find({$and: [{'email': req.body.email}]})
        .toArray();

    result
        .then(function (result) {
            if(result.length > 0) {
                res.statusText = "Ein Benutzer für diese Email ist schon registriert";
                res.status(409); // Conflict.
                res.send('failed');
            }
            else {
                var writeResult = mongoDb.collection('userProfiles')
                    .insert(req.body);

                writeResult
                    .then(function (result) {
                        if(result.result.n == 1) {
                            res.send(result.ops[0]);
                        }
                        else {
                            throw new Error("Cannot register user");
                        }
                    })
                    .catch(next);
            }
        })
        .catch(next);

});

module.exports = router;