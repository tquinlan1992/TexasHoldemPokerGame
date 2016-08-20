const test = require("tape");
const _ = require("lodash");
const TexasHoldemGame = require("../src/pokerGame/TexasHoldemGame");
const texasHoldemDeckConstants = require("../src/pokerGame/constants/texasHoldemGame");

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

    let texasTexasHoldemGame = new TexasHoldemGame({
        players: players1
    });

    let texasTexasHoldemGameJSON = texasTexasHoldemGame.toJSON();


    _.forEach(texasTexasHoldemGameJSON.players, player => {
        const playerJSON = player.toJSON();
        t.equal(playerJSON.hand.length, 2);
    });

    texasTexasHoldemGameJSON = texasTexasHoldemGame.toJSON();

    // At preFlop
    t.deepEqual(_.omit(texasTexasHoldemGameJSON, "players"), {
        status: texasHoldemDeckConstants.PRE_FLOP,
        flop: null,
        turn: null,
        river: null
    }, "texasTexasHoldemGame should be at preFlop");

    // At Flop
    texasTexasHoldemGame.dealNextTexasHoldemTableCards();

    texasTexasHoldemGameJSON = texasTexasHoldemGame.toJSON();

    t.deepEqual(_.omit(texasTexasHoldemGameJSON, ["flop", "players"]), {
        status: texasHoldemDeckConstants.FLOP,
        turn: null,
        river: null
    }, "texasTexasHoldemGame should be this at flop");

    t.equal(texasTexasHoldemGameJSON.flop.length, 3, "The flop should contain an array of 3 numbers");
    _.forEach(texasTexasHoldemGameJSON.flop, card => {
        t.true(_.isNumber(card), "Each flop card should be a number");
    });

    // At Turn
    texasTexasHoldemGame.dealNextTexasHoldemTableCards();

    texasTexasHoldemGameJSON = texasTexasHoldemGame.toJSON();

    t.deepEqual(_.omit(texasTexasHoldemGameJSON, ["flop", "turn", "players"]), {
        status: texasHoldemDeckConstants.TURN,
        river: null
    }, "texasTexasHoldemGame should be this at turn");

    t.equal(texasTexasHoldemGameJSON.flop.length, 3, "The flop should contain an array of 3 card");
    _.forEach(texasTexasHoldemGameJSON.flop, card => {
        t.true(_.isNumber(card), "Each flop card should be a number");
    });
    t.equal(texasTexasHoldemGameJSON.turn.length, 1, "The turn should contain an array with 1 number");
    t.true(_.isNumber(texasTexasHoldemGameJSON.turn[0]), "The turn card should be a number");

    // At River
    texasTexasHoldemGame.dealNextTexasHoldemTableCards();

    texasTexasHoldemGameJSON = texasTexasHoldemGame.toJSON();
    t.deepEqual(_.omit(texasTexasHoldemGameJSON, ["flop", "turn", "river", "players"]), {
        status: texasHoldemDeckConstants.RIVER
    }, "texasTexasHoldemGame should be this at river");

    t.equal(texasTexasHoldemGameJSON.flop.length, 3, "The flop should contain an array of 3 card");
    _.forEach(texasTexasHoldemGameJSON.flop, card => {
        t.true(_.isNumber(card), "Each flop card should be a number");
    });
    t.equal(texasTexasHoldemGameJSON.turn.length, 1, "The turn should contain an array with 1 number");
    t.true(_.isNumber(texasTexasHoldemGameJSON.turn[0]), "The turn card should be a number");
    t.equal(texasTexasHoldemGameJSON.river.length, 1, "The river should contain an array with 1 number");
    t.true(_.isNumber(texasTexasHoldemGameJSON.river[0]), "The river card should be a number");



    t.end();
});
