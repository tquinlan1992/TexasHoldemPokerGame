const gulp = require('gulp');
const PokerGameBrowserifyBundle = require("../util/PokerGameBrowserifyBunder");
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const sourcemaps = require('gulp-sourcemaps');
const uglify = require('gulp-uglify');

module.exports = function() {
    return PokerGameBrowserifyBundle()
        .pipe(source('PokerGame.min.js'))
        .pipe(buffer())
        .pipe(sourcemaps.init())
        .pipe(uglify())
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./build/'));
};
