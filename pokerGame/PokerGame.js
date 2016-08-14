"use strict";
const _ = require("lodash");
const Player = require("./Player");
const PreGameHighCards = require("./PreGameHighCards");
const gameStatuses = require("./constants/gameStatuses");

class PokerGame {
    constructor(playersAmounts) {

        this.players = _.map(playersAmounts, (player) => {
            return new Player(player.name, player.amount);
        });

        this.gameStatus = gameStatuses.DEAL_HIGH_CARDS;
    }

    getPlayersInfo() {
        return _.map(this.players, player => {
            return player.getPlayerInfo();
        });
    }

    getPlayers() {
        return this.players;
    }

    continueGame() {
        switch(this.gameStatus) {
            case gameStatuses.DEAL_HIGH_CARDS:
                new PreGameHighCards(this.getPlayers());
                break;
            case gameStatuses.VOTE_FOR_WINNER:
        }
    }
}

module.exports = PokerGame;
