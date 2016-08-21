"use strict";
const _ = require("lodash");
const Player = require("./Player").PlayerWithHand;
const HighCards = require("./HighCards");
const pokerGameStatuses = require("./constants/pokerGameStatuses");
const TexasHoldemGame = require("./TexasHoldemGame");
const BettingRound = require("./BettingRound");
const bettingRoundConstants = require("./constants/bettingRound");

class PokerGame {
    constructor(pokerGameObject) {
        _.assign(this, {
            players: _.map(pokerGameObject.players, (player) => {
                return new Player(player);
            }),
            smallBlind: pokerGameObject.smallBlind,
            bigBlind: pokerGameObject.bigBlind,
            numberOfRaisesPerBettingRound: pokerGameObject.numberOfRaisesPerBettingRound,
            gameStatus: pokerGameObject.status ? pokerGameObject.status : pokerGameStatuses.START,
            highCardsGame: pokerGameObject.highCardsGame,
            texasHoldemGame: pokerGameObject.texasHoldemGame,
            bettingRound: pokerGameObject.bettingRound
        });
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
        this.bettingRound = new BettingRound(this.players, this.smallBlind, this.bigBlind, this.numberOfRaisesPerBettingRound);
        this.gameStatus = pokerGameStatuses.TEXAS_HOLDEM;
    }

    dealNextTexasHoldemTableCards() {
        if (this.bettingRound.toJSON().status === bettingRoundConstants.INACTIVE) {
            this.texasHoldemGame.dealNextTexasHoldemTableCards();
        }
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
        let json = _.omit(this, ["players", "texasHoldemGame", "bettingRound", "highCardsGame"]);
        _.assign(json, {
            players: this.playersToJSON(),
            texasHoldemGame: this.texasHoldemGame ? this.texasHoldemGame.toJSON() : null,
            bettingRound: this.bettingRound ? this.bettingRound.toJSON() : null,
            highCardsGame: this.highCardsGame ? this.highCardsGame.toJSON() : null
        });
        return json;
    }
}

module.exports = PokerGame;
