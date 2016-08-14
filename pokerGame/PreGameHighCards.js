"use strict";
const _ = require("lodash");
const Deck = require("./Deck");
const Player = require("./Player");

class PreGameHighCards {
    constructor(players) {
        var availableCards = new Deck();
        _.forEach(players, player => {
            player.setHand([availableCards.dealCards(1)]);
        });
    }
}

module.exports = PreGameHighCards;
