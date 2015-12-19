/**
 * Created by Luzius on 03.08.2015.
 */

/**
 * Doodle server startup module.
 *
 * The server is based on the express and mongo db.
 */

'use strict';

var express = require('express');
var logger = require('express-logger');
var path = require('path');

/**
 * setupServer is called when the connection to the mongo db is established.
 *
 * @param repository   The repository instance with the mongo db connection.
 */
function setupServer(repository) {

    // Initialize the express app.
    var app = express();

    // Log the incoming requester to a log file in the folder where the current script is stored.
    var logFilePath = path.join(__dirname, 'server.log');
    var myLogger = logger({
        path: logFilePath,
        format: 'dev'
    });
    app.use(myLogger);

    //
    // Serve the static files.
    //
    app.use(express.static(path.join(__dirname, '../frontend/build/app')));

    // Make the repository available in the routes.
    app.use(function(req,res,next){
        req.repository = repository;
        next();
    });

    // Routes.

    // REST interface for the user profiles
    app.use('/userProfile', require('./routes/userProfile'));

    // REST interface for the doodles.
    app.use('/doodle', require('./routes/doodle'));

    // Forward 404 error to the server error handler (errorHandler).
    app.use(function (req, res, next) {
        var err = new Error('Not Found: ' + req.originalUrl);
        err.status = 404;
        next(err);
    });


    /**
     * Server error handler.
     *
     * @param err
     * @param req
     * @param res
     * @param next
     * @returns {*}
     */
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

        err.stack = undefined; // Don't send the stack to  the browser.
        next(err);
    }

    app.use(errorHandler);

    // Start server.
//
//    var server = app.listen(80, '0.0.0.0', function () { // accept clients from any IP, i.e. from a mobile within the local network.

    var server = app.listen(3000, function () {   // accept clients from localhost only.
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

// Create an instance of the repository which is then passed to the setupServer callback.
new repository.Repository(setupServer);


