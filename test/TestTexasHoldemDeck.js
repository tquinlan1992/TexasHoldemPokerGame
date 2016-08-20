const test = require("tape");
const _ = require("lodash");
const TexasHoldemGame = require("../src/pokerGame/TexasHoldemGame");
const texasHoldemDeckConstants = require("../src/pokerGame/constants/texasHoldemGame");
const Deck = require("../src/pokerGame/Deck");

const players1 = [{
    id: "tom",
    amount: "20"
}, {
    id: "ryan",
    amount: "20"
}, {
    id: "bobby",
    amount: "20"
}];

test("test create TexasHoldemGame", t => {

    let texasHoldemGame = new TexasHoldemGame({
        players: players1
    });

    let texasHoldemGameJSON = texasHoldemGame.toJSON();


    _.forEach(texasHoldemGameJSON.players, player => {
        const playerJSON = player.toJSON();
        t.equal(playerJSON.hand.length, 2);
    });

    texasHoldemGameJSON = texasHoldemGame.toJSON();

    // At preFlop
    t.deepEqual(_.omit(texasHoldemGameJSON, "players", "deck"), {
        status: texasHoldemDeckConstants.PRE_FLOP,
        flop: null,
        turn: null,
        river: null
    }, "texasHoldemGame should be at preFlop");

    // At Flop
    texasHoldemGame.dealNextTexasHoldemTableCards();

    texasHoldemGameJSON = texasHoldemGame.toJSON();

    t.deepEqual(_.omit(texasHoldemGameJSON, ["flop", "players", "deck"]), {
        status: texasHoldemDeckConstants.FLOP,
        turn: null,
        river: null
    }, "texasHoldemGame should be this at flop");

    t.equal(texasHoldemGameJSON.flop.length, 3, "The flop should contain an array of 3 numbers");
    _.forEach(texasHoldemGameJSON.flop, card => {
        t.true(_.isNumber(card), "Each flop card should be a number");
    });

    // At Turn
    texasHoldemGame.dealNextTexasHoldemTableCards();

    texasHoldemGameJSON = texasHoldemGame.toJSON();

    t.deepEqual(_.omit(texasHoldemGameJSON, ["flop", "turn", "players", "deck"]), {
        status: texasHoldemDeckConstants.TURN,
        river: null
    }, "texasHoldemGame should be this at turn");

    t.equal(texasHoldemGameJSON.flop.length, 3, "The flop should contain an array of 3 card");
    _.forEach(texasHoldemGameJSON.flop, card => {
        t.true(_.isNumber(card), "Each flop card should be a number");
    });
    t.equal(texasHoldemGameJSON.turn.length, 1, "The turn should contain an array with 1 number");
    t.true(_.isNumber(texasHoldemGameJSON.turn[0]), "The turn card should be a number");

    // At River
    texasHoldemGame.dealNextTexasHoldemTableCards();

    texasHoldemGameJSON = texasHoldemGame.toJSON();
    t.deepEqual(_.omit(texasHoldemGameJSON, ["flop", "turn", "river", "players", "deck"]), {
        status: texasHoldemDeckConstants.RIVER
    }, "texasHoldemGame should be this at river");

    t.equal(texasHoldemGameJSON.flop.length, 3, "The flop should contain an array of 3 card");
    _.forEach(texasHoldemGameJSON.flop, card => {
        t.true(_.isNumber(card), "Each flop card should be a number");
    });
    t.equal(texasHoldemGameJSON.turn.length, 1, "The turn should contain an array with 1 number");
    t.true(_.isNumber(texasHoldemGameJSON.turn[0]), "The turn card should be a number");
    t.equal(texasHoldemGameJSON.river.length, 1, "The river should contain an array with 1 number");
    t.true(_.isNumber(texasHoldemGameJSON.river[0]), "The river card should be a number");



    t.end();
});


test("test create TexasHoldemGame", t => {

    const newDeck = new Deck();

    const playerCards = [
        newDeck.dealCards(2),
        newDeck.dealCards(2),
        newDeck.dealCards(2)
    ];

    const players1WithHands = [{
        id: "tom",
        amount: "20",
        hand: playerCards[0]
    }, {
        id: "ryan",
        amount: "20",
        hand: playerCards[1]
    }, {
        id: "bobby",
        amount: "20",
        hand: playerCards[2]
    }];

    let texasHoldemGame = new TexasHoldemGame({
        players: players1WithHands,
        deck: newDeck.toJSON().deck,
        status: texasHoldemDeckConstants.PRE_FLOP
    });

    let texasHoldemGameJSON = texasHoldemGame.toJSON();


    _.forEach(texasHoldemGameJSON.players, (player, index) => {
        const playerJSON = player.toJSON();
        t.deepEqual(playerJSON.hand, playerCards[index], "player's cards should equal init");
        t.equal(playerJSON.hand.length, 2, "players should have 2 cards");
    });
    t.deepEqual(texasHoldemGameJSON.deck, newDeck.toJSON());

    // At preFlop
    t.deepEqual(_.omit(texasHoldemGameJSON, "players", "deck"), {
        status: texasHoldemDeckConstants.PRE_FLOP,
        flop: null,
        turn: null,
        river: null
    }, "texasHoldemGame should be at preFlop");

    // At Flop
    texasHoldemGame.dealNextTexasHoldemTableCards();

    texasHoldemGameJSON = texasHoldemGame.toJSON();

    t.deepEqual(_.omit(texasHoldemGameJSON, ["flop", "players", "deck"]), {
        status: texasHoldemDeckConstants.FLOP,
        turn: null,
        river: null
    }, "texasHoldemGame should be this at flop");

    t.equal(texasHoldemGameJSON.flop.length, 3, "The flop should contain an array of 3 numbers");
    _.forEach(texasHoldemGameJSON.flop, card => {
        t.true(_.isNumber(card), "Each flop card should be a number");
    });

    // At Turn
    texasHoldemGame.dealNextTexasHoldemTableCards();

    texasHoldemGameJSON = texasHoldemGame.toJSON();

    t.deepEqual(_.omit(texasHoldemGameJSON, ["flop", "turn", "players", "deck"]), {
        status: texasHoldemDeckConstants.TURN,
        river: null
    }, "texasHoldemGame should be this at turn");

    t.equal(texasHoldemGameJSON.flop.length, 3, "The flop should contain an array of 3 card");
    _.forEach(texasHoldemGameJSON.flop, card => {
        t.true(_.isNumber(card), "Each flop card should be a number");
    });
    t.equal(texasHoldemGameJSON.turn.length, 1, "The turn should contain an array with 1 number");
    t.true(_.isNumber(texasHoldemGameJSON.turn[0]), "The turn card should be a number");

    // At River
    texasHoldemGame.dealNextTexasHoldemTableCards();

    texasHoldemGameJSON = texasHoldemGame.toJSON();
    t.deepEqual(_.omit(texasHoldemGameJSON, ["flop", "turn", "river", "players", "deck"]), {
        status: texasHoldemDeckConstants.RIVER
    }, "texasHoldemGame should be this at river");

    t.equal(texasHoldemGameJSON.flop.length, 3, "The flop should contain an array of 3 card");
    _.forEach(texasHoldemGameJSON.flop, card => {
        t.true(_.isNumber(card), "Each flop card should be a number");
    });
    t.equal(texasHoldemGameJSON.turn.length, 1, "The turn should contain an array with 1 number");
    t.true(_.isNumber(texasHoldemGameJSON.turn[0]), "The turn card should be a number");
    t.equal(texasHoldemGameJSON.river.length, 1, "The river should contain an array with 1 number");
    t.true(_.isNumber(texasHoldemGameJSON.river[0]), "The river card should be a number");



    t.end();
});
