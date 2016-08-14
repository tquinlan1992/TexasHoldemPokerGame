const test = require("tape");
const PokerGame = require("../pokerGame/PokerGame");
const _ = require("lodash");
const gameStatuses = require("../pokerGame/constants/gameStatuses");

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

    t.equal(pokerGame.getGameStatus(), gameStatuses.DEAL_CARDS, "Game status should be DEAL_CARDS");
    t.equal(pokerGame.getPlayersInfo().length, playersAmounts.length, "playersInfo length should be equal to number of players");

    t.end();
});

test("test DEAL_HIGH_CARDS and VOTE_FOR_WINNER", t => {
    pokerGame.dealHighCards();

    _.forEach(pokerGame.getPlayersInfo(), player => {
        t.equal(player.hand.length, 1, "The player should only have one hand");
        _.forEach(player.hand, card => {
            t.true(_.isNumber(card), "card should be a number");
        });
    });
    t.equal(pokerGame.getGameStatus(), gameStatuses.VOTE_FOR_WINNER, "Game status should be VOTE_FOR_WINNER");

    pokerGame.voteForWinner("tom");
    t.equal(pokerGame.getGameWinner(), "tom", "The game winner should be tom");

    t.end();
});
