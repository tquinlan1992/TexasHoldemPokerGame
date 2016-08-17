const test = require("tape");
const Deck = require("../src/pokerGame/Deck");

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
