var gulp = require('gulp');
var tape = require('gulp-tape');
var tapColorize = require('tap-colorize');
var jshint = require('gulp-jshint');
var packageJSON  = require('./package');
var jshintConfig = packageJSON.jshintConfig;

gulp.task('test', function() {
  return gulp.src('test/*.js')
    .pipe(tape({
      reporter: tapColorize()
    }));
});

gulp.task('jshint', function() {
  return gulp.src('src/**/*.js')
    .pipe(jshint(jshintConfig))
    .pipe(jshint.reporter('default'))
    .pipe(jshint.reporter('fail'));
});

gulp.task('default', ['jshint', 'test']);
