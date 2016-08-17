const test = require("tape");
const HighCards = require("../src/pokerGame/HighCards");
const _ = require("lodash");
const Player = require("../src/pokerGame/Player");

const players1 = [{
    id: "tom"
}, {
    id: "ryan"
}, {
    id: "bobby"
}];

function createTestPlayers(players) {
    return _.chain(players).map(player => {
        return new Player(player);
    }).value();
}

test("test HighCards", t => {
    const createdPlayers = createTestPlayers(players1);

    const highCards = new HighCards(createdPlayers);

    const highCardsJSON = highCards.toJSON();

    const winningPlayerFromCreatedPlayersArray = _.find(createdPlayers, player => {
        return player.toJSON().id === highCardsJSON.winner.id;
    }).toJSON();

    t.deepEqual(highCards.toJSON(), {
        winner: {
            id: winningPlayerFromCreatedPlayersArray.id,
            hand: winningPlayerFromCreatedPlayersArray.hand
        }
    });

    t.end();
});
