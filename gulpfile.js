const gulp = require('gulp');

gulp.task('test', require("./gulp/tasks/test"));

gulp.task('jshint', require("./gulp/tasks/jshint"));

gulp.task('build-PokerGame', require("./gulp/tasks/build-PokerGame"));

gulp.task('watch', ['build-PokerGame'], function() {
    gulp.watch('./src/**/*.js', ['build']);
});

gulp.task('default', ['jshint', 'test']);

gulp.task('build', ['build-PokerGame']);
