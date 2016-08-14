const test = require("tape");
const PokerGame = require("../pokerGame/PokerGame");
const _ = require("lodash");

var pokerGame;

test("test create poker game", t => {
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
    pokerGame = new PokerGame(playersAmounts);

    t.equal(pokerGame.getPlayersInfo().length, playersAmounts.length);

    t.end();
});

test("test DEAL_HIGH_CARDS", t => {
    pokerGame.continueGame();
    
    _.forEach(pokerGame.getPlayersInfo(), player => {
        t.equal(player.hand.length, 1);
        _.forEach(player.hand, card => {
            t.true(_.isNumber(card));
        });
    });

    t.end();
});
