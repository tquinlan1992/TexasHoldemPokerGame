"use strict";
const _ = require("lodash");
const cardConstants = require("./constants/cardConstants");

class Deck {
    constructor(deck) {
        this.deck = deck ? deck : _.chain(cardConstants).reduce((result, cardConstant, n) => {
            result.push(n);
            return result;
        }, []).shuffle().value();
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
