"use strict";
const _ = require("lodash");
const Deck = require("./Deck");
const texasHoldemDeckConstants = require("./constants/texasHoldemDeck");

class PreGameHighCards {
    constructor(players) {

        var availableCards = new Deck();
        _.forEach(players, player => {
            player.setHand([availableCards.dealCards(2)]);
        });

        this.status = texasHoldemDeckConstants.PRE_FLOP;

        this.flop = availableCards.dealCards(3);

        this.turn = availableCards.dealCards(1);

        this.river = availableCards.dealCards(1);
    }

    getFlop() {
        this.status = texasHoldemDeckConstants.FLOP;
        return this.flop;
    }

    getTurn() {
        this.status = texasHoldemDeckConstants.TURN;
        return this.turn;
    }

    getRiver() {
        this.status = texasHoldemDeckConstants.RIVER;
        return this.river;
    }

    getStatus() {
        return this.status;
    }


}

module.exports = PreGameHighCards;
