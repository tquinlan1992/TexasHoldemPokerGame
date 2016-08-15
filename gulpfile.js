var gulp = require('gulp');
var tape = require('gulp-tape');
var tapColorize = require('tap-colorize');
var jshint = require('gulp-jshint');
var packageJSON = require('./package');
var jshintConfig = packageJSON.jshintConfig;
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');

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

gulp.task('build', function() {
    return browserify({
            entries: './src/pokerGame/PokerGame.js',
            debug: true
        })
        .transform("babelify", {
            presets: ["es2015"]
        })
        .bundle()
        .pipe(source('PokerGame.min.js'))
        .pipe(buffer())
        .pipe(sourcemaps.init())
        .pipe(uglify())
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./build/'));
});

gulp.task('watch', ['build'], function() {
    gulp.watch('./src/js/*.js', ['build']);
});


gulp.task('default', ['jshint', 'test']);
