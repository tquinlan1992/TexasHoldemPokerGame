const test = require("tape");
const _ = require("lodash");
const BettingRound = require("../src/pokerGame/BettingRound");
const Player = require("../src/pokerGame/Player");

const players = [
    {
        id: "tom",
        amount: 20
    },
    {
        id: "ryan",
        amount: 20
    },
    {
        id: "bobby",
        amount: 20
    }
];

function createTestPlayers() {
    return _.chain(players).map(player => {
        return new Player(player);
    }).value();
}

test("test create BettingRound", t => {
    var bettingRound = new BettingRound(createTestPlayers(), 5, 10, 4, "bobby", true);

    t.deepEqual(bettingRound.toJSON(), {
        roundCreated: true,
        preflop: true,
        idToBet: "bobby",
        dealerId: "bobby",
        smallBlind: 5,
        bigBlind: 10,
        numberOfRaises: 4,
        players: [
            {
                id: "tom",
                amount: 20,
                hand: []
            },
            {
                id: "ryan",
                amount: 20,
                hand: []
            },
            {
                id: "bobby",
                amount: 20,
                hand: []
            }
        ]
    });

    t.end();
});

test("test BettingRound decideWhoToStartBetting on preflop", t => {
    var bettingRound = new BettingRound(createTestPlayers(), 5, 10, 4, "tom", true);

    t.equal(bettingRound.toJSON().idToBet, "tom", "with tom as dealer");

    bettingRound = new BettingRound(createTestPlayers(), 5, 10, 4, "ryan", true);

    t.equal(bettingRound.toJSON().idToBet, "ryan", "with ryan as dealer");

    bettingRound = new BettingRound(createTestPlayers(), 5, 10, 4, "bobby", true);

    t.equal(bettingRound.toJSON().idToBet, "bobby", "with bobby as dealer");

    t.end();
});

test("test BettingRound decideWhoToStartBetting not on preflop", t => {
    var bettingRound = new BettingRound(createTestPlayers(), 5, 10, 4, "tom");

    t.equal(bettingRound.toJSON().idToBet, "tom", "with tom as dealer");

    bettingRound = new BettingRound(createTestPlayers(), 5, 10, 4, "ryan");

    t.equal(bettingRound.toJSON().idToBet, "ryan", "with ryan as dealer");

    bettingRound = new BettingRound(createTestPlayers(), 5, 10, 4, "bobby");

    t.equal(bettingRound.toJSON().idToBet, "bobby", "with bobby as dealer");

    t.end();
});
