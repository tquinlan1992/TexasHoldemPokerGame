"use strict";
const _ = require("lodash");
const cardConstants = require("./constants/cardConstants");

class PreGameHighCards {
    constructor(players) {
        var availableCards = _.chain(cardConstants).reduce((result, cardConstant, n) => {
            result.push(n);
            return result;
        }, []).shuffle().value();
        _.forEach(players, player => {
            player.setHand([availableCards.pop(1)]);
        });
    }
}

module.exports = PreGameHighCards;
