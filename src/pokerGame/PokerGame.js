"use strict";
const _ = require("lodash");
const Player = require("./Player");
const HighCards = require("./HighCards");
const pokerGameStatuses = require("./constants/pokerGameStatuses");
const TexasHoldemGame = require("./TexasHoldemGame");
const BettingRound = require("./BettingRound");

class PokerGame {
    constructor(pokerGameObject) {

        this.players = _.map(pokerGameObject.players, (player) => {
            return new Player(player);
        });
        this.smallBlind = pokerGameObject.smallBlind;
        this.bigBlind = pokerGameObject.bigBlind;
        this.numberOfRaisesPerBettingRound = pokerGameObject.numberOfRaisesPerBettingRound;
        this.gameStatus = pokerGameObject.status ? pokerGameObject.status : pokerGameStatuses.START;
    }

    dealHighCards() {
        this.highCardsGame = new HighCards({
            players: _.map(this.players, player => {
                return player.toJSON();
            })
        });
        this.gameStatus = pokerGameStatuses.HIGH_CARDS;
    }

    dealCardsForTexasHoldem() {
        this.texasHoldemGame = new TexasHoldemGame(this.players);
        this.currentBettingRound = new BettingRound(this.players, this.smallBlind, this.bigBlind, this.numberOfRaisesPerBettingRound);
        this.gameStatus = pokerGameStatuses.TEXAS_HOLDEM;
    }

    dealNextTexasHoldemTableCards() {
        this.texasHoldemGame.dealNextTexasHoldemTableCards();
    }

    setGameWinner(name) {
        this.gameWinner = name;
    }

    playersToJSON() {
        switch (this.gameStatus) {
            case pokerGameStatuses.START:
                return _.map(this.players, player => {
                    player.toJSON();
                });
            case pokerGameStatuses.HIGH_CARDS:
                return this.highCardsGame.toJSON().players;
            case pokerGameStatuses.TEXAS_HOLDEM:
                return this.texasHoldemGame.toJSON().players;
            default:

        }
    }

    toJSON() {
        let json = _.omit(this, ["players", "texasHoldemGame", "currentBettingRound", "highCardsGame"]);
        _.assign(json, {
            players: this.playersToJSON(),
            texasHoldemGame: this.texasHoldemGame ? this.texasHoldemGame.toJSON() : null,
            currentBettingRound: this.currentBettingRound ? this.currentBettingRound.toJSON() : null,
            highCardsGame: this.highCardsGame ? this.highCardsGame.toJSON() : null
        });
        return json;
    }
}

module.exports = PokerGame;
