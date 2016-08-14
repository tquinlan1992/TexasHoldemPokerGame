const test = require("tape");
const _ = require("lodash");
const BettingRound = require("../pokerGame/BettingRound");
const Player = require("../pokerGame/Player");

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

    t.true(bettingRound.getRoundCreated(), true);
    t.equal(bettingRound.getRoundConfigs(), {
        smallBlind: 5,
        bigBlind: 10,
        numberOfRaises: 4
    });
    t.
    console.log('bettingRound.getRoundCreated()', bettingRound.getRoundCreated());
    console.log('test', bettingRound.getRoundConfigs());
    console.log('bettingRound.getPlayers()', bettingRound.getPlayers());

    t.end();
});
