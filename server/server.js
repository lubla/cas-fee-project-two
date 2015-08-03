/**
 * Created by Luzius on 03.08.2015.
 */
var express = require('express');
var logger = require('express-logger');
var path = require('path');

var app = express();

var logFilePath = path.join(__dirname, 'server.log')

app.use(logger({
    path: logFilePath,
    format: 'dev'
}));


var indexRoute = require('./routes/index');

app.use('/', indexRoute);

var server = app.listen(3000, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);
});
