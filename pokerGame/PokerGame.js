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

        this.gameStatus = gameStatuses.DEAL_CARDS;
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
        this.gameStatus = gameStatuses.VOTE_FOR_WINNER;
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
