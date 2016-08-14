const test = require("tape");
const _ = require("lodash");
const BettingRound = require("../src/pokerGame/BettingRound");
const Player = require("../src/pokerGame/Player");

var players = _.chain([
    {
        id: "tom",
        amount: 20
    },
    {
        id: "ryan",
        amount: 20
    }
]).map(player => {
    return new Player(player);
}).value();

test("test create BettingRound", t => {
    var bettingRound = new BettingRound(_.cloneDeep(players), 5, 10, 4, "tom");

    t.deepEqual(bettingRound.toJSON(), {
        roundCreated: true,
        smallBlind: 5,
        bigBlind: 10,
        numberOfRaises: 4,
        players: [
            {
                id: "tom",
                amount: 20,
                dealer: true,
                hand: []
            },
            {
                id: "ryan",
                amount: 20,
                dealer: undefined,
                hand: []
            }
        ]
    });

    t.end();
});
