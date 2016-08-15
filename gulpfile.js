const gulp = require('gulp');

gulp.task('test', require("./gulp/tasks/test"));

gulp.task('jshint', require("./gulp/tasks/jshint"));

gulp.task('build-PokerGame', require("./gulp/tasks/build-PokerGame"));

gulp.task('build-PokerGameMin', require("./gulp/tasks/build-PokerGameMin"));

gulp.task('watch', ['build-PokerGameMin'], function() {
    gulp.watch('./src/**/*.js', ['build']);
});


gulp.task('default', ['jshint', 'test']);

gulp.task('build', ['build-PokerGame', 'build-PokerGameMin']);
