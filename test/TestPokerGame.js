const test = require("tape");
const PokerGame = require("../pokerGame/PokerGame");
const _ = require("lodash");

test("test play poker game", t => {
    var playersAmounts = [
        {
            name: "tom",
            amount: 20
        },
        {
            name: "ryan",
            amount: 20
        }
    ];
    var firstPokerGame = new PokerGame(playersAmounts);

    t.equal(firstPokerGame.getPlayersInfo().length, playersAmounts.length);

    // DEAL_HIGH_CARDS
    firstPokerGame.continueGame();
    _.forEach(firstPokerGame.getPlayersInfo(), player => {
        t.equal(player.hand.length, 1);
        _.forEach(player.hand, card => {
            t.true(_.isNumber(card));
        });
    });

    
    t.end();
});
