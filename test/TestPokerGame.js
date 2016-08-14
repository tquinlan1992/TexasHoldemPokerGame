const test = require("tape");
const PokerGame = require("../pokerGame/PokerGame");
const _ = require("lodash");
const pokerGameStatuses = require("../pokerGame/constants/pokerGameStatuses");
const texasHoldemDeckConstants = require("../pokerGame/constants/texasHoldemDeck");

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

test("test create poker game", t => {
    var pokerGame = new PokerGame(_.cloneDeep(playersAmounts));

    t.equal(pokerGame.getGameStatus(), pokerGameStatuses.DEAL_CARDS, "Game status should be DEAL_CARDS");
    t.equal(pokerGame.getPlayersInfo().length, playersAmounts.length, "playersInfo length should be equal to number of players");

    t.end();
});

test("test dealHighCards and voteForWinner", t => {
    var pokerGame = new PokerGame(_.cloneDeep(playersAmounts));

    pokerGame.dealHighCards();

    _.forEach(pokerGame.getPlayersInfo(), player => {
        t.equal(player.hand.length, 1, "The player should only have one hand");
        _.forEach(player.hand, card => {
            t.true(_.isNumber(card), "card should be a number");
        });
    });
    t.equal(pokerGame.getGameStatus(), pokerGameStatuses.VOTE_FOR_WINNER, "Game status should be VOTE_FOR_WINNER");

    pokerGame.voteForWinner("tom");
    t.equal(pokerGame.getGameWinner(), "tom", "The game winner should be tom");

    t.end();
});
test("test dealCardsForTexasHoldem and see flop", t => {
    var pokerGame = new PokerGame(_.cloneDeep(playersAmounts));

    pokerGame.dealCardsForTexasHoldem();

    _.forEach(pokerGame.getPlayersInfo(), player => {
        t.equal(player.hand.length, 1, "The player should only have one hand");
        _.forEach(player.hand, card => {
            t.true(_.isNumber(card), "card should be a number");
        });
    });
    t.equal(pokerGame.getGameStatus(), pokerGameStatuses.BET_CHECK_OR_FOLD, "Game status should be VOTE_FOR_WINNER");

    t.false(pokerGame.getTexasHoldemTableCards(texasHoldemDeckConstants.FLOP), "shouldn't be able to get the flop because the flop hasn't been dealt yet");

    t.end();
});
