const Player = require("../src/pokerGame/Player");
const tape = require("tape");

const player = new Player({
    id: "tom",
    amount: "20",
    hand: []
});

let playerJSON;

tape("Create a player", t => {

    const player = new Player({
        id: "tom",
        amount: "20",
        hand: []
    });

    let playerJSON;

    playerJSON = player.toJSON();

    t.deepEqual(playerJSON, {
        id: "tom",
        amount: "20",
        hand: []
    });

    t.end();
});

tape("test set hand", t => {

    const player = new Player({
        id: "tom",
        amount: "20",
        hand: []
    });

    let playerJSON;

    const handToSet = [2, 4];
    player.setHand(handToSet);

    playerJSON = player.toJSON();

    t.deepEqual(playerJSON, {
        id: "tom",
        amount: "20",
        hand: handToSet
    });

    t.end();

});

tape("test edit amount", t => {

    const player = new Player({
        id: "tom",
        amount: "20",
        hand: []
    });

    let playerJSON;

    player.editAmount("-5");

    playerJSON = player.toJSON();

    t.equal(playerJSON.amount, "15");

    player.editAmount("-3");

    playerJSON = player.toJSON();

    t.equal(playerJSON.amount, "12");

    player.editAmount("-2.50");

    playerJSON = player.toJSON();

    t.equal(playerJSON.amount, "9.5");

    player.editAmount("3.75");

    playerJSON = player.toJSON();

    t.equal(playerJSON.amount, "13.25");

    t.end();

});
