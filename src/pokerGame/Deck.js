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
        return _.times(numberOfCardsToDeal, () => this.availableCards.pop());
    }
}

module.exports = Deck;
