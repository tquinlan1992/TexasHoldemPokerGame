const gulp = require('gulp');
const PokerGameBrowserifyBundle = require("../util/PokerGameBrowserifyBunder");
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');

module.exports = function() {
    return PokerGameBrowserifyBundle()
        .pipe(source('PokerGame.js'))
        .pipe(buffer())
        .pipe(gulp.dest('./build/'));
};
