'use strict';

module.exports = function (gulp) {
  var exec = require('child_process').exec;
  //var process = require('process');
  gulp.task('server', function (cb) {
    exec('node ../server/server.js', function (err, stdout, stderr) {
      console.log(stdout);
      console.log(stderr);
      cb(err);
    });
  });
};
