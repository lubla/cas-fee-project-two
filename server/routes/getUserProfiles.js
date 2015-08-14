/**
 * Created by Luzius on 14.08.2015.
 */
var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

/* GET profiles. */

var urlencodedParser = bodyParser.urlencoded({ extended: false })


router.get('/', urlencodedParser, function (req, res, next) {

    var mongoDb = req.mongoDb;

    var cursor = mongoDb.collection('userProfiles')
        .find({$and: [{"email": "Juni"}]});

    var result = cursor.toArray();

    result
        .then(function (result) {
            res.send(JSON.stringify(result))
        })
        .catch(next);


    //cursor.each(function(err, doc) {
    //    if(err) {
    //        throw(err);
    //    }
    //    if (doc != null) {
    //        result.push(doc);
    //    }
    //});


});

module.exports = router;