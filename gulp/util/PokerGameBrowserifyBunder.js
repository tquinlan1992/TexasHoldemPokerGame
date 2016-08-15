const browserify = require('browserify');

module.exports = function PokerGameBrowserifyBundle() {
    return browserify({
            entries: './src/pokerGame/PokerGame.js',
            debug: true
        })
        .transform("babelify", {
            presets: ["es2015"]
        })
        .bundle();
};
