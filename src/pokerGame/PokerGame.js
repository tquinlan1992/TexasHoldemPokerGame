"use strict";
const _ = require("lodash");
const Player = require("./Player");
const HighCards = require("./HighCards");
const pokerGameStatuses = require("./constants/pokerGameStatuses");
const TexasHoldemDeck = require("./TexasHoldemDeck");
const BettingRound = require("./BettingRound");

class PokerGame {
    constructor(players, smallBlind, bigBlind, numberOfRaisesPerBettingRound) {

        this.players = _.map(players, (player) => {
            return new Player(player);
        });
        this.smallBlind = smallBlind;
        this.bigBlind = bigBlind;
        this.numberOfRaisesPerBettingRound = numberOfRaisesPerBettingRound;

        this.gameStatus = pokerGameStatuses.DEAL_CARDS;
    }

    dealHighCards() {
        new HighCards(this.players);
        this.gameStatus = pokerGameStatuses.VOTE_FOR_WINNER;
    }

    dealCardsForTexasHoldem() {
        this.texasHoldemDeck = new TexasHoldemDeck(this.players);
        this.currentBettingRound = new BettingRound(this.players, this.smallBlind, this.bigBlind, this.numberOfRaisesPerBettingRound);
        this.gameStatus = pokerGameStatuses.BET_CHECK_OR_FOLD;
    }

    dealNextTexasHoldemTableCards() {
        this.texasHoldemDeck.dealNextTexasHoldemTableCards();
    }

    setGameWinner(name) {
        this.gameWinner = name;
    }

    toJSON() {
        let json = _.omit(this, ["players", "texasHoldemDeck", "currentBettingRound"]);
        _.assign(json, {
            players: _.map(this.players, player => {
                return player.toJSON();
            }),
            texasHoldemDeck: this.texasHoldemDeck ? this.texasHoldemDeck.toJSON() : null,
            currentBettingRound: this.currentBettingRound ? this.currentBettingRound.toJSON() : null
        });
        return json;
    }
}

module.exports = PokerGame;
