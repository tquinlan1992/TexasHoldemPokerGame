"use strict";
const _ = require("lodash");
const cardConstants = require("./constants/cardConstants");

class Deck {
    constructor() {
        this.availableCards = _.chain(cardConstants).reduce((result, cardConstant, n) => {
            result.push(n);
            return result;
        }, []).shuffle().value();
    }

    dealCards(numberOfCardsToDeal) {
        const cardsToDeal = _.pull(_.times(numberOfCardsToDeal, () => this.availableCards.pop()), undefined);
        return cardsToDeal.length ? cardsToDeal : null;
    }
}

module.exports = Deck;
