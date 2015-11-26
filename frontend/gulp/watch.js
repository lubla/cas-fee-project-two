'use strict';

module.exports = function (gulp, $, config) {
  gulp.task('browserSync', function () {
    $.browserSync({
      proxy: config.host,
      open: 'external',
      port: config.port,
    });
  });

  gulp.task('watch', function () {
    $.browserSync.reload();
    gulp.watch([config.unitTestFiles], ['unitTest']);
    gulp.watch([config.appFiles, '!' + config.unitTestFiles], ['build', $.browserSync.reload]);
  });
};
