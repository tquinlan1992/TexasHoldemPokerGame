const test = require("tape");
const PokerGame = require("../src/pokerGame/PokerGame");
const _ = require("lodash");
const pokerGameStatuses = require("../src/pokerGame/constants/pokerGameStatuses");
const texasHoldemDeckConstants = require("../src/pokerGame/constants/texasHoldemDeck");

var players = [
    {
        id: "tom",
        amount: 20
    },
    {
        id: "ryan",
        amount: 20
    }
];

test("test create poker game", t => {
    var pokerGame = new PokerGame(_.cloneDeep(players));

    t.equal(pokerGame.toJSON().gameStatus, pokerGameStatuses.DEAL_CARDS, "Game status should be DEAL_CARDS");
    t.equal(pokerGame.toJSON().players.length, players.length, "playersInfo length should be equal to number of players");

    t.end();
});

test("test dealHighCards and setGameWinner", t => {
    var pokerGame = new PokerGame(_.cloneDeep(players));

    pokerGame.dealHighCards();

    _.forEach(pokerGame.toJSON().players, player => {
        t.equal(player.hand.length, 1, "The player should only have one hand");
        _.forEach(player.hand, card => {
            t.true(_.isNumber(card), "card should be a number");
        });
    });
    t.equal(pokerGame.toJSON().gameStatus, pokerGameStatuses.VOTE_FOR_WINNER, "Game status should be VOTE_FOR_WINNER");

    pokerGame.setGameWinner("tom");
    t.equal(pokerGame.toJSON().gameWinner, "tom", "The game winner should be tom");

    t.end();
});

test("test dealCardsForTexasHoldem and see flop", t => {
    var pokerGame = new PokerGame(_.cloneDeep(players));

    pokerGame.dealCardsForTexasHoldem();

    _.forEach(pokerGame.toJSON().players, player => {
        t.equal(player.hand.length, 1, "The player should only have one hand");
        _.forEach(player.hand, card => {
            t.true(_.isNumber(card), "card should be a number");
        });
    });
    t.equal(pokerGame.toJSON().gameStatus, pokerGameStatuses.BET_CHECK_OR_FOLD, "Game status should be VOTE_FOR_WINNER");

    t.false(pokerGame.getTexasHoldemTableCards(texasHoldemDeckConstants.FLOP), "shouldn't be able to get the flop because the flop hasn't been dealt yet");

    t.end();
});
