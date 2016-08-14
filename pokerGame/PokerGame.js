"use strict";
const _ = require("lodash");
const Player = require("./Player");
const PreGameHighCards = require("./PreGameHighCards");
const pokerGameStatuses = require("./constants/pokerGameStatuses");
const TexasHoldemDeck = require("./TexasHoldemDeck");
const texasHoldemDeckConstants = require("./constants/texasHoldemDeck");

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

    getTexasHoldemTableCards(flopTurnRiver) {
        switch(flopTurnRiver) {
            case texasHoldemDeckConstants.FLOP:
                if (_.chain(texasHoldemDeckConstants).omit("PRE_FLOP").includes(this.texasHoldemDeck.getStatus()).value()) {
                    return this.texasHoldemDeck.getFlop();
                }
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
