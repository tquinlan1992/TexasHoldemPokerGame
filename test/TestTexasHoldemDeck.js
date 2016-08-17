const test = require("tape");
const _ = require("lodash");
const TexasHoldemDeck = require("../src/pokerGame/TexasHoldemDeck");
const Player = require("../src/pokerGame/Player");
const texasHoldemDeckConstants = require("../src/pokerGame/constants/texasHoldemDeck");

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

function createTestPlayers(players) {
    return _.chain(players).map(player => {
        return new Player(player);
    }).value();
}

test("test create TexasHoldemDeck", t => {

    let createdPlayers = createTestPlayers(players1);

    let texasTexasHoldemDeck = new TexasHoldemDeck(createdPlayers);

    _.forEach(createdPlayers, player => {
        const playerJSON = player.toJSON();
        t.equal(playerJSON.hand.length, 2);
    });

    console.log('texasTexasHoldemDeck.toJSON()', texasTexasHoldemDeck.toJSON());

    let texasTexasHoldemDeckJSON = texasTexasHoldemDeck.toJSON();

    // At preFlop
    t.deepEqual(texasTexasHoldemDeckJSON, {
        status: texasHoldemDeckConstants.PRE_FLOP,
        flop: null,
        turn: null,
        river: null
    }, "texasTexasHoldemDeck should be at preFlop");

    // At Flop
    texasTexasHoldemDeck.dealNextTexasHoldemTableCards();

    texasTexasHoldemDeckJSON = texasTexasHoldemDeck.toJSON();

    t.deepEqual(_.omit(texasTexasHoldemDeckJSON, "flop"), {
        status: texasHoldemDeckConstants.FLOP,
        turn: null,
        river: null
    }, "texasTexasHoldemDeck should be this at flop");

    t.equal(texasTexasHoldemDeckJSON.flop.length, 3, "The flop should contain an array of 3 numbers");
    _.forEach(texasTexasHoldemDeckJSON.flop, card => {
        t.true(_.isNumber(card), "Each flop card should be a number");
    });

    // At Turn
    texasTexasHoldemDeck.dealNextTexasHoldemTableCards();

    texasTexasHoldemDeckJSON = texasTexasHoldemDeck.toJSON();

    t.deepEqual(_.omit(texasTexasHoldemDeckJSON, "flop", "turn"), {
        status: texasHoldemDeckConstants.TURN,
        river: null
    }, "texasTexasHoldemDeck should be this at turn");

    t.equal(texasTexasHoldemDeckJSON.flop.length, 3, "The flop should contain an array of 3 card");
    _.forEach(texasTexasHoldemDeckJSON.flop, card => {
        t.true(_.isNumber(card), "Each flop card should be a number");
    });
    t.equal(texasTexasHoldemDeckJSON.turn.length, 1, "The turn should contain an array with 1 number");
    t.true(_.isNumber(texasTexasHoldemDeckJSON.turn[0]), "The turn card should be a number");

    // At River
    texasTexasHoldemDeck.dealNextTexasHoldemTableCards();

    texasTexasHoldemDeckJSON = texasTexasHoldemDeck.toJSON();
    t.deepEqual(_.omit(texasTexasHoldemDeckJSON, ["flop", "turn", "river"]), {
        status: texasHoldemDeckConstants.RIVER
    }, "texasTexasHoldemDeck should be this at river");

    t.equal(texasTexasHoldemDeckJSON.flop.length, 3, "The flop should contain an array of 3 card");
    _.forEach(texasTexasHoldemDeckJSON.flop, card => {
        t.true(_.isNumber(card), "Each flop card should be a number");
    });
    t.equal(texasTexasHoldemDeckJSON.turn.length, 1, "The turn should contain an array with 1 number");
    t.true(_.isNumber(texasTexasHoldemDeckJSON.turn[0]), "The turn card should be a number");
    t.equal(texasTexasHoldemDeckJSON.river.length, 1, "The river should contain an array with 1 number");
    t.true(_.isNumber(texasTexasHoldemDeckJSON.river[0]), "The river card should be a number");



    t.end();
});
