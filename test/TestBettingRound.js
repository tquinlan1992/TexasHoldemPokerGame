const test = require("tape");
const _ = require("lodash");
const BettingRound = require("../src/pokerGame/BettingRound");
const bettingRoundConstants = require("../src/pokerGame/constants/bettingRound");

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

test("test create BettingRound and bet", t => {
    var bettingRound = new BettingRound({
        players: _.clone(players1),
        smallBlind: 5,
        bigBlind: 10,
        numberOfRaises: 4,
        dealer: players1[2],
        preflop: true
    });

    t.deepEqual(bettingRound.toJSON(), {
        roundCreated: true,
        preflop: true,
        playerToBetNext: players1[2],
        dealer: players1[2],
        smallBlind: 5,
        bigBlind: 10,
        numberOfRaises: 4,
        originalPlayers: players1,
        players: players1,
        status: bettingRoundConstants.ACTIVE,
        pot: "0"
    });

    t.deepEqual(bettingRound.placeBet({
        id: "tom",
        amount: "5"
    }), {
        success: false,
        message: "wrong player to bet"
    }, "wrong player to bet");

    t.deepEqual(bettingRound.placeBet({
        id: "bobby",
        amount: "5"
    }), {
        success: true,
        message: "bet placed",
        amountReduced: "5"
    }, "bet placed");

    t.end();
});

test("test BettingRound decideWhoToStartBetting on preflop players1", t => {
    var bettingRound = new BettingRound({
        players: _.clone(players1),
        smallBlind: 5,
        bigBlind: 10,
        numberOfRaises: 4,
        dealer: players1[0],
        preflop: true
    });

    t.deepEqual(bettingRound.toJSON().playerToBetNext, players1[0], "with tom as dealer");
    bettingRound = new BettingRound({
        players: players1,
        smallBlind: 5,
        bigBlind: 10,
        numberOfRaises: 4,
        dealer: players1[1],
        preflop: true
    });

    t.deepEqual(bettingRound.toJSON().playerToBetNext, players1[1], "with ryan as dealer");

    bettingRound = new BettingRound({
        players: players1,
        smallBlind: 5,
        bigBlind: 10,
        numberOfRaises: 4,
        dealer: players1[2],
        preflop: true
    });

    t.deepEqual(bettingRound.toJSON().playerToBetNext, players1[2], "with bobby as dealer");

    t.end();
});

const players2 = [{
    id: "tom",
    amount: "20"
}, {
    id: "ryan",
    amount: "20"
}, {
    id: "bobby",
    amount: "20"
}, {
    id: "cj",
    amount: "20"
}, {
    id: "brett",
    amount: "20"
}];

test("test BettingRound decideWhoToStartBetting on preflop players2", t => {
    var bettingRound = new BettingRound({
        players: players2,
        smallBlind: 5,
        bigBlind: 10,
        numberOfRaises: 4,
        dealer: players2[0],
        preflop: true
    });

    t.deepEqual(bettingRound.toJSON().playerToBetNext, players2[3], "with tom as dealer");

    bettingRound = new BettingRound({
        players: players2,
        smallBlind: 5,
        bigBlind: 10,
        numberOfRaises: 4,
        dealer: players2[1],
        preflop: true
    });

    t.deepEqual(bettingRound.toJSON().playerToBetNext, players2[4], "with ryan as dealer");

    bettingRound = new BettingRound({
        players: players2,
        smallBlind: 5,
        bigBlind: 10,
        numberOfRaises: 4,
        dealer: players2[2],
        preflop: true
    });

    t.deepEqual(bettingRound.toJSON().playerToBetNext, players2[0], "with bobby as dealer");

    bettingRound = new BettingRound({
        players: players2,
        smallBlind: 5,
        bigBlind: 10,
        numberOfRaises: 4,
        dealer: players2[3],
        preflop: true
    });

    t.deepEqual(bettingRound.toJSON().playerToBetNext, players2[1], "with cj as dealer");

    bettingRound = new BettingRound({
        players: players2,
        smallBlind: 5,
        bigBlind: 10,
        numberOfRaises: 4,
        dealer: players2[4],
        preflop: true
    });

    t.deepEqual(bettingRound.toJSON().playerToBetNext, players2[2], "with brett as dealer");

    t.end();
});
/*
test("test BettingRound decideWhoToStartBetting not on preflop", t => {
    var bettingRound = new BettingRound(createTestPlayers(players2), 5, 10, 4, "tom");

    t.equal(bettingRound.toJSON().idToBet, "tom", "with tom as dealer");

    bettingRound = new BettingRound(createTestPlayers(players2), 5, 10, 4, "ryan");

    t.equal(bettingRound.toJSON().idToBet, "ryan", "with ryan as dealer");

    bettingRound = new BettingRound(createTestPlayers(players2), 5, 10, 4, "bobby");

    t.equal(bettingRound.toJSON().idToBet, "bobby", "with bobby as dealer");

    t.end();
});
*/
