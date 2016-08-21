"use strict";
const _ = require("lodash");

class Deck {
    constructor(deck) {
        this.deck = deck ? deck : _.chain(52).times(Number).shuffle().value();
    }

    dealCards(numberOfCardsToDeal) {
        const cardsToDeal = _.pull(_.times(numberOfCardsToDeal, () => this.deck.pop()), undefined);
        return cardsToDeal.length ? cardsToDeal : null;
    }

    toJSON() {
        let json = _.omit(this, []);
        return json;
    }
}

module.exports = Deck;
