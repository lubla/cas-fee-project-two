/**
 * Created by Luzius on 03.08.2015.
 */
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    //var error = new Error("my error");
    //throw(error);

    var mongoDb = req.mongoDb;

    var cursor = mongoDb.collection('restaurants')
        .find({$and: [{"name": "Juni"}]})
        .sort({"name": 1, "address.zipcode": 1});

    //cursor.toArray(function (err, result) {
    //    if (err) {
    //        throw(err);
    //    }
    //    var error = new Error("my error");
    //    throw(error);
    //    res.send(JSON.stringify(result))
    //});

    var result = cursor.toArray();

    result
        .then(function (result) {
            var error = new Error("my error");
            throw(error);
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
