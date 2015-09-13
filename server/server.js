/**
 * Created by Luzius on 03.08.2015.
 */

'use strict'

var express = require('express');
var logger = require('express-logger');
var assert = require('assert');
var path = require('path');


function setupServer(repository) {

    var app = express();

    var logFilePath = path.join(__dirname, 'server.log');
    var myLogger = logger({
        path: logFilePath,
        format: 'dev'
    });

    app.use(myLogger);

    // Static files.

    app.use(express.static(path.join(__dirname, '../frontend/build/app')));

    // Make the repository available in the routes.
    app.use(function(req,res,next){
        req.repository = repository;
        next();
    });

    //app.use(bodyParser.urlencoded({ extended: false }));
    //app.use(bodyParser.json());

    // Routes.
    var indexRoute = require('./routes/index');
    app.use('/', indexRoute);
    app.use('/getUserProfiles', require('./routes/getUserProfiles'));
    app.use('/registerUser', require('./routes/registerUser'));
    app.use('/getDoodle', require('./routes/getDoodle'));
    app.use('/postDoodle', require('./routes/postDoodle'));
    app.use('/putDoodle', require('./routes/putDoodle'));

    // Forward 404 to error handler to error handler.
    app.use(function (req, res, next) {
        var err = new Error('Not Found: ' + req.originalUrl);
        err.status = 404;
        next(err);
    });


    function errorHandler(err, req, res, next) {
        if (res.headersSent) {
            return next(err);
        }

        var errorInfo;
        if (err instanceof Error) {
            errorInfo = err.stack;
        }
        else {
            errorInfo = err.toString();
        }

        console.log(errorInfo);
        next(err);
        // res.send(errorInfo.replace(/\n/g, '<br>'));
    }

    app.use(errorHandler);

    // Start server.
    var server = app.listen(3000, function () {
        var host = server.address().address;
        var port = server.address().port;

        console.log('Server listening at http://%s:%s', host, port);
    });

    // Close mongodb connection when server closes.
    server.on('close', function(){
        mongoDb.close();
    });
}

var repository = require('./database/repository');
var r = new repository.Repository(setupServer);

//var mongodbUrl = 'mongodb://localhost:27017/test';
//var c = MongoClient.connect(mongodbUrl, function(err, mongoDb) {
//    assert.equal(null, err);
//    setupServer(mongoDb);
//    console.log("Connected to server " + mongodbUrl);
////    db.close();
//});
//
//var t = c;

