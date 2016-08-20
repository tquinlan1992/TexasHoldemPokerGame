const test = require("tape");
const Deck = require("../src/pokerGame/Deck");
const _ = require("lodash");

test("test dealing deck cards", t => {
    const deck = new Deck();

    const dealtFullDeckHand = deck.dealCards(52);

    t.equal(dealtFullDeckHand.length, 52);

    // Check 3 times that there are no more cards left
    t.false(deck.dealCards(1));
    t.false(deck.dealCards(1));
    t.false(deck.dealCards(1));

    t.end();
});

test("test creating a deck with availableCards", t => {
    const availableCards = [
        0,
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9
    ];

    const deck = new Deck(_.clone(availableCards));

    t.deepEqual(deck, {
        availableCards: availableCards
    }, "the deck should be equal to the init");

    t.deepEqual(deck.dealCards(2), [9, 8], "the dealt cards should be equal to the top 2 cards on the deck");
    t.deepEqual(deck, {
        availableCards: _.slice(availableCards, 0, -2)
    });

    t.end();
});
