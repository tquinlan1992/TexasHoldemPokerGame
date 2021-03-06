"use strict";
const _ = require("lodash");
const Deck = require("./Deck");
const texasHoldemDeckConstants = require("./constants/texasHoldemGame");
const Player = require("./player").PlayerWithHand;

class TexasHoldemGame {
    constructor(texasHoldemGameObject) {

        this.deck = new Deck(texasHoldemGameObject.deck);
        this.players = _.map(texasHoldemGameObject.players, player => {
            const newPlayer = new Player(player);
            newPlayer.setHand(this.deck.dealCards(2));
            return newPlayer;
        });

        this.status = texasHoldemGameObject.status ? texasHoldemGameObject : texasHoldemDeckConstants.PRE_FLOP;

        this.flop = this.deck.dealCards(3);

        this.turn = this.deck.dealCards(1);

        this.river = this.deck.dealCards(1);
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

module.exports = TexasHoldemGame;
