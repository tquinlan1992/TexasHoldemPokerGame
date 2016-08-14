"use strict";
const _ = require("lodash");
const Player = require("./Player");
const PreGameHighCards = require("./PreGameHighCards");
const pokerGameStatuses = require("./constants/pokerGameStatuses");
const TexasHoldemDeck = require("./TexasHoldemDeck");

class PokerGame {
    constructor(playersAmounts) {

        this.players = _.map(playersAmounts, (player) => {
            return new Player(player.name, player.amount);
        });

        this.gameStatus = pokerGameStatuses.DEAL_CARDS;
    }

    getPlayersInfo() {
        return _.map(this.players, player => {
            return player.getPlayerInfo();
        });
    }

    getPlayers() {
        return this.players;
    }

    dealHighCards() {
        new PreGameHighCards(this.getPlayers());
        this.gameStatus = pokerGameStatuses.VOTE_FOR_WINNER;
    }

    dealCardsForTexasHoldem() {
        this.texasHoldemDeck = new TexasHoldemDeck(this.getPlayers());
        this.gameStatus = pokerGameStatuses.BET_CHECK_OR_FOLD;
    }

    getTexasHoldemFlop() {
        var texasHoldemDeckConstants = this.texasHoldemDeck.getConstants();
        var flopHasBeenDealt = _.includes([texasHoldemDeckConstants.FLOP, texasHoldemDeckConstants.TURN, texasHoldemDeckConstants.RIVER], this.texasHoldemDeck.getStatus());
        if (flopHasBeenDealt) {
            return this.texasHoldemDeck.getFlop();
        }
    }

    getGameStatus() {
        return this.gameStatus;
    }

    voteForWinner(name) {
        this.gameWinner = name;
    }

    getGameWinner() {
        return this.gameWinner;
    }
}

module.exports = PokerGame;
