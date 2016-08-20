"use strict";
const _ = require("lodash");
const cardConstants = require("./constants/cardConstants");

class Deck {
    constructor(availableCards) {
        if (availableCards) {
            this.setAvailableCards(availableCards);
            return;
        }
        this.availableCards = _.chain(cardConstants).reduce((result, cardConstant, n) => {
            result.push(n);
            return result;
        }, []).shuffle().value();
    }

    setAvailableCards(availableCards) {
        this.availableCards = availableCards;
    }

    dealCards(numberOfCardsToDeal) {
        const cardsToDeal = _.pull(_.times(numberOfCardsToDeal, () => this.availableCards.pop()), undefined);
        return cardsToDeal.length ? cardsToDeal : null;
    }

    toJSON() {
        let json = _.omit(this, []);
        return json;
    }
}

module.exports = Deck;
