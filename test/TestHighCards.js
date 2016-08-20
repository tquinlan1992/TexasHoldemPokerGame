const test = require("tape");
const HighCards = require("../src/pokerGame/HighCards");
const _ = require("lodash");

const players1 = [{
    id: "tom"
}, {
    id: "ryan"
}, {
    id: "bobby"
}];

test("test HighCards", t => {

    const highCards = new HighCards({
        players: players1
    });

    const highCardsJSON = highCards.toJSON();

    const winningPlayerFromCreatedPlayersArray = _.find(players1, player => {
        return player.id === highCardsJSON.winner.id;
    });

    t.deepEqual(_.omit(_.omit(highCards.toJSON(), "players").winner, "hand"), {
        id: winningPlayerFromCreatedPlayersArray.id,
    }, "highCards should equal this");

    t.end();
});

const players1WithHands = [{
    id: "tom",
    hand: [0]
}, {
    id: "ryan",
    hand: [1]
}, {
    id: "bobby",
    hand: [2]
}];

test("test HighCards with hands given", t => {

    const highCards = new HighCards({
        players: players1WithHands
    });

    const highCardsJSON = highCards.toJSON();

    t.deepEqual(highCardsJSON, {
        players: players1WithHands,
        winner: players1WithHands[2]
    }, "highCards should equal this");


    t.end();
});

const players2WithHands = [{
    id: "tom",
    hand: [2]
}, {
    id: "ryan",
    hand: [1]
}, {
    id: "bobby",
    hand: [0]
}];

test("test HighCards with hands given and winner", t => {

    const highCards = new HighCards({
        players: players2WithHands,
        winner: players2WithHands[0]
    });

    const highCardsJSON = highCards.toJSON();

    t.deepEqual(highCardsJSON, {
        players: players2WithHands,
        winner: players2WithHands[0]
    }, "highCards should equal this");


    t.end();
});
