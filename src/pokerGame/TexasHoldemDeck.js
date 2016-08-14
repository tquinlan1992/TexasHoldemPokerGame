"use strict";
const _ = require("lodash");
const Deck = require("./Deck");
const texasHoldemDeckConstants = require("./constants/texasHoldemDeck");

class TexasHoldemDeck {
    constructor(players) {

        var availableCards = new Deck();
        _.forEach(players, player => {
            player.setHand(availableCards.dealCards(2));
        });

        this.status = texasHoldemDeckConstants.PRE_FLOP;

        this.flop = availableCards.dealCards(3);

        this.turn = availableCards.dealCards(1);

        this.river = availableCards.dealCards(1);
    }

    dealNextTexasHoldemTableCards() {
        switch (this.status) {
            case texasHoldemDeckConstants.PRE_FLOP:
                this.dealFlop();
                break;
            case texasHoldemDeckConstants.FLOP:
                this.dealTurn();
                break;
            case texasHoldemDeckConstants.TURN:
                this.dealRiver();
                break;

        }
    }

    dealFlop() {
        this.status = texasHoldemDeckConstants.FLOP;
        return this.flop;
    }

    dealTurn() {
        this.status = texasHoldemDeckConstants.TURN;
        return this.turn;
    }

    dealRiver() {
        this.status = texasHoldemDeckConstants.RIVER;
        return this.river;
    }

    toJSON() {
        let json = _.omit(this, ["flop", "turn", "river"]);
        _.assign(json, {
            flop: _.includes([texasHoldemDeckConstants.FLOP, texasHoldemDeckConstants.TURN, texasHoldemDeckConstants.RIVER], this.status) ? this.flop : null,
            turn: _.includes([texasHoldemDeckConstants.TURN, texasHoldemDeckConstants.RIVER], this.status) ? this.turn : null,
            river: _.includes([texasHoldemDeckConstants.RIVER], this.status) ? this.river : null
        });
        return json;
    }


}

module.exports = TexasHoldemDeck;
