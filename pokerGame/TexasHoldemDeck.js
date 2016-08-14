"use strict";
const _ = require("lodash");
const Deck = require("./Deck");

const texasHoldemDeckConstants = {
    PRE_FLOP: 0,
    FLOP: 1,
    TURN: 2,
    RIVER: 3
};

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

    getConstants() {
        return texasHoldemDeckConstants;
    }


}

module.exports = PreGameHighCards;
